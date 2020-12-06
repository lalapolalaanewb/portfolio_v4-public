// Model - Project
const {
  Project, Likestatus, Technology, User
} = require('../models')
// Controllers
const { imgFolderLocation, handleImgRemove } = require('../controllers')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}
// handle getting techIds
const handleGetTechIds = async (techNames) => {

  let techObjIds = await Technology.find().select('_id').where('name').in(techNames).exec()
  if(!techObjIds) return res.status(500).json({
    success: false,
    error: `No tech found or match with Technology Collection`,
    data: {}
  })

  let techIds = []
  techObjIds.forEach(objId => techIds.push(objId._id))

  return techIds
}

/** Methods */
// @desc    Portfolio V4 Projects
// @route   POST /api/v1/projects
// @access  Public (Only need Admin Public Access Key)
exports.getPublicProjects = async(req, res, next) => {
  return await Project.find().where({ status: 1 }).sort({ publishedAt: 1 })
  .populate('techs')
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
      error: `Failed to get data from Projects Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects (Get Project Like)
// @route   POST /api/v1/projects/public/update
// @access  Public (Only need Admin Public Access Key)
exports.updatePublicProject = async(req, res, next) => {
  let status

  return await Likestatus.find({ ipv4: req.body.ipv4 })
  .then(async data => {
    data.likedProjects.map(proj => {
      if(proj.projectId === req.body.projectId) status = proj.status 
    })

    if(status) return await Project.findByIdAndUpdate(
      { _id: req.body.projectId },
      { $set: { like: +req.body.projectLikeCount - 1 } }
    )
    else return await Project.findByIdAndUpdate(
      { _id: req.body.projectId },
      { $set: { like: +req.body.projectLikeCount + 1 } }
    )
  })
  .then(async data => {
    return await Likestatus.updateOne(
      { ipv4: req.body.ipv4 },
      { $set: { "likedProjects.$[projectId].status": !status } },
      { arrayFilters: [{ "projectId.projectId": req.body.projectId }] }
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
      error: `Failed to update data from Projects & Likestatus Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Get All Projects)
// @route   POST /api/v1/projects/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateProjects = async(req, res, next) => {
  return await Project.find().sort({ publishedAt: -1 })
  .populate('techs')
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
      error: `Failed to get data from Projects Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Add A Project)
// @route   POST /api/v1/projects/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateProject = async(req, res, next) => {
  let {
    name,
    www, code,
    techs,
    description,
    subDescription,
  } = req.body

  let techNames = techs.split(',')
  let techIds = await handleGetTechIds(techNames)

  const project = new Project({
    name: name,
    imgSrc: req.file.originalname,
    description: handleNoneInput(description),
    subDescription: handleNoneInput(subDescription),
    liveUrls: {
      www: handleNoneInput(www),
      code: handleNoneInput(code)
    },
    techs: techIds,
    publishedAt: new Date(Date.now()).toISOString(),
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID
  })

  project.save()
  .then(async project => {
    await User.updateOne(
      { _id: '5f8fc26c6a103b243428bec1' },
      { $push: { projects: project._id } },
    )
    
    project = await project.populate('techs').populate('creator').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: project.length,
      data: project
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new project data from Projects Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Update A Project Img)
// @route   POST /api/v1/projects/private/update/image
// @access  Private (Require sessionId & uid)
exports.updatePrivateProjectimg = async(req, res, next) => {
  let { projectId, imgSrc } = req.body

  // - remove image from server images folder
  handleImgRemove(res, imgSrc)

  await Project.findByIdAndUpdate(
    { _id: projectId },
    { $set: { imgSrc: req.file.originalname } },
    { new: true }
  )
  .then(async data => {
    
    let project = await data.populate('techs').populate('creator').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: project.length,
      data: project
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update project image from Projects Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Update A Project Publishment)
// @route   POST /api/v1/projects/private/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateProjectPublish = async(req, res, next) => {
  let { projectId, intention } = req.body
  
  await Project.findByIdAndUpdate(
    { _id: projectId },
    { $set: {
      status: (() => intention === 'publish' ? 1 : 0)()
    } },
    { new: true }
  )
  .then(async data => {
    let project = await data.populate('techs').populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: project.length,
      data: project
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update project publish from Projects Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Update A Project)
// @route   POST /api/v1/projects/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateProject = async(req, res, next) => {
  let {
    name,
    www, code,
    techs,
    description,
    subDescription,
    // like,
    creator
  } = req.body
  
  let techIds = await handleGetTechIds(techs)
  let shouldCreatorUpdate
  creator.current === creator.new ? shouldCreatorUpdate = 'no' : shouldCreatorUpdate = 'yes'
  
  await Project.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: name,
      liveUrls: {
        www: handleNoneInput(www),
        code: handleNoneInput(code)
      },
      techs: techIds,
      description: handleNoneInput(description),
      subDescription: handleNoneInput(subDescription),
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
        { $pull: { projects: req.params.id } },
      )
      // add to new user
      await User.updateOne(
        { _id: creator.new },
        { $push: { projects: req.params.id } },
      )
    }

    let project = await data.populate('techs').populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: project.length,
      data: project
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update project data from Projects Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Delete A Project)
// @route   POST /api/v1/projects/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateProject = async(req, res, next) => {
  await Project.findByIdAndDelete(req.params.id)
  .then(async data => {
    // - remove image from server images folder
    handleImgRemove(res, data.imgSrc)

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { projects: req.params.id } },
    )

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to delete project data from Techs Collection`,
      data: err
    })
  })
}