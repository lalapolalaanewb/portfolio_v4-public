/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  adminAccessPublic
} = require('../controllers')
// Project Methods
const { getPublicPosts, getPublicPost, updatePublicPost } = require('../methods')

/** Routes */
// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/posts
// @access  Public (Only need Admin Public Access Key)
router.route('/')
  .post(adminAccessPublic, getPublicPosts)

// @desc    Portfolio V4 Posts (Get A Post)
// @route   POST /api/v1/posts/public/get
// @access  Public (Only need Admin Public Access Key)
router.route('/public/get')
  .post(adminAccessPublic, getPublicPost)

// @desc    Portfolio V4 Posts (Update Post Like)
// @route   POST /api/v1/posts/public/update
// @access  Public (Only need Admin Public Access Key)
router.route('/public/update')
  .post(adminAccessPublic, updatePublicPost)

/** Export */
module.exports = router