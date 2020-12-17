/** Dependencies */
// Model - User
const {
  User, Home,
} = require('../models')
// Controllers
const { handleImgRemove } = require('../controllers')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User's Home)
// @route   POST /api/v1/users/private/profile/home/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserHome = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('homes')
  .populate('homes')
  .then(data => { // console.log(data)
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get about data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Add A User's Home)
// @route   POST /api/v1/users/private/profile/home/add
// @access  Private (Require sessionId & uid)
exports.addPrivateUserHome = async(req, res, next) => {
  let {
    topline, headline, description, btnPurpose, btnLabel, btnLink, imgPosition, creator
  } = req.body
  // console.log(req.body); return console.log(req.file)
  const home = new Home({
    topline: topline,
    headline: headline,
    description: handleNoneInput(description),
    btnPurpose: btnPurpose,
    btnLabel: btnLabel,
    btnLink: btnLink,
    imgPosition: imgPosition,
    imgSrc: req.file.originalname,
    creator: creator
  })
  
  home.save()
  .then(async data => { 
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { homes: data._id } },
    )
    
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Failed to add new home data from Home Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Home)
// @route   POST /api/v1/users/private/profile/home/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserHome = async(req, res, next) => {
  let {
    homeId, home
  } = req.body

  await Home.findByIdAndUpdate(
    { _id: homeId },
    { $set: {
      topline: home.topline,
      headline: home.headline,
      description: handleNoneInput(home.description),
      btnPurpose: home.btnPurpose,
      btnLabel: home.btnLabel,
      btnLink: home.btnLink,
      imgPosition: home.imgPosition
    } },
    { new: true }
  )
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
      error: `Failed to update about from Home Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Home Img)
// @route   POST /api/v1/users/private/profile/home/update/image
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserHomeImg = async(req, res, next) => {
  let { homeId, imgSrc } = req.body

  // - remove image from server images folder
  handleImgRemove(res, imgSrc)

  await Home.findByIdAndUpdate(
    { _id: homeId },
    { $set: { imgSrc: req.file.originalname } },
    { new: true }
  )
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
      error: `Failed to update about image from Home Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Home Publish)
// @route   POST /api/v1/users/private/profile/home/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserHomePublish = async(req, res, next) => {
  let { homeId, intention } = req.body
  
  await Home.findByIdAndUpdate(
    { _id: homeId },
    { $set: {
      status: (() => intention === 'publish' ? 1 : 0)()
    } },
    { new: true }
  )
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
      error: `Failed to update about publish from Home Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Delete A User's Home)
// @route   POST /api/v1/users/private/profile/home/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivateUserHome = async(req, res, next) => {
  try {
    // check if home is published first
    let home = await Home.findById(req.body.homeId)
    if(home) {
      if(home.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete home! Please unpublished the home first.`,
        data: {}
      })
    }

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { homes: req.body.homeId } },
    )

    // - remove image from server images folder
    handleImgRemove(res, home.imgSrc)

    // delete home
    home.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete home data from Home Collection`,
      data: err
    })
  }
}