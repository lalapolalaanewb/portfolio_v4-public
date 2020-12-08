/** Imports */
// Auth Methods
const { 
  userLogin, userLogout, 
  userRegister, userRegisterOnLike, userRegisterOnComment 
} = require('./auth')
// User Methods
const {
  getPublicUserFooterPublic, 
  getPublicUserHome,
  getPublicUserAbout,
  getPrivateUsers, 
  addPrivateUser, 
  updatePrivateUserActive,
  updatePrivateUser, 
  deletePrivateUser 
} = require('./user')
// Profile Personal Methods
const { 
  getPrivateUserPersonal, 
  updatePrivateUserPersonal,
  updatePrivateUserPersonalPassword, 
} = require('./personal')
// Profile Home Methods
const {
  getPrivateUserHome,
  addPrivateUserHome,
  updatePrivateUserHome, updatePrivateUserHomeImg, updatePrivateUserHomePublish,
  deletePrivateUserHome
} = require('./home')
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
// Profile Job Methods
const {
  getPrivateUserJob,
  addPrivateUserJob,
  updatePrivateUserJob, updatePrivateUserJobPublish,
  deletePrivateUserJob
} = require('./job')
// Profile Resume Methods
const {
  getPrivateUserResume,
  addPrivateUserResume,
  updatePrivateUserResume, updatePrivateUserResumePublish,
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
// Post Methods
const { 
  getPublicPosts, getPublicPost, 
  updatePublicPost, 
  getPrivatePosts, 
  addPrivatePost, 
  updatePrivatePostImg, updatePrivatePostPublish, updatePrivatePost, 
  deletePrivatePost 
} = require('./post')
// Media Social Methods
const {
  getPrivateMediaSocials, 
  addPrivateMediaSocial, 
  updatePrivateMediaSocial, 
  deletePrivateMediaSocial
} = require('./mediaSocial')
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
// Dashboard Methods
const { getPrivateDashboard } = require('./dashboard')

/** Exports */
module.exports = {
  // Auth
  userLogin, userLogout, 
  userRegister, userRegisterOnLike, userRegisterOnComment,
  // User
  getPublicUserFooterPublic,
  getPublicUserHome,
  getPublicUserAbout,
  getPrivateUsers, 
  addPrivateUser, 
  updatePrivateUserActive,
  updatePrivateUser, 
  deletePrivateUser, 
  // Profile Personal
  getPrivateUserPersonal, 
  updatePrivateUserPersonal,
  updatePrivateUserPersonalPassword, 
  // Profile Home
  getPrivateUserHome,
  addPrivateUserHome,
  updatePrivateUserHome, updatePrivateUserHomeImg, updatePrivateUserHomePublish,
  deletePrivateUserHome,
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
  // Profile job
  getPrivateUserJob,
  addPrivateUserJob,
  updatePrivateUserJob, updatePrivateUserJobPublish,
  deletePrivateUserJob,
  // Profile Resume
  getPrivateUserResume,
  addPrivateUserResume,
  updatePrivateUserResume, updatePrivateUserResumePublish,
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
  // Post
  getPublicPosts, getPublicPost, 
  updatePublicPost, 
  getPrivatePosts, 
  addPrivatePost, 
  updatePrivatePostImg, updatePrivatePostPublish, updatePrivatePost, 
  deletePrivatePost,
  // Media Social
  getPrivateMediaSocials, 
  addPrivateMediaSocial, 
  updatePrivateMediaSocial, 
  deletePrivateMediaSocial,
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
  // Dashboard
  getPrivateDashboard,
}