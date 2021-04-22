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
  addPublicSubscription,
} = require('../methods')

/** Routes */
// @desc    Portfolio V4 Subscription (Add A Subscription)
// @route   POST /api/v1/subscriptions/public/add
// @access  Public (Only need Admin Public Access Key)
router.route('/public/add')
  .post(adminAccessPublic, addPublicSubscription)

/** Export */
module.exports = router