/** Imports */
// Session
const { SESS_NAME, SESS_ABSOULTE_TIMEOUT, SESS_OPTIONS } = require('./session')
// Redis
const { RedisStore, redisClient, session } = require('./redis')
// Auth Session
const { logIn, logOut, forcedLogout } = require('./auth-session')
// Verification
const { redirect2Login, redirect2Home, userIsAuthenticated, userIsActive, adminAccessPublic } = require('./verification')
// Validation
const { registerValidation } = require('./validation')
// File Upload
const { imgFolderLocation, fileFolderLocation, uploadImgFile, handleImgRemove } = require('./file-upload')
/** Exports */
module.exports = {
  // Session
  SESS_NAME, SESS_ABSOULTE_TIMEOUT, SESS_OPTIONS,
  // Redis
  RedisStore, redisClient, session,
  // Auth Session
  logIn, logOut, forcedLogout,
  // Verification
  redirect2Login, redirect2Home, userIsAuthenticated, userIsActive, adminAccessPublic,
  // Validation
  registerValidation,
  // File Upload
  imgFolderLocation, fileFolderLocation, uploadImgFile, handleImgRemove
}