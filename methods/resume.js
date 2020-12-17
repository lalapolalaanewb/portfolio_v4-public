/** Dependencies */
// Model - User
const {
  User, Technology, Resume
} = require('../models')
// Controllers
const { handlePdfRemove } = require('../controllers')

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
// handle empty array
const handleEmptyArray = array => array === '' ? [] : array.split(',')

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/users/private/profile/resume/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserResume = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('name.firstName resumes projects educations jobs')
  .populate('resumes')
  .populate('projects')
  .populate('educations')
  .populate('jobs')
  .then(async data => {
    // get all resumes created by user
    let resumes = await Resume.find()
    .populate('techs').populate('projects').populate('educations').populate('jobs')
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
        projects: data.projects,
        educations: data.educations,
        jobs: data.jobs
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
    website, title, description, techs, projects, educations, jobs, creator
  } = req.body
  
  let techNames = techs.split(',')
  let techIds = await handleGetTechIds(techNames)

  const resume = new Resume({ 
    pdfSrc: req.file.originalname,
    contactInfo: { 
      website: handleNoneInput(website),
      title: handleNoneInput(title) 
    },
    description: handleNoneInput(description), 
    techs: techIds,
    projects: handleEmptyArray(projects), 
    educations: handleEmptyArray(educations),
    jobs: handleEmptyArray(jobs),
    creator: creator 
  })
  // console.log(resume)
  resume.save()
  .then(async data => {
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { resumes: data._id } },
    )

    let resume = await data.populate('techs').populate('projects').populate('educations').populate('jobs').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: resume.length,
      data: resume
    })
  })
  .catch(err => { console.log(err)
    res.status(500).json({
      success: false,
      error: `Failed to add new resume data from Resume Collection`,
      data: err
    })

    // - remove image from server images folder
    handlePdfRemove(res, req.file.originalname)
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserResume = async(req, res, next) => {
  let {
    resumeId, resume
  } = req.body
  console.log(resume.educations); console.log(typeof resume.educations)
  let techIds = await handleGetTechIds(resume.techs)

  await Resume.findByIdAndUpdate(
    { _id: resumeId },
    { $set: {
      contactInfo: { 
        website: handleNoneInput(resume.website),
        title: handleNoneInput(resume.title) 
      },
      description: handleNoneInput(resume.description),
      techs: techIds,
      projects: resume.projects,
      educations: resume.educations,
      jobs: resume.jobs
    } },
    { new: true }
  )
  .then(async data => {
    let resume = await data.populate('techs').populate('projects').populate('educations').populate('jobs').execPopulate()

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

// @desc    Portfolio V4 Users Profile (Update A User's Resume Pdf)
// @route   POST /api/v1/users/private/profile/resume/update/pdf
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserResumePdf = async(req, res, next) => {
  let { resumeId, pdfSrc } = req.body

  // - remove image from server images folder
  handlePdfRemove(res, pdfSrc)

  await Resume.findByIdAndUpdate(
    { _id: resumeId },
    { $set: { pdfSrc: req.file.originalname } },
    { new: true }
  )
  .then(async data => {
    let resume = await data.populate('techs').populate('projects').populate('educations').populate('jobs').execPopulate()

    return res.status(200).json({
      success: true,
      count: resume.length,
      data: resume
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update resume pdf from Resume Collection`,
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
    
    let resume = await data.populate('techs').populate('projects').populate('educations').populate('jobs').execPopulate()

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
    let resumeDeleted = await Resume.findByIdAndDelete(req.body.resumeId)
    
    // - remove pdf from server files folder
    handlePdfRemove(res, resumeDeleted.pdfSrc)

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