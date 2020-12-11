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
  getPrivatePolicies, 
  addPrivatePolicy, 
  updatePrivatePolicy, updatePrivatePolicyPublish,
  deletePrivatePolicy, 
} = require('../methods')

/** Routes */
// @desc    Portfolio V4 Policy Dashboard (Get All Policy)
// @route   POST /api/v1/policies/private/get
// @access  Private (Require sessionId & uid)
router.route('/private/get')
  // .post(redirect2Login, getPrivatePolicies)
  .post(getPrivatePolicies)

// @desc    Portfolio V4 Policy Dashboard (Add A Policy)
// @route   POST /api/v1/policies/private/add
// @access  Private (Require sessionId & uid)
router.route('/private/add')
  // .post(redirect2Login, addPrivatePolicy)
  .post(addPrivatePolicy)

// @desc    Portfolio V4 Policy Dashboard (Update A Policy)
// @route   POST /api/v1/policies/private/update
// @access  Private (Require sessionId & uid)
router.route('/private/update')
  // .post(redirect2Login, updatePrivatePolicy)
  .post(updatePrivatePolicy)

// @desc    Portfolio V4 Policy Dashboard (Update A Policy's Publish)
// @route   POST /api/v1/policies/private/update/publish
// @access  Private (Require sessionId & uid)
router.route('/private/update/publish')
  // .post(redirect2Login, updatePrivatePolicyPublish)
  .post(updatePrivatePolicyPublish)

// @desc    Portfolio V4 Policy Dashboard (Delete A Policy)
// @route   POST /api/v1/policies/private/delete
// @access  Private (Require sessionId & uid)
router.route('/private/delete/:id')
  // .delete(redirect2Login, deletePrivatePolicy)
  .delete(deletePrivatePolicy)

/** Export */
module.exports = router