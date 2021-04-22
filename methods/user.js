/** Dependencies */
// Controllers
const {
  // Redis Data
  getDefaultAllData
} = require('../controllers')

/** Page Specific Functions */
// get all required data from redis
const getAllData = async() => {
  const redisAllData = await getDefaultAllData()
  return {
    abouts: redisAllData.aboutsRedis,
    edus: redisAllData.educationsRedis,
    homes: redisAllData.homesRedis,
    jobs: redisAllData.jobsRedis,
    medias: redisAllData.mediasRedis,
    mediaSocials: redisAllData.mediaSocialsRedis,
    policies: redisAllData.policiesRedis,
    projects: redisAllData.projectsRedis,
    resumes: redisAllData.resumesRedis,
    skills: redisAllData.skillsRedis,
    socialMedias: redisAllData.socialMediasRedis,
    techs: redisAllData.techsRedis,
    users: redisAllData.usersRedis
  }
}

/** Methods */

// @desc    Portfolio V4 Footer Public (Get A User)
// @route   POST /api/v1/users/getfooterpublic
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserFooterPublic = async(req, res, next) => {
  // get mediaSocials, socialMedias & users data from redis
  let redisAllData = await getAllData()
  let mediaSocials = redisAllData.mediaSocials
  let socialMedias = redisAllData.socialMedias
  let users = redisAllData.users

  // get active user
  let user = users.find(user => user.status === 1)
  if(!user) return res.status(400).json({
    success: false,
    error: `No active user found. Please refresh the page or try again later.`,
    data: {}
  })

  // get populated user (socialMedias)
  let socialsPopulated = []
  user.socialMedias.forEach(state => {
  socialMedias.forEach(social => {
      if(social._id === state) socialsPopulated.push({...social})
    })
  })
  user.socialMedias = socialsPopulated

  // get populated user's socialMedias (icon - mediaSocials)
  user.socialMedias.forEach(social => {
    mediaSocials.forEach(media => {
      if(media._id === social.icon) social.icon = {...media}
    })
  })

  return res.status(200).json({
    success: true,
    count: 1,
    data: {
      _id: user._id,
      socialMedias: user.socialMedias
    }
  })
}

// @desc    Portfolio V4 Home Page (Get A User)
// @route   POST /api/v1/users/gethome
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserHome = async(req, res, next) => {
  // get homes & users data from redis
  let redisAllData = await getAllData()
  let homes = redisAllData.homes
  let users = redisAllData.users

  // get active user
  let user = users.find(user => user.status === 1)
  if(!user) return res.status(400).json({
    success: false,
    error: `No active user found. Please refresh the page or try again later.`,
    data: {}
  })

  // get populated user (homes)
  let homesPopulated = []
  user.homes.forEach(state => {
  homes.forEach(home => {
      if(home._id === state) homesPopulated.push({...home})
    })
  })
  user.homes = homesPopulated
  
  return res.status(200).json({
    success: true,
    count: 1,
    data: {
      _id: user._id,
      homes: user.homes
    }
  })
}

// @desc    Portfolio V4 About Page (Get A User)
// @route   POST /api/v1/users/getabout
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserAbout = async(req, res, next) => {
  // get abouts, jobs, skills, techs, & users data from redis
  let redisAllData = await getAllData()
  let abouts = redisAllData.abouts
  let jobs = redisAllData.jobs
  let skills = redisAllData.skills
  let techs = redisAllData.techs
  let users = redisAllData.users

  // get active user
  let user = users.find(user => user.status === 1)
  if(!user) return res.status(400).json({
    success: false,
    error: `No active user found. Please refresh the page or try again later.`,
    data: {}
  })

  // get populated user (abouts)
  let aboutsPopulated = []
  user.abouts.forEach(state => {
    abouts.forEach(about => {
      if(about._id === state) aboutsPopulated.push({...about})
    })
  })
  user.abouts = aboutsPopulated

  // get populated user (jobs)
  let jobsPopulated = []
  user.jobs.forEach(state => {
    jobs.forEach(job => {
      if(job._id === state) jobsPopulated.push({...job})
    })
  })
  user.jobs = jobsPopulated

  // get populated user (skills)
  let skillsPopulated = []
  user.skills.forEach(state => {
    skills.forEach(skill => {
      if(skill._id === state) skillsPopulated.push({...skill})
    })
  })
  user.skills = skillsPopulated

  // get populated user's skills (techs)
  user.skills.forEach(skill => {
    let techsPopulated = []
    skill.techs.forEach(state => {
      techs.forEach(tech => {
        if(tech._id === state) techsPopulated.push({...tech})
      })
    })
    skill.techs = techsPopulated
  })
  
  return res.status(200).json({
    success: true,
    count: 1,
    data: {
      _id: user._id,
      name: user.name,
      abouts: user.abouts,
      jobs: user.jobs,
      skills: user.skills
    }
  })
}

// @desc    Portfolio V4 Resume Page (Get A User)
// @route   POST /api/v1/users/getresume
// @access  Public (Only need Admin Public Access Key)
exports.getPublicUserResume = async(req, res, next) => {
  // get edus, jobs, projects, techs, & users data from redis
  let redisAllData = await getAllData()
  let edus = redisAllData.edus
  let jobs = redisAllData.jobs
  let projects = redisAllData.projects
  let resumes = redisAllData.resumes
  let techs = redisAllData.techs
  let users = redisAllData.users

  // get active user
  let user = users.find(user => user.status === 1)
  if(!user) return res.status(400).json({
    success: false,
    error: `No active user found. Please refresh the page or try again later.`,
    data: {}
  })

  // get active user resume
  let resumesPopulated = resumes.find(resume => resume.creator === user._id)

  // get populated user's resumes (edus)
  let edusPopulated = []
  resumesPopulated.educations.forEach(state => {
    edus.forEach(edu => {
      if(edu._id === state) edusPopulated.push({...edu})
    })
  })
  resumesPopulated.educations = edusPopulated

  // get populated user's resumes (jobs)
  let jobsPopulated = []
  resumesPopulated.jobs.forEach(state => {
    jobs.forEach(job => {
      if(job._id === state) jobsPopulated.push({...job})
    })
  })
  resumesPopulated.jobs = jobsPopulated

  // get populated user's resumes (projects)
  let projectsPopulated = []
  resumesPopulated.projects.forEach(state => {
    projects.forEach(project => {
      if(project._id === state) projectsPopulated.push({...project})
    })
  })
  resumesPopulated.projects = projectsPopulated

  // get populated user's resumes (techs)
  let techsPopulated = []
  resumesPopulated.techs.forEach(state => {
    techs.forEach(tech => {
      if(tech._id === state) techsPopulated.push({...tech})
    })
  })
  resumesPopulated.techs = techsPopulated

  return res.status(200).json({
    success: true,
    count: 1,
    data: {
      _id: user._id,
      name: user.name,
      email: user.credentials.emails.main,
      resume: resumesPopulated
    }
  })
}