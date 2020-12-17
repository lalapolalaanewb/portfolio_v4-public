/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  About, Contact, Home, Job, Mail, Media, Post, Project, Skill, Socialmedia, Technology, User,
} = require('../models')

/** Methods */
// @desc    Portfolio V4 User Profile (Get A User)
// @route   POST /api/v1/dashboard
// @access  Private (Require sessionId & uid)
exports.getPrivateDashboard = async(req, res, next) => {
  try {
    // get ACTIVE user
    let user = await User.aggregate([
      {$match: { status: 1 }}, 
      { $project: { 
        homes: { $size: '$homes' },
        abouts: { $size: '$abouts' },
        socialMedias: { $size: '$socialMedias' },
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

    // get counts About Collection
    let abouts = await About.find().select('_id')
    // - throw an error if abouts not found
    if(!abouts) return res.status(400).json({
      success: false,
      error: `Failed to get all data from About Collection`,
      data: {}
    })
    
    // get counts Home Collection
    let homes = await Home.find().select('_id')
    // - throw an error if homes not found
    if(!homes) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Home Collection`,
      data: {}
    })

    // get counts Job Collection
    let jobs = await Job.find().select('_id')
    // - throw an error if jobs not found
    if(!jobs) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Job Collection`,
      data: {}
    })

    // get counts Mail Collection
    let mails = await Mail.find().select('_id')
    // - throw an error if mails not found
    if(!mails) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Mail Collection`,
      data: {}
    })

    // get counts Media Collection
    let medias = await Media.find().select('_id')
    // - throw an error if medias not found
    if(!medias) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Media Collection`,
      data: {}
    })
    
    // get counts Post Collection
    let posts = await Post.find().select('_id')
    // - throw an error if posts not found
    if(!posts) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Post Collection`,
      data: {}
    })

    // get counts Project Collection
    let projects = await Project.find().select('_id')
    // - throw an error if projects not found
    if(!projects) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Project Collection`,
      data: {}
    })

    // get counts Skill Collection
    let skills = await Skill.find().select('_id')
    // - throw an error if skills not found
    if(!skills) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Skill Collection`,
      data: {}
    })

    // get counts Socialmedia Collection
    let socialMedias = await Socialmedia.find().select('_id')
    // - throw an error if socialMedias not found
    if(!socialMedias) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Socialmedia Collection`,
      data: {}
    })
    
    // get counts Technology Collection
    let techs = await Technology.find().select('_id')
    // - throw an error if techs not found
    if(!techs) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Tech Collection`,
      data: {}
    })

    // get counts User Collection
    let users = await User.find().select('_id')
    // - throw an error if users not found
    if(!user) return res.status(400).json({
      success: false,
      error: `Failed to get all data from User Collection`,
      data: {}
    })
    
    return res.status(200).json({
      success: true,
      count: user.length,
      data: {
        user: {
          _id: user[0]._id,
          abouts: user[0].abouts,
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
        aboutsCount: abouts.length,
        homesCount: homes.length,
        jobsCount: jobs.length,
        mailsCount: mails.length,
        mediasCount: medias.length,
        postsCount: posts.length,
        projectsCount: projects.length,
        skillsCount: skills.length,
        socialMediasCount: socialMedias.length,
        techsCount: techs.length,
        usersCount: users.length
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