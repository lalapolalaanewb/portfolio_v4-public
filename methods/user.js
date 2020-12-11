/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
 Mediasocial, Policy,  Resume, Skill, Socialmedia, Technology, User
} = require('../models')
const { findOne } = require('../models/Job')

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

// @desc    Portfolio V4 Footer Public (Get A User)
// @route   POST /api/v1/users/getfooterpublic
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserFooterPublic = async(req, res, next) => {
  await User.findOne()
  .populate('socialMedias')
  .where({ status: 1 })
  .select('socialMedias')
  .then(async data => { 
    // get populated Tech in Skill
    let socialMediaIds = []
    data.socialMedias.forEach(socialMedia => socialMediaIds.push(socialMedia._id))
    let socialMedias = await Socialmedia.find({ _id: { $in: socialMediaIds } }).populate('icon')

    return res.status(200).json({
      success: true,
      count: data.length,
      data: {
        _id: data._id,
        socialMedias: socialMedias
      }
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get data (socialMedias) from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Home Page (Get A User)
// @route   POST /api/v1/users/gethome
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserHome = async(req, res, next) => {
  await User.findOne()
  .populate('homes')
  .where({ status: 1 })
  .select('homes')
  .then(data => { console.log(data) 
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get data (homes) from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 About Page (Get A User)
// @route   POST /api/v1/users/getabout
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserAbout = async(req, res, next) => {
  await User.findOne()
  .populate('abouts')
  .populate('jobs')
  .populate('skills')
  .where({ status: 1 })
  .select('name abouts jobs skills')
  .then(async data => { 
    // get populated Tech in Skill
    let skillIds = []
    data.skills.forEach(skill => skillIds.push(skill._id))
    let skills = await Skill.find({ _id: { $in: skillIds } }).populate('techs')

    return res.status(200).json({
      success: true,
      count: data.length,
      data: {
        _id: data._id,
        name: data.name,
        abouts: data.abouts,
        jobs: data.jobs,
        skills: skills
      }
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to get data (abouts, skills & jobs) from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Resume Page (Get A User)
// @route   POST /api/v1/users/getresume
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserResume = async(req, res, next) => {
  await User.findOne()
  .where({ status: 1 })
  .select('name credentials.emails.main')
  .then(async data => { 
    // get populated Resume
    let resume = await Resume.findOne()
    .where({ creator: data._id, status: 1 })
    .populate('techs').populate('projects').populate('educations').populate('jobs')
    console.log(resume)
    return res.status(200).json({
      success: true,
      count: data.length,
      data: {
        _id: data._id,
        name: data.name,
        email: data.credentials.emails.main,
        resume: resume
      }
    })
  })
  .catch(err => { console.log(err)
    return res.status(500).json({
      success: false,
      error: `Failed to get data (abouts, skills & jobs) from User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Dashboard (Get All Users)
// @route   POST /api/v1/users/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateUsers = async(req, res, next) => {
  return await User.find().sort({ 'name.firstName': 1 })
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

// @desc    Portfolio V4 Users Dashboard (Add A User)
// @route   POST /api/v1/users/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateUser = async(req, res, next) => {
  let {
    name, credentials
  } = req.body 
  
  if(credentials.emails.main !== 'none') {
    // check if user already exist
    const userExist = await User.findOne({ 'credentials.emails.main': credentials.emails.main })
    if(userExist) return res.status(400).json({
      success: false,
      error: `User already exists.`,
      data: {}
    })

    // check if email (main) regex correct
    if(!handleEmailRegex(credentials.emails.main)) return res.status(400).json({
      success: false,
      error: `Invalid email main!`,
      data: {}
    })
  }

  if(credentials.emails.backup !== 'none') {
    // check if email (backup) regex correct
    if(!handleEmailRegex(credentials.emails.backup)) return res.status(400).json({
      success: false,
      error: `Invalid email backup!`,
      data: {}
    })
  }

  // check if password match
  if(credentials.password !== credentials.passwordConfirm) return res.status(400).json({
    success: false,
    error: `Password not match!`,
    data: {}
  })

  // hashed password
  const passwordHashed = await bcrypt.hash(credentials.password, await bcrypt.genSalt(12))
  
  // create new user
  const user = new User({
    name: {
      firstName: handleNoneInput(name.firstName),
      lastName: handleNoneInput(name.lastName),
      nickName: handleNoneInput(name.nickName)
    },
    credentials: {
      emails: {
        main: handleNoneInput(credentials.emails.main),
        backup: handleNoneInput(credentials.emails.backup)
      },
      password: passwordHashed
    }
  })

  user.save()
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
      error: `Failed to add new user data to User Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Users Dashboard (Update A User Activation)
// @route   POST /api/v1/users/private/update/active
// @access  Private (Require sessionId & uid)
exports.updatePrivateUserActive = async(req, res, next) => {
  let { userId, intention } = req.body
  
  try {
    // check if other user still active
    let userActive = await User.findOne().select('name credentials.emails status').where({ status: 1 })
    if(userActive) {
      if(userActive._id.toString() !== userId) return res.status(400).json({
        success: false,
        error: `User (${userActive.name.firstName} ${userActive.name.lastName}) with email (${userActive.credentials.emails.main}) still ACTIVE! Please deactivate the user to continue.`,
        data: {}
      })
    }

    // update user status
    let user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: {
        status: (() => intention === 'activate' ? 1 : 0)()
      } },
      { new: true }
    )
    // throw error if nothing gets in return
    if(!user) return res.status(400).json({
      success: false,
      error: `Error while updating user active status. Please try again later.`,
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
      error: `Failed to update user active status from User Collection`,
      data: err
    })
  }
}

// @desc    Portfolio V4 Users Dashboard (Update A User)
// @route   POST /api/v1/users/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateUser = async(req, res, next) => {
  let {
    name, credentials
  } = req.body

  if(credentials.emails.main !== 'none') {
    // check if user already exist
    const userExist = await User.findOne({ _id: req.params.id })
    if(!userExist) return res.status(400).json({
      success: false,
      error: `User doesn't exists.`,
      data: {}
    })

    // check if email (main) regex correct
    if(!handleEmailRegex(credentials.emails.main)) return res.status(400).json({
      success: false,
      error: `Invalid email main!`,
      data: {}
    })
  }

  if(credentials.emails.backup !== 'none') {
    // check if email (backup) regex correct
    if(!handleEmailRegex(credentials.emails.backup)) return res.status(400).json({
      success: false,
      error: `Invalid email backup!`,
      data: {}
    })
  }
 
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: {
        firstName: handleNoneInput(name.firstName),
        lastName: handleNoneInput(name.lastName),
        nickName: handleNoneInput(name.nickName)
      },
      'credentials.emails.main': handleNoneInput(credentials.emails.main),
      'credentials.emails.backup': handleNoneInput(credentials.emails.backup)
    } },
    { new: true }
  )
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

// @desc    Portfolio V4 Users Dashboard (Delete A User)
// @route   POST /api/v1/users/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateUser = async(req, res, next) => {
  try {
    let data = await User.findById(req.params.id)

    // check user data from abouts
    if(data.abouts.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from About Collection first`,
      data: {}
    })

    // check user data from homes
    if(data.homes.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Home Collection first`,
      data: {}
    })

    // check user data from jobs
    if(data.jobs.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Job Collection first`,
      data: {}
    })

    // check user data from media socials
    let mediaSocials = await Mediasocial.find().where({ creator: req.params.id })
    if(mediaSocials.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Media Social Collection first`,
      data: {}
    })

    // check user data from policies
    let policies = await Policy.find().where({ creator: req.params.id })
    if(policies.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Policy Collection first`,
      data: {}
    })

    // check user data from posts
    if(data.posts.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Post Collection first`,
      data: {}
    })

    // check user data from projects
    if(data.projects.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Project Collection first`,
      data: {}
    })

    // check user data from socialMedias
    if(data.socialMedias.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Socialmedia Collection first`,
      data: {}
    })

    // check user data from skills
    if(data.skills.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Skill Collection first`,
      data: {}
    })

    // check user data from techs
    let techs = await Technology.find().where({ creator: req.params.id })
    if(techs.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete data from Tech Collection first`,
      data: {}
    })

    data.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })

  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete user data from User Collection`,
      data: err
    })
  }

  await User.findByIdAndDelete(req.params.id)
  .then(data => {
    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to delete user data from User Collection`,
      data: err
    })
  })
}