/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  User, Socialmedia
} = require('../models')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/users/private/profile/social/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserSocial = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('name.firstName socialMedias')
  .populate('socialMedias')
  .then(async data => { console.log(data)
    // get all social medias create by user
    let socialMedias = await Socialmedia.find()
    .populate('icon')
    .where({ creator: data._id })
    .sort({ name: 1 })
    if(!socialMedias) return res.status(400).json({
      success: false,
      error: `Failed to get published social data  of user (${data.name.firstName}) from Social Media Collection`,
      data: {}
    })
    console.log(data._id); console.log(socialMedias)
    return res.status(200).json({
      success: true,
      count: socialMedias.length,
      data: {
        _id: data._id,
        socialMedias: socialMedias
      }
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get social data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Add A User's Social Media)
// @route   POST /api/v1/users/private/profile/social/add
// @access  Private (Require sessionId & uid)
exports.addPrivateUserSocial = async(req, res, next) => {
  let {
    name, icon, url, creator
  } = req.body
  // console.log(req.body); return console.log(req.file)
  const social = new Socialmedia({
    name, icon, url, creator
  })
  
  social.save()
  .then(async data => {
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { socialMedias: data._id } },
    )

    let socialMedias = await data.populate('icon').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: socialMedias.length,
      data: socialMedias
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new social data from Social Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Social)
// @route   POST /api/v1/users/private/profile/social/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserSocial = async(req, res, next) => {
  let {
    socialId, social
  } = req.body

  await Socialmedia.findByIdAndUpdate(
    { _id: socialId },
    { $set: {
      name: social.name,
      icon: social.icon,
      url: social.url
    } },
    { new: true }
  )
  .then(async data => {
    let socialMedias = await data.populate('icon').execPopulate()

    return res.status(200).json({
      success: true,
      count: socialMedias.length,
      data: socialMedias
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update social from Social Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Social Publish)
// @route   POST /api/v1/users/private/profile/social/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserSocialPublish = async(req, res, next) => {
  let { socialId, intention } = req.body
  
  await Socialmedia.findByIdAndUpdate(
    { _id: socialId },
    { $set: {
      status: (() => intention === 'publish' ? 1 : 0)()
    } },
    { new: true }
  )
  .then(async data => {
    let socialMedias = await data.populate('icon').execPopulate()

    return res.status(200).json({
      success: true,
      count: socialMedias.length,
      data: socialMedias
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update social publish from Social Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Delete A User's Social Media)
// @route   POST /api/v1/users/private/profile/social/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivateUserSocial = async(req, res, next) => {
  try {
    // check if social is published first
    let social = await Socialmedia.findById(req.body.socialId)
    if(social) {
      if(social.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete social! Please unpublished the social first.`,
        data: {}
      })
    }

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { socialMedias: req.body.socialId } },
    )

    // delete about
    social.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete social data from Social Collection`,
      data: err
    })
  }
}