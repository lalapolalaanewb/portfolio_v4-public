/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  adminAccessPublic,
} = require('../controllers')
// Project Methods
const {
  getPublicPolicyComment
} = require('../methods')

/** Routes */
// @desc    Portfolio V4 Policy Comment Page
// @route   POST /api/v1/policies/public/get/comment
// @access  Public (Only need Admin Public Access Key)
router.route('/public/get/comment')
  .post(adminAccessPublic , getPublicPolicyComment)

/** Export */
module.exports = router