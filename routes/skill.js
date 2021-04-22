/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  adminAccessPublic
} = require('../controllers')
// Skill Methods
const { getPublicSkills } = require('../methods')

/** Routes */
// @desc    Portfolio V4 Skills (Get All Skills)
// @route   POST /api/v1/skills
// @access  Public (Only need Admin Public Access Key)
router.route('/')
  .post(adminAccessPublic, getPublicSkills)

/** Export */
module.exports = router