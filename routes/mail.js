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
  getPublicContactStatus,
  addPublicMail
} = require('../methods')

/** Routes */
// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/mails/public/get/status
// @access  Public (Only need Admin Public Access Key)
router.route('/public/get/status')
  .post(adminAccessPublic, getPublicContactStatus)

// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/mails/public/add
// @access  Public (Only need Admin Public Access Key)
router.route('/public/add')
  .post(adminAccessPublic, addPublicMail)

/** Export */
module.exports = router