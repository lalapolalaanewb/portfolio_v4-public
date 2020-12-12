/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  Policy
} = require('../models')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */
// @desc    Portfolio V4 Policy Comment Page
// @route   POST /api/v1/policies/get/comment
// @access  Public (Only need Admin Public Access Key)
exports.getPublicPolicyComment = async(req, res, next) => {
  await Policy.findOne().where({ status: 1 })
  .select('comment')
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
      error: `Failed to get policy comment data from Policy Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Policy Dashboard (Get All Policy)
// @route   POST /api/v1/policies/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivatePolicies = async(req, res, next) => {
  await Policy.find().sort({ name: 1 })
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
      error: `Failed to get policy data from Policy Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Policy Dashboard (Add A Policy)
// @route   POST /api/v1/policies/private/add
// @access  Private (Require sessionId & uid)
exports.addPrivatePolicy = async(req, res, next) => {
  let {
    name, privacy, comment
  } = req.body
  // console.log(req.body)
  const policy = new Policy({ 
    name: handleNoneInput(name), 
    privacy: handleNoneInput(privacy),
    comment: handleNoneInput(comment),
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID 
  })
  
  policy.save()
  .then(async data => {
    let policy = await data.populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: policy.length,
      data: policy
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new policy data from Policy Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Policy Dashboard (Update A Policy)
// @route   POST /api/v1/policies/private/update
// @access  Private (Require sessionId & uid)
exports.updatePrivatePolicy = async(req, res, next) => {
  let {
    policyId, policy
  } = req.body

  await Policy.findByIdAndUpdate(
    { _id: policyId },
    { $set: {
      name: handleNoneInput(policy.name),
      privacy: handleNoneInput(policy.privacy),
      comment: handleNoneInput(policy.comment),
      creator: policy.creator
    } },
    { new: true }
  )
  .then(async data => {
    let policy = await data.populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: policy.length,
      data: policy
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update policy from Policy Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Policy Dashboard (Update A Policy's Publish)
// @route   POST /api/v1/policies/private/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivatePolicyPublish = async(req, res, next) => {
  let { policyId, intention } = req.body
  
  try {
    // check if other policy is published
    let policyActive = await Policy.findOne().where({ status: 1 }).select('name')
    if(policyActive) {
      if(policyActive._id.toString() !== policyId) return res.status(400).json({
        success: false,
        error: `Policy ${policyActive.name} still ACTIVE! Please deactivate the policy first.`,
        data: {}
      })
    } 

    let data = await Policy.findByIdAndUpdate(
      { _id: policyId },
      { $set: {
        status: (() => intention === 'publish' ? 1 : 0)()
      } },
      { new: true }
    )

    let policy = await data.populate('creator').execPopulate()
    
    return res.status(200).json({
      success: true,
      count: policy.length,
      data: policy
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to update policy publish from Policy Collection`,
      data: err
    })
  }
}

// @desc    Portfolio V4 Policy Dashboard (Delete A Policy)
// @route   POST /api/v1/policies/private/delete
// @access  Private (Require sessionId & uid)
exports.deletePrivatePolicy = async(req, res, next) => {
  try {
    // check if policy is published first
    let policy = await Policy.findById(req.params.id)
    if(policy) {
      if(policy.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete policy! Please unpublished the policy first.`,
        data: {}
      })
    }

    // delete job
    policy.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete policy data from Policy Collection`,
      data: err
    })
  }
}