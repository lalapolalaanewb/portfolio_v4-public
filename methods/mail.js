/** Dependencies */
// Model - Project
const {
  Contact, Mail
} = require('../models')

/** Methods */
// @desc    Portfolio V4 Mail Dashboard (Get All Mails)
// @route   POST /api/v1/mails/private/get
// @access  Private (Require sessionId & uid)
exports.getPrivateMails = async (req, res, next) => {
  await Contact.findOne().where({ creator: '5f8fc26c6a103b243428bec1' })
  .populate('mails')
  .then(data => { console.log(data)
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    })
  })
  .catch(err => { console.log(err)
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Contact Collection`,
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
  .catch(err => { console.log(err)
    return res.status(500).json({
      success: false,
      error: `Failed to update contact status publish from Contact Collection`,
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
    let contact = await Contact.findOne().where(
      {
        _id: req.body.contactId,
        'mails._id': req.params.id
      }
    ).populate('mails'); return console.log(contact)
    if (contact) {
      if (contact.mails[0].statusRead === 0 || contact.mails[0].statusReply === 0) return res.status(400).json({
        success: false,
        error: `Unable to delete mail! Please update status (read & reply) to read and replied first.`,
        data: {}
      })
    }

    // delete post
    await Contact.updateOne(
      { _id: req.body.contactId },
      { $pull: { mails: req.params.id } },
    )

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