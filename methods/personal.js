/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  User
} = require('../models')

/** Page Specific Functions */
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}
// handle email 'regex'
const handleEmailRegex = email => {
  const emailRegex = /^.+@[^\.].*\.[a-z]{2,}$/

  return emailRegex.test(email.trim())
}

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/users/private/profile/get/personal
// @access  Private (Require sessionId & uid)
exports.getPrivateUserPersonal = async(req, res, next) => {
  await User.findOne().where({ status: 1 })
  .select('name credentials.emails')
  .then(data => {
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User Personal)
// @route   POST /api/v1/users/private/profile/personal/update
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserPersonal = async(req, res, next) => {
  let {
    userId, personal
  } = req.body
  
  if(personal.emails.backup !== 'none') {
    // check if email (backup) regex correct
    if(!handleEmailRegex(personal.emails.backup)) return res.status(400).json({
      success: false,
      error: `Invalid email backup!`,
      data: {}
    })
  }
 
  await User
  .findByIdAndUpdate(
    { _id: userId },
    { $set: {
      name: {
        firstName: handleNoneInput(personal.name.firstName),
        lastName: handleNoneInput(personal.name.lastName),
        nickName: handleNoneInput(personal.name.nickName)
      },
      'credentials.emails.backup': handleNoneInput(personal.emails.backup)
    } },
    { new: true }
  ).select('name credentials.emails')
  .then(data => { 
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update user data from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Profile (Update A User Personal Password)
// @route   POST /api/v1/users/private/profile/personal/update/password
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserPersonalPassword = async(req, res, next) => {
  let {
    userId, password
  } = req.body
  
  try {
    // check if user exist
    let userExist = await User.findById(userId)
    if(!userExist) return res.status(400).json({
      success: false,
      error: `User doesn't exist!`,
      data: {}
    })

    // check if user password match
    const validPassword = await bcrypt.compare(password.current, userExist.credentials.password)
    if(!validPassword) return res.status(400).json({
      success: false,
      error: `User's password provided is not valid! Please try again later.`,
      data: {}
    })

    // check if user new password match
    if(password.new.password !== password.new.passwordConfirm) return res.status(400).json({
      success: false,
      error: `New password provided not match! Please try again later.`,
      data: {}
    })

    // hashed new password
    const passwordHashed = await bcrypt.hash(password.new.password, await bcrypt.genSalt(12))

    let user = await User
    .findByIdAndUpdate(
      { _id: userId },
      { $set: {
        'credentials.password': passwordHashed
      } },
      { new: true }
    ).select('name credentials.emails')
    if(!user) return res.status(400).json({
      success: false,
      error: `Error while getting updated data! Please try again later.`,
      data: {}
    })

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to update user password from User Collection`,
      data: err
    })
  }
}