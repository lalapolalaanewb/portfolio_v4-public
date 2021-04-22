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
    projects: redisAllData.projectsRedis,
    skills: redisAllData.skillsRedis,
    techs: redisAllData.techsRedis,
    users: redisAllData.usersRedis
  }
}

/** Methods */

// @desc    Portfolio V4 Skills (Get All Skills)
// @route   POST /api/v1/skills
// @access  Public (Only need Admin Public Access Key)
exports.getPublicSkills = async(req, res, next) => {
  // get skills & users data from redis
  let redisAllData = await getAllData()
  let skills = redisAllData.skills
  let techs = redisAllData.techs
  let users = redisAllData.users

  // get active user
  let user = users.find(user => user.status === 1)
  if(!user) return res.status(400).json({
    success: false,
    error: `No active user found.`,
    data: {}
  })

  // get active user skills
  let userSkills = skills.filter(skill => skill.creator === user._id)

  // get populated skills (techs)
  userSkills.forEach(skill => {
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
    count: userSkills.length,
    data: userSkills.sort((a, b) => a.name < b.name ? -1 : 1)
  })

  // let user = await User.findOne({ status: 1 })
  // if(!user) return res.status(400).json({
  //   success: false,
  //   error: `No active user found from User Collection`,
  //   data: {}
  // })
  
  // await Skill.find().where({ creator: user._id }).sort({ name: 1 })
  // .populate('techs')
  // .then(data => { 
  //   return res.status(200).json({
  //     success: true,
  //     count: data.length,
  //     data: data
  //   })
  // })
  // .catch(err => {
  //   return res.status(500).json({
  //     success: false,
  //     error: `Failed to get data from Skill Collection`,
  //     data: err
  //   })
  // })
}