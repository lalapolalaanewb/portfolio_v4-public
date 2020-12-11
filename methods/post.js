/** Dependencies */
// Model - Project
const {
  Post, Likestatus, User
} = require('../models')
const { post } = require('../routes/auth')
// Controllers
const { imgFolderLocation, handleImgRemove } = require('../controllers')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */

// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/posts
// @access  Public (Only need Admin Public Access Key)
exports.getPublicPosts = async(req, res, next) => {
  return await Post.find().where({ status: 1 }).sort({ publishedAt: 1 })
  .populate('techs')
  .populate('creator')
  .populate('comments')
  .then(data => {
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Posts Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts (Get A Post)
// @route   POST /api/v1/posts/public/get
// @access  Public (Only need Admin Public Access Key)
exports.getPublicPost = async(req, res, next) => {
  return await Post.findById(req.body.postId).where({ status: 1 })
  .populate('tech')
  .populate('creator')
  // .populate('comments')
  .then(data => {
    console.log(typeof data)
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Post Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts (Update Post Like)
// @route   POST /api/v1/posts/public/update
// @access  Public (Only need Admin Public Access Key)
exports.updatePublicPost = async(req, res, next) => {
  let status

  return await Likestatus.find({ ipv4: req.body.ipv4 })
  .then(async data => {
    data.likedPosts.map(post => {
      if(post.postId === req.body.postId) status = post.status 
    })

    if(status) return await Post.findByIdAndUpdate(
      { _id: req.body.postId },
      { $set: { like: +req.body.postLikeCount - 1 } }
    )
    else return await Post.findByIdAndUpdate(
      { _id: req.body.postId },
      { $set: { like: +req.body.postLikeCount + 1 } }
    )
  })
  .then(async data => {
    return await Likestatus.updateOne(
      { ipv4: req.body.ipv4 },
      { $set: { "likedPosts.$[postId].status": !status } },
      { arrayFilters: [{ "postId.postId": req.body.postId }] }
    )
  })
  .then(data => {
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update data from Posts & Likestatus Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts Dashboard (Get All Posts)
// @route   POST /api/v1/posts/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivatePosts = async(req, res, next) => {
  return await Post.find().sort({ publishedAt: -1 })
  .populate('tech')
  .populate('creator')
  .populate('comments')
  .then(data => { 
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Posts Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts Dashboard (Add A Post)
// @route   POST /api/v1/posts/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivatePost = async(req, res, next) => {
  let {
    title,
    excerpt,
    tech,
    description
  } = req.body

  const post = new Post({
    title: title,
    imgSrc: req.file.originalname,
    excerpt: handleNoneInput(excerpt),
    tech: tech,
    description: handleNoneInput(description),
    // publishedAt: new Date('October 3, 2020').toISOString(),
    publishedAt: new Date(Date.now()).toISOString(),
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID
  })
  
  post.save()
  .then(async data => {
    await User.updateOne(
      { _id: '5f8fc26c6a103b243428bec1' },
      { $push: { posts: data._id } },
    )
    
    let post = await data.populate('tech').populate('creator').populate('comments').execPopulate()

    return res.status(200).json({
      success: true,
      count: post.length,
      data: post
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new post data from Posts Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts Dashboard (Update A Post Img)
// @route   POST /api/v1/posts/private/update/image
// @access  Private (Require sessionId & uid)
exports.updatePrivatePostImg = async(req, res, next) => {
  let { postId, imgSrc } = req.body

  // - remove image from server images folder
  handleImgRemove(res, imgSrc)

  await Post.findByIdAndUpdate(
    { _id: postId },
    { $set: { imgSrc: req.file.originalname } },
    { new: true }
  )
  .then(async data => {
    
    let post = await data.populate('tech').populate('creator').populate('comments').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: post.length,
      data: post
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update post image from Posts Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts Dashboard (Update A Post Publishment)
// @route   POST /api/v1/posts/private/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivatePostPublish = async(req, res, next) => {
  let { postId, intention } = req.body
  
  await Post.findByIdAndUpdate(
    { _id: postId },
    { $set: {
      status: (() => intention === 'publish' ? 1 : 0)()
    } },
    { new: true }
  )
  .then(async data => {
    let post = await data.populate('tech').populate('creator').populate('comments').execPopulate()

    return res.status(200).json({
      success: true,
      count: post.length,
      data: post
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update post publish from Posts Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts Dashboard (Update A Post)
// @route   POST /api/v1/posts/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivatePost = async(req, res, next) => {
  let {
    title,
    excerpt,
    description,
    tech,
    // like,
    creator
  } = req.body
  
  let shouldCreatorUpdate
  creator.current === creator.new ? shouldCreatorUpdate = 'no' : shouldCreatorUpdate = 'yes'
  console.log(creator); console.log(shouldCreatorUpdate)
  await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      title: title,
      excerpt: handleNoneInput(excerpt),
      description: handleNoneInput(description),
      tech: tech,
      // like: like,
      creator: shouldCreatorUpdate === 'no' ? creator.current : creator.new
    } },
    { new: true }
  )
  .then(async data => {
    if(shouldCreatorUpdate === 'yes') {
      // remove from user before
      await User.updateOne(
        { _id: creator.current },
        { $pull: { posts: req.params.id } },
      )
      // add to new user
      await User.updateOne(
        { _id: creator.new },
        { $push: { posts: req.params.id } },
      )
    }

    let post = await data.populate('tech').populate('creator').populate('comments').execPopulate()

    return res.status(200).json({
      success: true,
      count: post.length,
      data: post
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update post data from Posts Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts Dashboard (Delete A Post)
// @route   POST /api/v1/posts/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivatePost = async(req, res, next) => {
  try {
    // check if post is published first
    let post = await Post.findById(req.params.id)
    if(post) {
      if(post.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete post! Please unpublished the post first.`,
        data: {}
      })
    }

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { posts: req.params.id } },
    )

    // - remove image from server images folder
    handleImgRemove(res, post.imgSrc)

    // delete post
    post.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete post data from Post Collection`,
      data: err
    })
  }
}