/** Dependencies */
// Model - User
const {
  User, Education
} = require('../models')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/users/private/profile/education/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUserEducation = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('educations')
  .populate('educations')
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
      error: `Failed to get education data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Add A User's Education)
// @route   POST /api/v1/users/private/profile/education/add
// @access  Private (Require sessionId & uid)
exports.addPrivateUserEducation = async(req, res, next) => {
  let {
    course, title, entity, studyStatus, creator
  } = req.body
  // console.log(req.body)
  const education = new Education({ 
    course: handleNoneInput(course),
    title: handleNoneInput(title), 
    entity: handleNoneInput(entity), 
    studyStatus: studyStatus,
    creator: creator 
  })
  
  education.save()
  .then(async data => {
    await User.findOneAndUpdate(
      { _id: creator },
      { $push: { educations: data._id } },
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
      error: `Failed to add new education data from Education Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Education)
// @route   POST /api/v1/users/private/profile/education/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserEducation = async(req, res, next) => {
  let {
    eduId, edu
  } = req.body

  await Education.findByIdAndUpdate(
    { _id: eduId },
    { $set: {
      course: handleNoneInput(edu.course),
      title: handleNoneInput(edu.title),
      entity: handleNoneInput(edu.entity),
      studyStatus: edu.studyStatus
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
      error: `Failed to update education from Education Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User's Education Publish)
// @route   POST /api/v1/users/private/profile/education/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserEducationPublish = async(req, res, next) => {
  let { eduId, intention } = req.body
  
  await Education.findByIdAndUpdate(
    { _id: eduId },
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
      error: `Failed to update education publish from Education Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Delete A User's Education)
// @route   POST /api/v1/users/private/profile/education/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivateUserEducation = async(req, res, next) => {
  try {
    // check if edu is published first
    let edu = await Education.findById(req.body.eduId)
    if(edu) {
      if(edu.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete education! Please unpublished the education first.`,
        data: {}
      })
    }

    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { educations: req.body.eduId } },
    )

    // delete edu
    edu.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete edu data from Education Collection`,
      data: err
    })
  }
}