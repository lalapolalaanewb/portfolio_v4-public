/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - User
const {
  User, Home, About, Socialmedia, Job, Skill, Technology, Project, Post
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
    // console.log('user'); console.log(user)
    // get counts User Technology Collection
    let userTechs = await Technology.find().where({ creator: user[0]._id }).select('_id')
    // - throw an error if userTechs not found
    if(!userTechs) return res.status(400).json({
      success: false,
      error: `Failed to get all user data from Tech Collection`,
      data: {}
    })
    // console.log(userTechs); console.log(userTechs.length)
    // get counts User Collection
    let users = await User.find().select('_id')
    // - throw an error if users not found
    if(!user) return res.status(400).json({
      success: false,
      error: `Failed to get all data from User Collection`,
      data: {}
    })
    // console.log(users); console.log(users.length)
    // get counts Home Collection
    let homes = await Home.find().select('_id')
    // - throw an error if homes not found
    if(!homes) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Home Collection`,
      data: {}
    })
    // console.log(homes); console.log(homes.length)
    // get counts About Collection
    let abouts = await About.find().select('_id')
    // - throw an error if abouts not found
    if(!abouts) return res.status(400).json({
      success: false,
      error: `Failed to get all data from About Collection`,
      data: {}
    })
    // console.log(abouts); console.log(abouts.length)
    // get counts Socialmedia Collection
    let socialMedias = await Socialmedia.find().select('_id')
    // - throw an error if socialMedias not found
    if(!socialMedias) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Socialmedia Collection`,
      data: {}
    })
    // console.log(socialMedias); console.log(socialMedias.length)
    // get counts Job Collection
    let jobs = await Job.find().select('_id')
    // - throw an error if jobs not found
    if(!jobs) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Job Collection`,
      data: {}
    })
    // console.log(jobs); console.log(jobs.length)
    // get counts Skill Collection
    let skills = await Skill.find().select('_id')
    // - throw an error if skills not found
    if(!skills) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Skill Collection`,
      data: {}
    })
    // console.log(skills); console.log(skills.length)
    // get counts Technology Collection
    let techs = await Technology.find().select('_id')
    // - throw an error if techs not found
    if(!techs) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Tech Collection`,
      data: {}
    })
    // console.log(techs); console.log(techs.length)
    // get counts Project Collection
    let projects = await Project.find().select('_id')
    // - throw an error if projects not found
    if(!projects) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Project Collection`,
      data: {}
    })
    // console.log(projects); console.log(projects.length)
    // get counts Post Collection
    let posts = await Post.find().select('_id')
    // - throw an error if posts not found
    if(!posts) return res.status(400).json({
      success: false,
      error: `Failed to get all data from Post Collection`,
      data: {}
    })
    // console.log(posts); console.log(posts.length)
    return res.status(200).json({
      success: true,
      count: user.length,
      data: {
        user: {
          _id: user[0]._id,
          homes: user[0].homes,
          abouts: user[0].abouts,
          socialMedias: user[0].socialMedias,
          jobs: user[0].jobs,
          skills: user[0].skills,
          techs: userTechs.length,
          projects: user[0].projects,
          posts: user[0].posts
        },
        usersCount: users.length,
        homesCount: homes.length,
        aboutsCount: abouts.length,
        socialMediasCount: socialMedias.length,
        jobsCount: jobs.length,
        skillsCount: skills.length,
        techsCount: techs.length,
        projectsCount: projects.length,
        postsCount: posts.length
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