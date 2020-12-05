/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  redirect2Login, redirect2Home
} = require('../controllers')
// Project Methods
const { getPrivateDashboard } = require('../methods')

/** Routes */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/dashboard
// @access  Private (Require sessionId & uid)
router.route('/')
  // .post(redirect2Login, getPrivateDashboard)
  .post(getPrivateDashboard)

/** Export */
module.exports = router