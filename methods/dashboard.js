/** Dependencies */
// Model - User
const {
  About, 
  Contact, 
  Home, 
  Job, 
  Mail, 
  Media, 
  Post, 
  Project, 
  Skill, 
  Socialmedia, 
  Technology, 
  User,
} = require('../models')
// Controllers
const {
  // Redis Promises
  getDefaultAllData
} = require('../controllers')

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/dashboard
// @access  Private (Require sessionId & uid)
exports.getPrivateDashboard = async(req, res, next) => {
  try {
    const redisAllData = await getDefaultAllData()
    
    // get ACTIVE user
    let user = await User.aggregate([
      {$match: { status: 1 }}, 
      { $project: { 
        homes: { $size: '$homes' },
        abouts: { $size: '$abouts' },
        socialMedias: { $size: '$socialMedias' },
        educations: { $size: '$educations' },
        jobs: { $size: '$jobs' },
        skills: { $size: '$skills' },
        projects: { $size: '$projects' },
        posts: { $size: '$posts' }, 
      } }
    ])
    // - throw an error if user not found
    if(!user) return res.status(400).json({
      success: false,
      error: `Failed to get active user data from User Collection`,
      data: {}
    })

    // get counts User Mail Collection
    let userMails = await Contact.findOne().where({ creator: user[0]._id }).select('mails')
    // - throw an error if userMedias not found
    if(!userMails) return res.status(400).json({
      success: false,
      error: `Failed to get all user mails from Contact Collection`,
      data: {}
    })
    
    // get counts User Media Collection
    let userMedias = await Media.find().where({ creator: user[0]._id }).select('_id')
    // - throw an error if userMedias not found
    if(!userMedias) return res.status(400).json({
      success: false,
      error: `Failed to get all user data from Media Collection`,
      data: {}
    })

    // get counts User Technology Collection
    let userTechs = await Technology.find().where({ creator: user[0]._id }).select('_id')
    // - throw an error if userTechs not found
    if(!userTechs) return res.status(400).json({
      success: false,
      error: `Failed to get all user data from Tech Collection`,
      data: {}
    })
    
    return res.status(200).json({
      success: true,
      count: user.length,
      data: {
        user: {
          _id: user[0]._id,
          abouts: user[0].abouts,
          edus: user[0].educations,
          homes: user[0].homes,
          jobs: user[0].jobs,
          mails: userMails.mails.length,
          medias: userMedias.length,
          posts: user[0].posts,
          projects: user[0].projects,
          skills: user[0].skills,
          socialMedias: user[0].socialMedias,
          techs: userTechs.length
        },
        aboutsCount: redisAllData.aboutsRedis.length,
        edusCount: redisAllData.educationsRedis.length,
        homesCount: redisAllData.homesRedis.length,
        jobsCount: redisAllData.jobsRedis.length,
        mailsCount: redisAllData.mailsRedis.length,
        mediasCount: redisAllData.mediasRedis.length,
        postsCount: redisAllData.postsRedis.length,
        projectsCount: redisAllData.projectsRedis.length,
        skillsCount: redisAllData.skillsRedis.length,
        socialMediasCount: redisAllData.socialMediasRedis.length,
        techsCount: redisAllData.techsRedis.length,
        usersCount: redisAllData.usersRedis.length
      }
    })
  } catch(err) { console.log(err)
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Database`,
      data: err
    })
  }
}