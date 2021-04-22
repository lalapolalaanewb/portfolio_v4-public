/** Imports */
// Mail Methods
const {
  getPublicContactStatus,
  addPublicMail
} = require('./mail')
// Policy Methods
const {
  getPublicPolicyComment
} = require('./policy') 
// Post Methods
const { 
  getPublicPosts, getPublicPost, 
  updatePublicPost
} = require('./post')
// Project Methods
const { 
  getPublicProjects, 
  updatePublicProject
} = require('./project')
// Skill Methods
const { 
  getPublicSkills
} = require('./skill')
// Subscription Methods
const {
  addPublicSubscription
} = require('./subscription')
// User Methods
const {
  getPublicUserFooterPublic, 
  getPublicUserHome,
  getPublicUserAbout,
  getPublicUserResume
} = require('./user')

/** Exports */
module.exports = {
  // Mail
  getPublicContactStatus,
  addPublicMail,
  // Policy
  getPublicPolicyComment,
  // Post
  getPublicPosts, getPublicPost, 
  updatePublicPost, 
  // Project
  getPublicProjects, 
  updatePublicProject, 
  // Skill
  getPublicSkills, 
  // Subscription
  addPublicSubscription,
  // User
  getPublicUserFooterPublic,
  getPublicUserHome,
  getPublicUserAbout,
  getPublicUserResume 
}