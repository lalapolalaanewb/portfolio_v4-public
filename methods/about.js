/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  User, About,
} = require('../models')
// Controllers
const { imgFolderLocation, handleImgRemove } = require('../controllers')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User's About)
// @route   POST /api/v1/users/private/profile/about/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserAbout = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('abouts')
  .populate('abouts')
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

// @desc    Portfolio V4 Users Profile (Add A User's About)
// @route   POST /api/v1/users/private/profile/about/add
// @access  Private (Require sessionId & uid)
exports.addPrivateUserAbout = async(req, res, next) => {
  let {
    title, description, btnPurpose, btnLabel, btnLink, imgPosition, creator
  } = req.body
  // console.log(req.body); return console.log(req.file)
  const about = new About({
    title: title,
    description: handleNoneInput(description),
    btnPurpose: btnPurpose,
    btnLabel: btnLabel,
    btnLink: btnLink,
    imgPosition: imgPosition,
    imgSrc: req.file.originalname,
    creator: creator
  })
  
  about.save()
  .then(async data => {
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { abouts: data._id } },
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
      error: `Failed to add new about data from About Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's About)
// @route   POST /api/v1/users/private/profile/about/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserAbout = async(req, res, next) => {
  let {
    aboutId, about
  } = req.body

  await About.findByIdAndUpdate(
    { _id: aboutId },
    { $set: {
      title: about.title,
      description: handleNoneInput(about.description),
      btnPurpose: about.btnPurpose,
      btnLabel: about.btnLabel,
      btnLink: about.btnLink,
      imgPosition: about.imgPosition
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
      error: `Failed to update about from About Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's About Img)
// @route   POST /api/v1/users/private/profile/about/update/image
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserAboutImg = async(req, res, next) => {
  let { aboutId, imgSrc } = req.body

  // - remove image from server images folder
  handleImgRemove(res, imgSrc)

  await About.findByIdAndUpdate(
    { _id: aboutId },
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
      error: `Failed to update about image from About Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's About Publish)
// @route   POST /api/v1/users/private/profile/about/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserAboutPublish = async(req, res, next) => {
  let { aboutId, intention } = req.body
  
  await About.findByIdAndUpdate(
    { _id: aboutId },
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
      error: `Failed to update about publish from About Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Delete A User's About)
// @route   POST /api/v1/users/private/profile/about/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivateUserAbout = async(req, res, next) => {
  try {
    // check if about is published first
    let about = await About.findById(req.body.aboutId)
    if(about) {
      if(about.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete about! Please unpublished the about first.`,
        data: {}
      })
    }

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { abouts: req.body.aboutId } },
    )

    // - remove image from server images folder
    handleImgRemove(res, about.imgSrc)

    // delete about
    about.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete about data from Home Collection`,
      data: err
    })
  }
}