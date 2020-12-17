/** Dependencies */
// Model - Project
const {
  Contact
} = require('../models')

/** Methods */
// @desc    Portfolio V4 Contact Dashboard (Get All Contact)
// @route   POST /api/v1/contacts/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateContact = async (req, res, next) => {
  await Contact.findOne().where({ creator: '5f8fc26c6a103b243428bec1' })
  .select('-mails')
  .then(data => { 
    return res.status(200).json({
      success: true,
      count: 1,
      data: data
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Contact Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Contact Dashboard (Add Contact)
// @route   POST /api/v1/contacts/private/add/
// @access  Private (Require sessionId & uid)
exports.addPrivateContact = async (req, res, next) => {
  let {
    senderGmail, senderEmail,
    clientId, clientSecret, refreshToken
  } = req.body

  const newContact = new Contact({
    senderGmail: senderGmail,
    senderEmail: senderEmail,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    creator: req.session,userId
  })

  // save new contact
  newContact.save()
  .then(async data => {
    let contact = await data.populate('mails').execPopulate()

    return res.status(200).json({
      success: true,
      count: contact.length,
      data: contact
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to add new contact data from Contact Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Contact Dashboard (Update A Contact Status Publish)
// @route   POST /api/v1/contacts/private/update/publish
// @access  Private (Require sessionId & uid)
exports.updatePrivateContactPublish = async (req, res, next) => {
  let { contactId, intention } = req.body
  
  await Contact.findByIdAndUpdate(
    { _id: contactId },
    {
      $set: {
        status: (() => intention === 'publish' ? 1 : 0)()
      }
    },
    { new: true }
  )
  .then(async data => {
    let contact = await data.populate('mails').execPopulate()

    return res.status(200).json({
      success: true,
      count: contact.length,
      data: contact
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Failed to update contact status publish from Contact Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Contact Dashboard (Update A Contact)
// @route   POST /api/v1/contacts/private/update/:id
// @access  Private (Require sessionId & uid)
exports.updatePrivateContact = async (req, res, next) => {
  let {
    senderGmail, senderEmail,
    clientId, clientSecret, refreshToken
  } = req.body

  await Contact.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        senderGmail: senderGmail,
        senderEmail: senderEmail,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken
      }
    },
    { new: true }
  )
  .then(async data => {
    let contact = await data.populate('mails').execPopulate()

    return res.status(200).json({
      success: true,
      count: contact.length,
      data: contact
    })
  })
  .catch(err => {
    return res.status(500).json({
      success: false,
      error: `Failed to update contact data from Contact Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Contact Dashboard (Delete A Contact)
// @route   POST /api/v1/contacts/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateContact = async (req, res, next) => {
  try {
    // check if contact is published first
    let contact = await Contact.findById(req.params.id)
    if (contact) {
      if (contact.status === 1) return res.status(400).json({
        success: false,
        error: `Unable to delete contact! Please unpublished the contact first.`,
        data: {}
      })
    }

    // delete post
    contact.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete contact data from Contact Collection`,
      data: err
    })
  }
}