/** Imports */
// Auth Methods
const { 
  userLogin, userLogout, 
  userRegister, userRegisterOnLike, userRegisterOnComment 
} = require('./auth')
// Dashboard Methods
const { getPrivateDashboard } = require('./dashboard')
// Media Social Methods
const {
  getPrivateMediaSocials, 
  addPrivateMediaSocial, 
  updatePrivateMediaSocial, 
  deletePrivateMediaSocial
} = require('./mediaSocial')
// Policy Methods
const {
  getPrivatePolicies,
  addPrivatePolicy,
  updatePrivatePolicy, updatePrivatePolicyPublish,
  deletePrivatePolicy
} = require('./policy') 
// Post Methods
const { 
  getPublicPosts, getPublicPost, 
  updatePublicPost, 
  getPrivatePosts, 
  addPrivatePost, 
  updatePrivatePostImg, updatePrivatePostPublish, updatePrivatePost, 
  deletePrivatePost 
} = require('./post')
// Profile About Methods
const {
  getPrivateUserAbout,
  addPrivateUserAbout,
  updatePrivateUserAbout, updatePrivateUserAboutImg, updatePrivateUserAboutPublish,
  deletePrivateUserAbout
} = require('./about')
// Profile Education Methods
const {
  getPrivateUserEducation,
  addPrivateUserEducation,
  updatePrivateUserEducation, updatePrivateUserEducationPublish,
  deletePrivateUserEducation
} = require('./education')
// Profile Home Methods
const {
  getPrivateUserHome,
  addPrivateUserHome,
  updatePrivateUserHome, updatePrivateUserHomeImg, updatePrivateUserHomePublish,
  deletePrivateUserHome
} = require('./home')
// Profile Job Methods
const {
  getPrivateUserJob,
  addPrivateUserJob,
  updatePrivateUserJob, updatePrivateUserJobPublish,
  deletePrivateUserJob
} = require('./job')
// Profile Personal Methods
const { 
  getPrivateUserPersonal, 
  updatePrivateUserPersonal,
  updatePrivateUserPersonalPassword, 
} = require('./personal')
// Profile Resume Methods
const {
  getPrivateUserResume,
  addPrivateUserResume,
  updatePrivateUserResume, updatePrivateUserResumePdf, updatePrivateUserResumePublish,
  deletePrivateUserResume
} = require('./resume')
// Profile Social Methods
const {
  getPrivateUserSocial,
  addPrivateUserSocial,
  updatePrivateUserSocial, updatePrivateUserSocialPublish,
  deletePrivateUserSocial
} = require('./social')
// Project Methods
const { 
  getPublicProjects, 
  updatePublicProject, 
  getPrivateProjects, 
  addPrivateProject, 
  updatePrivateProjectimg, updatePrivateProjectPublish, updatePrivateProject, 
  deletePrivateProject 
} = require('./project')
// Skill Methods
const { 
  getPublicSkills, 
  getPrivateSkills, 
  addPrivateSkill, 
  updatePrivateSkill, 
  deletePrivateSkill 
} = require('./skill')
// Technology Methods
const { 
  getPrivateTechs, 
  addPrivateTech, 
  updatePrivateTech, 
  deletePrivateTech 
} = require('./tech')
// User Methods
const {
  getPublicUserFooterPublic, 
  getPublicUserHome,
  getPublicUserAbout,
  getPublicUserResume,
  getPrivateUsers, 
  addPrivateUser, 
  updatePrivateUserActive,
  updatePrivateUser, 
  deletePrivateUser 
} = require('./user')

/** Exports */
module.exports = {
  // Auth
  userLogin, userLogout, 
  userRegister, userRegisterOnLike, userRegisterOnComment,
  // Dashboard
  getPrivateDashboard,
  // Media Social
  getPrivateMediaSocials, 
  addPrivateMediaSocial, 
  updatePrivateMediaSocial, 
  deletePrivateMediaSocial,
  // Policy
  getPrivatePolicies,
  addPrivatePolicy,
  updatePrivatePolicy, updatePrivatePolicyPublish,
  deletePrivatePolicy,
  // Post
  getPublicPosts, getPublicPost, 
  updatePublicPost, 
  getPrivatePosts, 
  addPrivatePost, 
  updatePrivatePostImg, updatePrivatePostPublish, updatePrivatePost, 
  deletePrivatePost,
  // Profile About
  getPrivateUserAbout,
  addPrivateUserAbout,
  updatePrivateUserAbout, updatePrivateUserAboutImg, updatePrivateUserAboutPublish,
  deletePrivateUserAbout,
  // Profile Education
  getPrivateUserEducation,
  addPrivateUserEducation,
  updatePrivateUserEducation, updatePrivateUserEducationPublish,
  deletePrivateUserEducation,
  // Profile Home
  getPrivateUserHome,
  addPrivateUserHome,
  updatePrivateUserHome, updatePrivateUserHomeImg, updatePrivateUserHomePublish,
  deletePrivateUserHome,
  // Profile job
  getPrivateUserJob,
  addPrivateUserJob,
  updatePrivateUserJob, updatePrivateUserJobPublish,
  deletePrivateUserJob,
  // Profile Personal
  getPrivateUserPersonal, 
  updatePrivateUserPersonal,
  updatePrivateUserPersonalPassword, 
  // Profile Resume
  getPrivateUserResume,
  addPrivateUserResume,
  updatePrivateUserResume, updatePrivateUserResumePdf, updatePrivateUserResumePublish,
  deletePrivateUserResume,
  // Profile Social
  getPrivateUserSocial,
  addPrivateUserSocial,
  updatePrivateUserSocial, updatePrivateUserSocialPublish,
  deletePrivateUserSocial,
  // Project
  getPublicProjects, 
  updatePublicProject, 
  getPrivateProjects, 
  addPrivateProject, 
  updatePrivateProjectimg, updatePrivateProjectPublish, updatePrivateProject, 
  deletePrivateProject,
  // Skill
  getPublicSkills, 
  getPrivateSkills, 
  addPrivateSkill, 
  updatePrivateSkill, 
  deletePrivateSkill,
  // Technology
  getPrivateTechs, 
  addPrivateTech, 
  updatePrivateTech, 
  deletePrivateTech,
  // User
  getPublicUserFooterPublic,
  getPublicUserHome,
  getPublicUserAbout,
  getPublicUserResume,
  getPrivateUsers, 
  addPrivateUser, 
  updatePrivateUserActive,
  updatePrivateUser, 
  deletePrivateUser, 
}