/** Dependencies */
// Model - Project
const {
  Technology, Skill, Project, Post
} = require('../models')

/** Page Specific Functions */
// handle extract techs info
const handleTechExtract = (datas, id2Compare) => {
  let datas2Compare = []
  
  datas.forEach(data => {
    data.techs.forEach(tech => {
      // save the tech if categoriesProject array still empty
      if(datas2Compare.length === 0) datas2Compare.push(tech._id.toString())
      else {
        // check if category already exist in the array, if not , then save
        if(datas2Compare.map(cat => cat).indexOf(tech._id.toString()) === -1) datas2Compare.push(tech._id.toString())
      }
    })
  })
  
  // check if id2Compare exist in datas2Compare 
  if(datas2Compare.includes(id2Compare)) return 'exist'
  else return 'not exist'
}

/** Methods */

// @desc    Portfolio V4 Techs Dashboard (Get All Techs)
// @route   POST /api/v1/techs/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateTechs = async(req, res, next) => {
  return await Technology.find().sort({ name: 1 })
  .populate('creator')
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
      error: `Failed to get data from Techs Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Projects Dashboard (Add A Tech)
// @route   POST /api/v1/techs/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateTech = async(req, res, next) => {
  let {
    name, abbreviation
  } = req.body

  const tech = new Technology({
    name: name,
    abbreviation: abbreviation,
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID
  })

  tech.save()
  .then(async data => {
    let tech = await data.populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: tech.length,
      data: tech
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new tech data to Tech Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Techs Dashboard (Update A Tech)
// @route   POST /api/v1/techs/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateTech = async(req, res, next) => {
  let {
    name, abbreviation, creator
  } = req.body

  return await Technology.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: name,
      abbreviation: abbreviation,
      creator: creator
    } },
    { new: true }
  )
  .then(async data => {
    let tech = await data.populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: tech.length,
      data: tech
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update tech data from Tech Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Techs Dashboard (Delete A Tech)
// @route   POST /api/v1/techs/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateTech = async(req, res, next) => {
  try {
    // check if tech being used in Skill Collection
    let skills = await Skill.find().populate('techs')
    // skills.map(skill => {
    //   skill.techs.map(tech => console.log(tech.name))
    // })
    if(!skills) return res.status(400).json({
      success: false,
      error: `Error while getting skills data from Skill Collection`,
      data: {}
    })
    if(handleTechExtract(skills, req.params.id) === 'exist') return res.status(400).json({
      success: false,
      error: `Please delete tech data from Skill Collection first`,
      data: {}
    })

    // check if tech being used in Project Collection
    let projects = await Project.find().populate('techs')
    if(!projects) return res.status(400).json({
      success: false,
      error: `Error while getting projects data from Project Collection`,
      data: {}
    })
    if(handleTechExtract(projects, req.params.id) === 'exist') return res.status(400).json({
      success: false,
      error: `Please delete tech data from Project Collection first`,
      data: {}
    })

    // check if tech being used in Post Collection
    let posts = await Post.find().where({ tech: req.params.id })
    if(posts.length > 0) return res.status(400).json({
      success: false,
      error: `Please delete tech data from Post Collection first`,
      data: {}
    })
  
    // delete tech
    await Technology.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete tech data from Tech Collection`,
      data: err
    })
  }
}