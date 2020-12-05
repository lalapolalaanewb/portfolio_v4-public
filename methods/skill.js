/** Dependencies */
// Model - Skill
const {
  Skill, User, Technology
} = require('../models')

/** Page Specific Functions */
// handle getting techIds
const handleGetTechIds = async (techNames) => {

  let techObjIds = await Technology.find().select('_id').where('name').in(techNames).exec()
  if(!techObjIds) return res.status(500).json({
    success: false,
    error: `No tech found or match with Technology Collection`,
    data: {}
  })

  let techIds = []
  techObjIds.forEach(objId => techIds.push(objId._id))

  return techIds
}

/** Methods */

// @desc    Portfolio V4 Skills (Get All Skills)
// @route   POST /api/v1/skills
// @access  Public (Only need Admin Public Access Key)
exports.getPublicSkills = async(req, res, next) => {
  let user = await User.findOne({ status: 1 })
  if(!user) return res.status(400).json({
    success: false,
    error: `No active user found from User Collection`,
    data: {}
  })
  
  await Skill.find().where({ creator: user._id }).sort({ name: 1 })
  .populate('techs')
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
      error: `Failed to get data from Skill Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Skills Dashboard (Get All Skills)
// @route   POST /api/v1/skills/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateSkills = async(req, res, next) => {
  await Skill.find().sort({ name: 1 })
  .populate('techs')
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
      error: `Failed to get data from Skill Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Skills Dashboard (Add A Skill)
// @route   POST /api/v1/skills/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateSkill = async(req, res, next) => {
  let {
    name, techs
  } = req.body 
  
  let techIds = await handleGetTechIds(techs)
  
  const skill = new Skill({
    name: name,
    techs: techIds,
    creator: '5f8fc26c6a103b243428bec1' // add current logged-in user ID
  })

  skill.save()
  .then(async data => {
    await User.updateOne(
      { _id: '5f8fc26c6a103b243428bec1' },
      { $push: { skills: data._id } },
    )

    let skill = await data.populate('techs').populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: skill.length,
      data: skill
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new skill data to Skill Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Skills Dashboard (Update A Skill)
// @route   POST /api/v1/skills/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateSkill = async(req, res, next) => {
  let {
    name, techs, creator
  } = req.body

  let techIds = await handleGetTechIds(techs)
  let shouldCreatorUpdate
  creator.current === creator.new ? shouldCreatorUpdate = 'no' : shouldCreatorUpdate = 'yes'

  await Skill.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: name,
      techs: techIds,
      creator: shouldCreatorUpdate === 'no' ? creator.current : creator.new
    } },
    { new: true }
  )
  .then(async data => {
    if(shouldCreatorUpdate === 'yes') {
      // remove from user before
      await User.updateOne(
        { _id: creator.current },
        { $pull: { skills: req.params.id } },
      )
      // add to new user
      await User.updateOne(
        { _id: creator.new },
        { $push: { skills: req.params.id } },
      )
    }

    let skill = await data.populate('techs').populate('creator').execPopulate()

    return res.status(200).json({
      success: true,
      count: skill.length,
      data: skill
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update skill data from Skill Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Skills Dashboard (Delete A Skill)
// @route   POST /api/v1/skills/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateSkill = async(req, res, next) => {
  await Skill.findByIdAndDelete(req.params.id)
  .then(async data => { 
    // remove from user
    await User.updateOne(
      { _id: req.body.creator },
      { $pull: { skills: req.params.id } },
    )

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to delete skill data from SKill Collection`,
      data: err
    })
  })
}