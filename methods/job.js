/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  User, Job
} = require('../models')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/users/private/profile/job/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserJob = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('jobs')
  .populate('jobs')
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
      error: `Failed to get job data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Add A User's Job)
// @route   POST /api/v1/users/private/profile/job/add
// @access  Private (Require sessionId & uid)
exports.addPrivateUserJob = async(req, res, next) => {
  let {
    name, abbreviation, desc, company, creator
  } = req.body
  // console.log(req.body)
  const job = new Job({ 
    name: name, 
    abbreviation: handleNoneInput(abbreviation),
    description: handleNoneInput(desc),
    company: handleNoneInput(company), 
    creator: creator 
  })
  
  job.save()
  .then(async data => {
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { jobs: data._id } },
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
      error: `Failed to add new job data from Job Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Job)
// @route   POST /api/v1/users/private/profile/job/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserJob = async(req, res, next) => {
  let {
    jobId, job
  } = req.body

  await Job.findByIdAndUpdate(
    { _id: jobId },
    { $set: {
      name: job.name,
      abbreviation: handleNoneInput(job.abbreviation),
      description: handleNoneInput(job.description),
      company: handleNoneInput(job.company)
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
      error: `Failed to update job from Job Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Job Publish)
// @route   POST /api/v1/users/private/profile/job/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserJobPublish = async(req, res, next) => {
  let { jobId, intention } = req.body
  
  await Job.findByIdAndUpdate(
    { _id: jobId },
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
      error: `Failed to update job publish from Job Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Delete A User's Job)
// @route   POST /api/v1/users/private/profile/job/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivateUserJob = async(req, res, next) => {
  try {
    // check if job is published first
    let job = await Job.findById(req.body.jobId)
    if(job) {
      if(job.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete job! Please unpublished the job first.`,
        data: {}
      })
    }

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { jobs: req.body.jobId } },
    )

    // delete job
    job.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete job data from Job Collection`,
      data: err
    })
  }
}