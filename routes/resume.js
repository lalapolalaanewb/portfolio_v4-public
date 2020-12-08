/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  redirect2Login, redirect2Home,
} = require('../controllers')
// Project Methods
const {
  getPrivateUserResume, 
  addPrivateUserResume, 
  updatePrivateUserResume, updatePrivateUserResumePublish,
  deletePrivateUserResume, 
} = require('../methods')

/** Routes */
// @desc    Portfolio V4 User Profile (Get A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/get
// @access  Private (Require sessionId & uid)
router.route('/get')
  // .post(redirect2Login, getPrivateUserResume)
  .post(getPrivateUserResume)

// @desc    Portfolio V4 Users Profile (Add A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/add
// @access  Private (Require sessionId & uid)
router.route('/add')
  // .post(redirect2Login, addPrivateUserResume)
  .post(addPrivateUserResume)

// @desc    Portfolio V4 Users Profile (Update A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/update
// @access  Private (Require sessionId & uid)
router.route('/update')
  // .post(redirect2Login, updatePrivateUserResume)
  .post(updatePrivateUserResume)

// @desc    Portfolio V4 Users Profile (Update A User's Resume Publish)
// @route   POST /api/v1/users/private/profile/resume/update/publish
// @access  Private (Require sessionId & uid)
router.route('/update/publish')
  // .post(redirect2Login, updatePrivateUserResumePublish)
  .post(updatePrivateUserResumePublish)

// @desc    Portfolio V4 Users Profile (Delete A User's Resume)
// @route   POST /api/v1/users/private/profile/resume/delete
// @access  Private (Require sessionId & uid)
router.route('/delete')
  // .delete(redirect2Login, deletePrivateUserResume)
  .post(deletePrivateUserResume)

/** Export */
module.exports = router