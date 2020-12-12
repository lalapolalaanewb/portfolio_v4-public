/** Dependencies */
// Model - Project
const {
  Media
} = require('../models')
// Controllers
const { imgFolderLocation, uploadMultiImgFile, handleImgRemove } = require('../controllers')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 Media Dashboard (Get All Media)
// @route   POST /api/v1/medias/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateMedias = async(req, res, next) => {
  await Media.find().sort({ cretaedAt: -1 })
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
exports.addPrivateMedia = async(req, res, next) => {
  try {
    return console.log(req.files)
    // upload multiple files
    await uploadMultiImgFile(req, res)

    // create new media
    let images = []
    req.files.forEach(file => {
      images.push({
        imgSrc: file.originalname,
        imgAlt: file.originalname,
        dimension: 'dimension',
        size: 'size',
        creator: '5f8fc26c6a103b243428bec1'
      })
    })
    
    let medias = await Media.insertMany(images)
    
    return res.status(200).json({
      success: true,
      count: medias.length,
      data: medias.populate('creator').execPopulate()
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to add new post media/s from Media Collection`,
      data: err
    })
  }

  const media = new Media({
    imgSrc: req.file.originalname,
    imgAlt: handleNoneInput(req.body.imgAlt),
    dimension: 'dimension',
    size: 'size',
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID
  })
  
  media.save()
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
      error: `Failed to add new post media/s from Media Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Media Dashboard (Update A Media Publishment)
// @route   POST /api/v1/medias/private/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateMediaPublish = async(req, res, next) => {
  let { mediaId, intention } = req.body
  
  await Media.findByIdAndUpdate(
    { _id: mediaId },
    { $set: {
      status: (() => intention === 'publish' ? 1 : 0)()
    } },
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
exports.updatePrivateMedia = async(req, res, next) => {
  let {
    imgAlt,
    creator
  } = req.body
  
  await Media.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      imgAlt: handleNoneInput(imgAlt),
      creator: creator
    } },
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
exports.deletePrivateMedia = async(req, res, next) => {
  try {
    // check if media is published first
    let media = await Media.findById(req.params.id)
    if(media) {
      if(media.status === 1) return res.status(400).json({
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
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete media data from Media Collection`,
      data: err
    })
  }
}