/** Dependencies */
// Controllers
const {
  // Redis Data
  getDefaultAllData
} = require('../controllers')

/** Page Specific Functions */
// get all required data from redis
const getAllData = async() => {
  const redisAllData = await getDefaultAllData()
  return {
    policies: redisAllData.policiesRedis,
    users: redisAllData.usersRedis
  }
}

/** Methods */
// @desc    Portfolio V4 Policy Comment Page
// @route   POST /api/v1/policies/get/comment
// @access  Public (Only need Admin Public Access Key)
exports.getPublicPolicyComment = async(req, res, next) => {
  // get policies data from redis
  let redisAllData = await getAllData()
  let policies = redisAllData.policies

  // get active policy info
  let policy = policies.find(policy => policy.status === 1)
  if(!policy) return res.status(400).json({
    success: false,
    error: `Failed to get active comment policy data.`,
    data: {}
  })

  return res.status(200).json({
    success: true,
    count: 1,
    data: {
      _id: policy._id,
      comment: policy.comment
    }
  })
}