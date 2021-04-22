/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  adminAccessPublic,
} = require('../controllers')
// Project Methods
const { getPublicUserFooterPublic, getPublicUserHome, getPublicUserAbout, getPublicUserResume } = require('../methods')

/** Routes */
// @desc    Portfolio V4 Footer Public (Get A User)
// @route   POST /api/v1/users/getfooterpublic
// @access  Public (Only need Admin Public Access Key)
router.route('/getfooterpublic')
  .post(adminAccessPublic, getPublicUserFooterPublic)

// @desc    Portfolio V4 Home Page (Get A User)
// @route   POST /api/v1/users/gethome
// @access  Public (Only need Admin Public Access Key)
router.route('/gethome')
  .post(adminAccessPublic, getPublicUserHome)

// @desc    Portfolio V4 About Page (Get A User)
// @route   POST /api/v1/users/getabout
// @access  Public (Only need Admin Public Access Key)
router.route('/getabout')
.post(adminAccessPublic, getPublicUserAbout)

// @desc    Portfolio V4 Resume Page (Get A User)
// @route   POST /api/v1/users/getresume
// @access  Public (Only need Admin Public Access Key)
router.route('/getresume')
.post(adminAccessPublic, getPublicUserResume)

/** Export */
module.exports = router