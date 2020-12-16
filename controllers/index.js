/** Imports */
// Auth Session
const { logIn, logOut, forcedLogout } = require('./auth-session')
// File Upload
const { 
  imgFolderLocation, pdfFolderLocation, 
  uploadImgFile, uploadMultiImgFile, uploadPdfFile, 
  handleImgRemove, handlePdfRemove
} = require('./file-upload')
// Gmail
const {
  contactAutoReplyClientNoty,
  contactAutoReplyAdminNoty
} = require('./gmail')
// Redis
const { RedisStore, redisClient, session } = require('./redis')
// Session
const { SESS_NAME, SESS_ABSOULTE_TIMEOUT, SESS_OPTIONS } = require('./session')
// Verification
const { redirect2Login, redirect2Home, userIsAuthenticated, userIsActive, adminAccessPublic } = require('./verification')
// Validation
const { registerValidation } = require('./validation')

/** Exports */
module.exports = {
  // Auth Session
  logIn, logOut, forcedLogout,
  // File Upload
  imgFolderLocation, pdfFolderLocation, 
  uploadImgFile, uploadMultiImgFile, uploadPdfFile, 
  handleImgRemove, handlePdfRemove,
  // Gmail
  contactAutoReplyClientNoty,
  contactAutoReplyAdminNoty,
  // Redis
  RedisStore, redisClient, session,
  // Session
  SESS_NAME, SESS_ABSOULTE_TIMEOUT, SESS_OPTIONS,
  // Verification
  redirect2Login, redirect2Home, userIsAuthenticated, userIsActive, adminAccessPublic,
  // Validation
  registerValidation,
}