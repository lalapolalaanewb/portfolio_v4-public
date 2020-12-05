/** Dependencies */
// Model - Project
const {
  Mediasocial, Socialmedia
} = require('../models')

/** Methods */

// @desc    Portfolio V4 Media Socials Dashboard (Get All Media Socials)
// @route   POST /api/v1/mediasocials/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateMediaSocials = async(req, res, next) => {
  await Mediasocial.find().sort({ name: 1 })
  .populate('creator')
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
      error: `Failed to get data from Mediasocial Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Media Socials Dashboard (Add A Media Social)
// @route   POST /api/v1/mediasocials/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateMediaSocial = async(req, res, next) => {
  let {
    name, abbreviation
  } = req.body

  const mediaSocial = new Mediasocial({
    name: name,
    abbreviation: abbreviation,
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID
  })

  mediaSocial.save()
  .then(async data => {
    let mediaSocial = await data.populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: mediaSocial.length,
      data: mediaSocial
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new media social data to Mediasocial Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Media Socials Dashboard (Update A Media Social)
// @route   POST /api/v1/mediasocials/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateMediaSocial = async(req, res, next) => {
  let {
    name, abbreviation, creator
  } = req.body

  await Mediasocial.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: name,
      abbreviation: abbreviation,
      creator: creator
    } },
    { new: true }
  )
  .then(async data => {
    let mediaSocial = await data.populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: mediaSocial.length,
      data: mediaSocial
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update media social data from Mediasocial Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Media Socials Dashboard (Delete A Media Social)
// @route   POST /api/v1/mediasocials/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateMediaSocial = async(req, res, next) => {
  try {
    // check if data being use in Socialmedia Model
    let socialMedias = await Socialmedia.find().where({ icon: req.params.id })
    if(socialMedias.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Socialmedia Collection first`,
      data: {}
    })

    // delete mediaSocial
    await Mediasocial.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete media social data from Mediasocial Collection`,
      data: err
    })
  }
}