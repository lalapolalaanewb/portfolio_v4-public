/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  User, Technology, Project
} = require('../models')
const Resume = require('../models/Resume')

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
// handle getting projectIds
const handleGetProjectIds = async (projNames) => {

  let projObjIds = await Project.find().select('_id').where('name').in(projNames).exec()
  if(!projObjIds) return res.status(500).json({
    success: false,
    error: `No project found or match with Project Collection`,
    data: {}
  })

  let projIds = []
  projObjIds.forEach(objId => projIds.push(objId._id))

  return projIds
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/users/private/profile/resume/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserResume = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('name.firstName resumes projects')
  .populate('resumes')
  .populate('projects')
  .then(async data => {
    // get all resumes created by user
    let resumes = await Resume.find()
    .populate('techs').populate('projects')
    .where({ creator: data._id })
    if(!resumes) return res.status(400).json({
      success: false,
      error: `Failed to get resume data of user (${data.name.firstName}) from Resume Collection`,
      data: {}
    })

    return res.status(200).json({
      success: true,
      count: data.length,
      data: {
        _id: data._id,
        resumes: resumes,
        projects: data.projects
      }
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get resume data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Add A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/add
// @access  Private (Require sessionId & uid)
exports.addPrivateUserResume = async(req, res, next) => {
  let {
    website, desc, techs, projs, creator
  } = req.body

  let techIds = await handleGetTechIds(techs)

  const resume = new Resume({ 
    contactInfo: { website: handleNoneInput(website) },
    description: handleNoneInput(desc), 
    techs: techIds,
    projects: projs, 
    creator: creator 
  })
  
  resume.save()
  .then(async data => {
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { resumes: data._id } },
    )

    let resume = await data.populate('techs').populate('projects').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: resume.length,
      data: resume
    })
  })
  .catch(err => { console.log(err)
    return res.status(500).json({
      success: false,
      error: `Failed to add new resume data from Resume Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserResume = async(req, res, next) => {
  let {
    resumeId, resume
  } = req.body

  let techIds = await handleGetTechIds(resume.techs)

  await Resume.findByIdAndUpdate(
    { _id: resumeId },
    { $set: {
      contactInfo: { website: handleNoneInput(resume.website) },
      description: handleNoneInput(resume.description),
      techs: techIds,
      projects: resume.projects,
    } },
    { new: true }
  )
  .then(async data => {
    let resume = await data.populate('techs').populate('projects').execPopulate()

    return res.status(200).json({
      success: true,
      count: resume.length,
      data: resume
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update resume from Resume Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Resume Publish)
// @route   POST /api/v1/users/private/profile/resume/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserResumePublish = async(req, res, next) => {
  let { resumeId, intention } = req.body
  
  try {
    // check if other resume is published
    let resumeActive = await Resume.findOne().where({ status: 1 }).select('contactInfo')
    if(resumeActive) {
      if(resumeActive._id.toString() !== resumeId) return res.status(400).json({
        success: false,
        error: `Resume ${resumeActive.contactInfo.website} still ACTIVE! Please deactivate the resume first.`,
        data: {}
      })
    } 

    let data = await Resume.findByIdAndUpdate(
      { _id: resumeId },
      { $set: {
        status: (() => intention === 'publish' ? 1 : 0)()
      } },
      { new: true }
    )
    
    let resume = await data.populate('techs').populate('projects').execPopulate()

    return res.status(200).json({
      success: true,
      count: resume.length,
      data: resume
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to update resume publish from Resume Collection`,
      data: err
    })
  }
}

// @desc    Portfolio V4 Users Profile (Delete A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivateUserResume = async(req, res, next) => {
  try{
    // check if resume if ACTIVE
    let resumeActive = await Resume.findOne().where({ status: 1 }).select('_id')
    if(resumeActive) {
      if(resumeActive._id.toString() === req.body.resumeId) return res.status(400).json({
        success: false,
        error: `Please Deactivate the resume first before removing/deleting them.`,
        data: {}
      })
    }

    // remove resume
    await Resume.findByIdAndDelete(req.body.resumeId)

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { resumes: req.body.resumeId } },
    )

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete resume data from Resume Collection`,
      data: err
    })
  }
}