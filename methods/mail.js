/** Dependencies */
// Model - Project
const {
  Contact, Mail, User
} = require('../models')
// Controller
const {
  // Gmail
  contactAutoReplyClientNoty,
  contactAutoReplyAdminNoty
} = require('../controllers')

/** Methods */
// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/mails/public/get/status
// @access  Public (Only need Admin Public Access Key)
exports.getPublicContactStatus = async (req, res, next) => {
  // get active user
  await User.findOne().where({ status: 1 })
  .then(async data => {
    // get contact id of active user
    let contact = await Contact.findOne().where({ creator: data._id })

    return res.status(200).json({
      success: true,
      count: 1,
      data: {
        _id: contact._id,
        status: contact.status
      }
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Failed to get contact status data from Contact Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Posts (Get All Posts)
// @route   POST /api/v1/mails/public/add
// @access  Public (Only need Admin Public Access Key)
exports.addPublicMail = async (req, res, next) => {
  let {
    mail, contactId
  } = req.body
  
  // return message
  let clientResMsg = '', adminResMsg = ''

  // get contact info (active user)
  let contact = await Contact.findById(contactId).populate('creator')

  // send noty to client (from)
  let clientMailResponse = await contactAutoReplyClientNoty(
    {
      userGmail: contact.senderGmail,
      userEmail: contact.senderEmail,
      clientId: contact.clientId,
      clientSecret: contact.clientSecret,
      refreshToken: contact.refreshToken
    },
    {
      name: mail.fromWho,
      email: mail.fromTo,
      concerns: mail.fromConcerns,
      subject: mail.fromSubject,
      message: mail.fromMessage
    }
  )
  // throw error if email noty sent unsuccessful
  if(clientMailResponse === 'Unsuccessful!') clientResMsg = ' Failed sending mail noty to your email.'

  // send noty to admin (to)
  let adminMailResponse = await contactAutoReplyAdminNoty(
    {
      userGmail: contact.senderGmail,
      userEmail: contact.senderEmail,
      clientId: contact.clientId,
      clientSecret: contact.clientSecret,
      refreshToken: contact.refreshToken
    },
    {
      name: contact.creator.name.firstName + ' ' + contact.creator.name.lastName,
      email: contact.creator.credentials.emails.main
    },
    {
      name: mail.fromWho,
      email: mail.fromTo,
      concerns: mail.fromConcerns,
      subject: mail.fromSubject,
      message: mail.fromMessage
    }
  )
  // throw error if email noty sent unsuccessful
  if(adminMailResponse === 'Unsuccessful!') adminResMsg = ' Failed sending mail noty to admin email.'

  // create new mail
  const newMail = new Mail({
    fromWho: mail.fromWho,
    fromTo: mail.fromTo,
    fromConcerns: mail.fromConcerns.join(', '),
    fromSubject: mail.fromSubject,
    fromMessage: mail.fromMessage,
    statusNoty: clientMailResponse === 'Unsuccessful!' ? 0 : 1
  })

  newMail.save()
  .then(async data => {
    // save newly created mail in Contact
    await Contact.updateOne(
      { _id: contactId },
      { $push: { mails: data._id } },
    )

    return res.status(200).json({
      success: true,
      count: 1,
      data: 'Successfully send the mail.' + clientResMsg + adminResMsg
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Mail sending failed. Please try again later.`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Mail Dashboard (Get All Mails)
// @route   POST /api/v1/mails/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateMails = async (req, res, next) => {
  await Contact.findOne().where({ creator: '5f8fc26c6a103b243428bec1' })
  .populate('mails')
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
      error: `Failed to get data from Contact Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Mail Dashboard (Update A Mail Status Noty)
// @route   POST /api/v1/mails/private/update/noty
// @access  Private (Require sessionId & uid)
exports.updatePrivateMailNoty = async (req, res, next) => {
  let { contactId, mailId, mail, intention } = req.body
  
  // return message
  let clientResMsg = '', adminResMsg = ''

  // get contact info (active user)
  let contact = await Contact.findById(contactId).populate('creator')
  
  // send noty to client (from)
  let clientMailResponse = await contactAutoReplyClientNoty(
    {
      userGmail: contact.senderGmail,
      userEmail: contact.senderEmail,
      clientId: contact.clientId,
      clientSecret: contact.clientSecret,
      refreshToken: contact.refreshToken
    },
    {
      name: mail.fromWho,
      email: mail.fromTo,
      concerns: mail.fromConcerns.split(','),
      subject: mail.fromSubject,
      message: mail.fromMessage
    }
  )
  // throw error if email noty sent unsuccessful
  if(clientMailResponse === 'Unsuccessful!') clientResMsg = ' Failed sending mail noty to client email.'

  // send noty to admin (to)
  let adminMailResponse = await contactAutoReplyAdminNoty(
    {
      userGmail: contact.senderGmail,
      userEmail: contact.senderEmail,
      clientId: contact.clientId,
      clientSecret: contact.clientSecret,
      refreshToken: contact.refreshToken
    },
    {
      name: contact.creator.name.firstName + ' ' + contact.creator.name.lastName,
      email: contact.creator.credentials.emails.main
    },
    {
      name: mail.fromWho,
      email: mail.fromTo,
      concerns: mail.fromConcerns.split(','),
      subject: mail.fromSubject,
      message: mail.fromMessage
    }
  )
  // throw error if email noty sent unsuccessful
  if(adminMailResponse === 'Unsuccessful!') adminResMsg = ' Failed sending mail noty to admin email.'
  
  await Mail.findByIdAndUpdate(
    { _id: mailId },
    {
      $set: {
        statusNoty: (() => clientMailResponse === 'Unsuccessful!' ? 0 : 1)()
      }
    },
    { new: true }
  )
  .then(data => {
    return res.status(200).json({
      success: true,
      count: data.length,
      data: {
        mail: data,
        message: (() => intention === 'send' ? 'Successully update mail noty status (send).' + clientResMsg + adminResMsg : 'Successully update mail noty status (resend).' + clientResMsg + adminResMsg)()
      }
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Failed to update mail status noty from Mail Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Mail Dashboard (Update A Mail Status Read)
// @route   POST /api/v1/mails/private/update/read
// @access  Private (Require sessionId & uid)
exports.updatePrivateMailRead = async (req, res, next) => {
  let { mailId, intention } = req.body
  
  await Mail.findByIdAndUpdate(
    { _id: mailId },
    {
      $set: {
        statusRead: (() => intention === 'read' ? 1 : 0)()
      }
    },
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
      error: `Failed to update mail status read from Mail Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Mail Dashboard (Update A Mail Status Reply)
// @route   POST /api/v1/mails/private/update/reply
// @access  Private (Require sessionId & uid)
exports.updatePrivateMailReply = async (req, res, next) => {
  let { mailId, intention } = req.body
  
  await Mail.findByIdAndUpdate(
    { _id: mailId },
    {
      $set: {
        statusReply: (() => intention === 'reply' ? 1 : 0)()
      }
    },
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
      error: `Failed to update mail status reply from Mail Collection`,
      data: err
    })
  })
}

// @desc    Portfolio V4 Mail Dashboard (Delete A Mail)
// @route   POST /api/v1/mails/private/delete/:id
// @access  Private (Require sessionId & uid)
exports.deletePrivateMail = async (req, res, next) => {
  try {
    // check if mail is reply first
    let mail = await Mail.findById(req.params.id)
    if (mail) {
      if (mail.statusNoty === 0 || mail.statusRead === 0 || mail.statusReply === 0) return res.status(400).json({
        success: false,
        error: `Unable to delete mail! Please update status (noty, read & reply) to read and replied first.`,
        data: {}
      })
    }

    // delete from Contact
    await Contact.updateOne(
      { _id: req.body.contact },
      { $pull: { mails: req.params.id } },
    )

    // delete mail
    mail.remove()

    return res.status(200).json({
      success: true,
      count: 0,
      data: {}
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Failed to delete mail data from Mail Collection`,
      data: err
    })
  }
}