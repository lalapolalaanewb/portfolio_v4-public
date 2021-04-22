/** Dependencies */
// Controllers
const { 
  // Redis Data
  getDefaultAllData,
  // Redis Promises
  setAsync 
} = require('../controllers')

/** Page Specific Functions */
// get all required data from redis
const getAllData = async() => {
  const redisAllData = await getDefaultAllData()
  return {
    likeStatusesTemp: redisAllData.likeStatusesTempRedis,
    posts: redisAllData.postsRedis,
    techs: redisAllData.techsRedis,
    users: redisAllData.usersRedis
  }
}
// set new likeStatusesTemp redis data
const setAllLikeStatusTemp = async(redisAllLikeStatusesTemp) => {
  await setAsync(`pfv4_likeStatusesTemp`, JSON.stringify(redisAllLikeStatusesTemp))
}

/** Methods */

// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/posts
// @access  Public (Only need Admin Public Access Key)
exports.getPublicPosts = async(req, res, next) => {
  // get posts, techs, users data from redis
  let redisAllData = await getAllData()
  let posts = redisAllData.posts
  let techs = redisAllData.techs
  let users = redisAllData.users

  // get active posts info
  let postsActive = posts.filter(post => post.status === 1)
  // get populated posts (with creator)
  postsActive.forEach(post => {
    users.forEach(user => {
      if(user._id === post.creator) post.creator = {...user}
    })
  })
  // get populated posts (with tech)
  postsActive.forEach(post => {
    techs.forEach(tech => {
      if(tech._id === post.tech) post.tech = {...tech}
    })
  })
  
  return res.status(200).json({
    success: true,
    count: postsActive.length,
    data: postsActive.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  })
}

// @desc    Portfolio V4 Posts (Get A Post)
// @route   POST /api/v1/posts/public/get
// @access  Public (Only need Admin Public Access Key)
exports.getPublicPost = async(req, res, next) => {
  // get posts, techs, users data from redis
  let redisAllData = await getAllData()
  let posts = redisAllData.posts
  let techs = redisAllData.techs
  let users = redisAllData.users

  // get selected post info
  let post = posts.find(post => post._id === req.body.postId)
  if(!post) return res.status(400).json({
    success: false,
    error: `Failed to get post data. Please refresh the page or try again later.`,
    data: {}
  })
  // get populated post (with creator)
  users.forEach(user => {
    if(user._id === post.creator) post.creator = {...user}
  })
  // get populated posts (with tech)
  techs.forEach(tech => {
    if(tech._id === post.tech) post.tech = {...tech}
  })
  
  return res.status(200).json({
    success: true,
    count: 1,
    data: post
  })
}

// @desc    Portfolio V4 Posts (Update Post Like)
// @route   POST /api/v1/posts/public/update
// @access  Public (Only need Admin Public Access Key)
exports.updatePublicPost = async(req, res, next) => {
  let {
    post, user
  } = req.body
  // return console.log(req.body)
  // get likeStatusesTemp, posts, techs, users data from redis
  let redisAllData = await getAllData()
  let likeStatusesTemp = redisAllData.likeStatusesTemp

  // check if user likeStatusesTemp exist
  let likeStatus = likeStatusesTemp.find(state => state.ipv4 === user)
  if(!likeStatus) likeStatusesTemp.push({
    ipv4: user,
    likedProjects: [],
    likedPosts: [{ postId: post._id, status: post.status }]
  }) 
  else {
    likeStatusesTemp.forEach(state => {
      if(state.ipv4 === user) {
        let isLikedExist = false
        state.likedPosts.forEach(liked => {
          if(liked.postId === post._id) {
            liked.status = post.status
            isLikedExist = true
          }
        })
        if(isLikedExist === false) state.likedPosts.push({ postId: post._id, status: post.status })
      }
    })
  }
  console.log(likeStatusesTemp)
  // set new likeStatusesTemp redis
  await setAllLikeStatusTemp(likeStatusesTemp)

  return res.status(200).json({
    success: true,
    count: 1,
    data: {}
  })

  // let status

  // return await Likestatus.find({ ipv4: req.body.ipv4 })
  // .then(async data => {
  //   data.likedPosts.map(post => {
  //     if(post.postId === req.body.postId) status = post.status 
  //   })

  //   if(status) return await Post.findByIdAndUpdate(
  //     { _id: req.body.postId },
  //     { $set: { like: +req.body.postLikeCount - 1 } }
  //   )
  //   else return await Post.findByIdAndUpdate(
  //     { _id: req.body.postId },
  //     { $set: { like: +req.body.postLikeCount + 1 } }
  //   )
  // })
  // .then(async data => {
  //   return await Likestatus.updateOne(
  //     { ipv4: req.body.ipv4 },
  //     { $set: { "likedPosts.$[postId].status": !status } },
  //     { arrayFilters: [{ "postId.postId": req.body.postId }] }
  //   )
  // })
  // .then(data => {
  //   return res.status(200).json({
  //     success: true,
  //     count: data.length,
  //     data: data
  //   })
  // })
  // .catch(err => {
  //   return res.status(500).json({
  //     success: false,
  //     error: `Failed to update data from Posts & Likestatus Collection`,
  //     data: err
  //   })
  // })
}