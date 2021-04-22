// Controllers
const {
  // Redis Data
  getDefaultAllData,
  // Redis Promises
  setAsync
} = require('../controllers')

/** Page Specific Functions */
// get all required data from redis
const getAllData = async() => {
  const redisAllData = await getDefaultAllData()
  return {
    likeStatusesTemp: redisAllData.likeStatusesTempRedis,
    projects: redisAllData.projectsRedis,
    techs: redisAllData.techsRedis,
    users: redisAllData.usersRedis
  }
}
// set new likeStatusesTemp redis data
const setAllLikeStatusTemp = async(redisAllLikeStatusesTemp) => {
  await setAsync(`pfv4_likeStatusesTemp`, JSON.stringify(redisAllLikeStatusesTemp))
}

// continuous timer
// let now = new Date()
// let millisTill6 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 28, 0, 0) - now
// console.log(millisTill6)
// if (millisTill6 < 0) { // wait 24hours to trigger again
//   millisTill6 += 86400000 // it's after 10am, try 10am tomorrow.
// }
// setTimeout(function(){console.log("It's 4.28pm!")}, millisTill6)

/** Methods */
// @desc    Portfolio V4 Projects
// @route   POST /api/v1/projects
// @access  Public (Only need Admin Public Access Key)
exports.getPublicProjects = async(req, res, next) => {
  // get projects, techs, users data from redis
  let redisAllData = await getAllData()
  let projects = redisAllData.projects
  let techs = redisAllData.techs
  let users = redisAllData.users

  // get active projects info
  let projectsActive = projects.filter(project => project.status === 1)
  // get populated projects (with creator)
  projectsActive.forEach(project => {
    users.forEach(user => {
      if(user._id === project.creator) project.creator = {...user}
    })
  })
  // get populated projects (with techs)
  projectsActive.forEach(project => {
    let techsPopulated = []
    project.techs.forEach(state => {
      techs.forEach(tech => {
        if(tech._id === state) techsPopulated.push({...tech})
      })
    })
    project.techs = techsPopulated
  })
  
  return res.status(200).json({
    success: true,
    count: projectsActive.length,
    data: projectsActive.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  })
}

// @desc    Portfolio V4 Projects (Get Project Like)
// @route   POST /api/v1/projects/public/update
// @access  Public (Only need Admin Public Access Key)
exports.updatePublicProject = async(req, res, next) => {
  let {
    project, user
  } = req.body
  // return console.log(req.body)
  // get likeStatusesTemp, projects, techs, users data from redis
  let redisAllData = await getAllData()
  let likeStatusesTemp = redisAllData.likeStatusesTemp

  // check if user likeStatusesTemp exist
  let likeStatus = likeStatusesTemp.find(state => state.ipv4 === user)
  if(!likeStatus) likeStatusesTemp.push({
    ipv4: user,
    likedProjects: [{ projectId: project._id, status: project.status }],
    likedPosts: []
  }) 
  else {
    likeStatusesTemp.forEach(state => {
      if(state.ipv4 === user) {
        let isLikedExist = false
        state.likedProjects.forEach(liked => {
          if(liked.projectId === project._id) {
            liked.status = project.status
            isLikedExist = true
          }
        })
        if(isLikedExist === false) state.likedProjects.push({ projectId: project._id, status: project.status })
      }
    })
  }
  console.log(likeStatusesTemp)
  // set new likeStatusesTemp redis
  await setAllLikeStatusTemp(likeStatusesTemp)

  return res.status(200).json({
    success: true,
    count: 1,
    data: {}
  })

  // return await Likestatus.find({ ipv4: req.body.ipv4 })
  // .then(async data => {
  //   data.likedProjects.map(proj => {
  //     if(proj.projectId === req.body.projectId) status = proj.status 
  //   })

  //   if(status) return await Project.findByIdAndUpdate(
  //     { _id: req.body.projectId },
  //     { $set: { like: +req.body.projectLikeCount - 1 } }
  //   )
  //   else return await Project.findByIdAndUpdate(
  //     { _id: req.body.projectId },
  //     { $set: { like: +req.body.projectLikeCount + 1 } }
  //   )
  // })
  // .then(async data => {
  //   return await Likestatus.updateOne(
  //     { ipv4: req.body.ipv4 },
  //     { $set: { "likedProjects.$[projectId].status": !status } },
  //     { arrayFilters: [{ "projectId.projectId": req.body.projectId }] }
  //   )
  // })
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
  //     error: `Failed to update data from Projects & Likestatus Collection`,
  //     data: err
  //   })
  // })
}