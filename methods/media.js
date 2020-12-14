/** Dependencies */
// Model - Project
const {
  Media
} = require('../models')
// Controllers
const { imgFolderLocation, uploadMultiImgFile, handleImgRemove } = require('../controllers')
const { populate } = require('../models/Job')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if (input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 Media Dashboard (Get All Media)
// @route   POST /api/v1/medias/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateMedias = async (req, res, next) => {
  await Media.find().sort({ createdAt: -1 })
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
        error: `Failed to get data from Media Collection`,
        data: err
      })
    })
}

// @desc    Portfolio V4 Posts Media (Add Media/s)
// @route   POST /api/v1/medias/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateMedia = async (req, res, next) => {
  try {
    // upload multiple files
    await uploadMultiImgFile(req, res)

    // photos upload limit
    if (req.files.length <= 0) return res.status(400).json({
      success: false,
      error: `You must at least upload 1 image!`,
      data: {}
    })

    // create new media
    let images = []
    req.files.forEach(file => {
      images.push({
        imgSrc: file.originalname,
        imgAlt: file.originalname,
        dimension: 'dimension',
        size: file.size,
        creator: '5f8fc26c6a103b243428bec1'
      })
    })

    // insert all medias
    let medias = await Media.insertMany(images)

    // get populated medias
    let mediaIds = []
    medias.forEach(media => mediaIds.push(media._id))
    let populatedMedias = await Media.find({ _id: { $in: mediaIds } }).populate('creator')

    return res.status(200).json({
      success: true,
      count: populatedMedias.length,
      data: populatedMedias
    })
  } catch (err) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({
      success: false,
      error: `You can upload only 10 images at a time!`,
      data: err.code
    })
    else return res.status(500).json({
      success: false,
      error: `Failed to add new post media/s from Media Collection`,
      data: err
    })
  }
}

// @desc    Portfolio V4 Media Dashboard (Update A Media Publishment)
// @route   POST /api/v1/medias/private/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateMediaPublish = async (req, res, next) => {
  let { mediaId, intention } = req.body

  await Media.findByIdAndUpdate(
    { _id: mediaId },
    {
      $set: {
        status: (() => intention === 'publish' ? 1 : 0)()
      }
    },
    { new: true }
  )
    .then(async data => {
      let media = await data.populate('creator').execPopulate()

      return res.status(200).json({
        success: true,
        count: media.length,
        data: media
      })
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        error: `Failed to update media publish from Media Collection`,
        data: err
      })
    })
}

// @desc    Portfolio V4 Media Dashboard (Update A Media)
// @route   POST /api/v1/medias/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateMedia = async (req, res, next) => {
  let {
    imgAlt,
    creator
  } = req.body

  await Media.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        imgAlt: handleNoneInput(imgAlt),
        creator: creator
      }
    },
    { new: true }
  )
    .then(async data => {
      let media = await data.populate('creator').execPopulate()

      return res.status(200).json({
        success: true,
        count: media.length,
        data: media
      })
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        error: `Failed to update media data from Media Collection`,
        data: err
      })
    })
}

// @desc    Portfolio V4 Media Dashboard (Delete A Media)
// @route   POST /api/v1/medias/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateMedia = async (req, res, next) => {
  try {
    // check if media is published first
    let media = await Media.findById(req.params.id)
    if (media) {
      if (media.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete media! Please unpublished the media first.`,
        data: {}
      })
    }

    // - remove image from server images folder
    handleImgRemove(res, media.imgSrc)

    // delete post
    media.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete media data from Media Collection`,
      data: err
    })
  }
}