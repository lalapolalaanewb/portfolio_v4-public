/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  adminAccessPublic
} = require('../controllers')
// Project Methods
const {
  getPublicProjects, 
  updatePublicProject
} = require('../methods')

/** Routes */
// @desc    Portfolio V4 Projects (Get All Projects)
// @route   POST /api/v1/projects
// @access  Public (Only need Admin Public Access Key)
router.route('/')
  .post(adminAccessPublic , getPublicProjects)

// @desc    Portfolio V4 Projects (Get Project Like)
// @route   POST /api/v1/projects/public/update
// @access  Public (Only need Admin Public Access Key)
router.route('/public/update')
  .post(adminAccessPublic , updatePublicProject)

/** Export */
module.exports = router