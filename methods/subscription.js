/** Dependencies */
// Model - Project
const {
  Subscription
} = require('../models')
// Controller
const {
  // Gmail
  subsAutoReplyClientNoty,
  subsAutoReplyAdminNoty,
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
    contacts: redisAllData.contactsRedis,
    subs: redisAllData.subscriptionsRedis,
    users: redisAllData.usersRedis
  }
}
// set new subscriptions redis data
const setAllSubscription = async(redisAllSubscription) => {
  await setAsync(`pfv4_subscriptions`, JSON.stringify(redisAllSubscription))
}

/** Methods */
// @desc    Portfolio V4 Subscription (Add A Subscription)
// @route   POST /api/v1/subscriptions/public/add
// @access  Public (Only need Admin Public Access Key)
exports.addPublicSubscription = async (req, res, next) => {
  let {
    subscriber
  } = req.body; console.log(req.body)

  // get subscriptions & users data from redis
  let redisAllData = await getAllData()
  let contacts = redisAllData.contacts
  let subs = redisAllData.subs
  let users = redisAllData.users
  
  // return message
  let clientResMsg = '', adminResMsg = ''
  
  // get contact info (active user)
  let creator = users.find(user => user.status === 1)
  if(!creator) return res.status(400).json({
    success: false,
    error: `Something went wrong. Please refresh the page and try again later.`,
    data: {}
  }) 
  let contact = contacts.find(state => state.creator === creator._id)

  // send noty to client (from)
  let clientMailResponse = await subsAutoReplyClientNoty(
    {
      userGmail: contact.senderGmail,
      userEmail: contact.senderEmail,
      clientId: contact.clientId,
      clientSecret: contact.clientSecret,
      refreshToken: contact.refreshToken
    },
    {
      email: subscriber,
    }
  )
  // throw error if email noty sent unsuccessful
  if(clientMailResponse === 'Unsuccessful!') clientResMsg = ' Failed sending mail noty to your email.'

  // send noty to admin (to)
  let adminMailResponse = await subsAutoReplyAdminNoty(
    {
      userGmail: contact.senderGmail,
      userEmail: contact.senderEmail,
      clientId: contact.clientId,
      clientSecret: contact.clientSecret,
      refreshToken: contact.refreshToken
    },
    {
      name: creator.name.firstName + ' ' + creator.name.lastName,
      email: creator.credentials.emails.main
    },
    {
      email: subscriber,
    }
  )
  // throw error if email noty sent unsuccessful
  if(adminMailResponse === 'Unsuccessful!') adminResMsg = ' Failed sending mail noty to admin email.'

  // create new mail
  const newMail = new Subscription({
    fromWho: subscriber,
    statusNoty: clientMailResponse === 'Unsuccessful!' ? 0 : 1,
    subsTo: creator
  })

  newMail.save()
  .then(async data => {
    /** update subs redis */
    // add new added data to subs redis
    subs.push(data)
    // set new subs redis
    await setAllSubscription(subs)

    return res.status(200).json({
      success: true,
      count: 1,
      data: 'Successfully subscribed to our newsletter. Thank you!' + clientResMsg + adminResMsg
    })
  })
  .catch(err => { 
    return res.status(500).json({
      success: false,
      error: `Newsletter mail sending failed. Please try again later.`,
      data: err
    })
  })
}