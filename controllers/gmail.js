/* Dependencies Import                                                 ***/
// 1. Nodemailer
const nodemailer = require('nodemailer')
// 2. Path Handler
const path = require('path')

/** Env Variables */
const {
    // Gmail's Email (Gmail Access)
    GMAIL_EMAIL = process.env.GMAIL_EMAIL,
    // Sender's Email
    SENDER_EMAIL = 'enquiry@nitajsfera.com',
    // Gmail Client ID
    CLIENT_ID = process.env.GMAIL_CLIENT_ID,
    // Gmail Client Secret
    CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET,
    // Gmail Refresh Token
    REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN
} = process.env

/* GMAIL Configuration Setup                                           ***/
// Send a email copy to CLIENT (Send Access Key)
async function keyReqClientNoty(client, purpose) {
    let subjectEmail, clientEmail, clientName

    if(purpose === 'loginReq') {
        subjectEmail = 'Requesting Login Access Key'
        clientEmail = client.credentials.emails.main
        clientName = `${client.name.firstName} ${client.name.lastName}`
    } else {
        subjectEmail = 'Requesting Register Access Key'
        clientEmail = client
        clientName = `Mr/Mrs/Ms/Miss`
    }

    // - Create Nodemailer TRANSPORT INFO
    let transport = nodemailer.createTransport({
        // Service 
        service: 'Gmail',
        // Auth
        auth: {
            type: 'OAuth2',
            // Email use to send email (Your Google Email. Eg: xxx@gmail.com)
            user: GMAIL_EMAIL,
            // Get in Google Console API (GMAIL API)
            clientId: CLIENT_ID,
            // Get in Google Console API (GMAIL API)
            clientSecret: CLIENT_SECRET,
            // Get from Google OAuth2.0 Playground (Using Cliet ID & Client Secret Key)
            refreshToken: REFRESH_TOKEN
        }
    })

    // - body of Message
    let mailBody = `
        <div>
            <p>Hi! <b>${clientName}</b></p>
            <p>Thank you for reaching us at https://fmcalc.lalapolalaanewb.com</p>
        </div>
        <div>
            <p>Below are your message to us: </p>
            <div>
                <ul>
                    <li>Subject: <b>${subjectEmail}</b></li>
                    <li>Concern: </li>
                    <ul>
                        <li>Email Associated: <b>${clientEmail}</b></li>
                    </ul>
                </ul>
            </div>
        </div>
        <div>
            <p>We will reach out to you within 24 hours. Please be patience and kindly wait for our reply.</p>
            <p>Again, thank you for reaching us.</p>
        </div>
        <div>
            <p>Sincerely,</p>
            <p>FMCalc System [<b>Lalapolalaa Newb</b>]</p>
        </div>
    `

    // - Create BODY of mail
    let mailOptions = {
        // Email should be SAME as USER EMAIL above     
        from: `FMCalc System <${SENDER_EMAIL}>`,
        // ANY Email to send the mail (to send to many use ',' inside the single quote. Eg: 'xxx@gmail.com, xxx@yahoo.com')
        to: clientEmail,
        subject: `[FMCalc Lalapolalaa Newb] ${subjectEmail}`,
        // TEXT cannot apply any HTML Elements (use either TEXT or HTML)
        // text: 'Hey there, it’s our first message sent with Nodemailer ',
        // HTML can apply any HTML Elements (use either TEXT or HTML)
        html: mailBody
    }

    // send email
    return await transport.sendMail(mailOptions)
    .then(success => 'Successful!')
    .catch(err => 'Unsuccesful!')
}

// Send a email copy to CLIENT (Send Access Key)
async function keyReqAdminNoty(client, purpose) {
    let subjectEmail, clientEmail, clientName, clientRole
    
    if(purpose === 'loginReq') {
        subjectEmail = 'Requesting Login Access Key'
        clientEmail = client.credentials.emails.main
        clientName = `${client.name.firstName} ${client.name.lastName}`
        clientRole = client.credentials.role
        const roleData = JSON.parse(await getAsync(`fmcalc_role`))
        roleData.forEach(role => {
            if(role._id == clientRole) clientRole = role.name
        })
    } else {
        subjectEmail = 'Requesting Register Access Key'
        clientEmail = client
        clientName = `Mr/Mrs/Ms/Miss`
    }

    // - Create Nodemailer TRANSPORT INFO
    let transport = nodemailer.createTransport({
        // Service 
        service: 'Gmail',
        // Auth
        auth: {
            type: 'OAuth2',
            // Email use to send email (Your Google Email. Eg: xxx@gmail.com)
            user: GMAIL_EMAIL,
            // Get in Google Console API (GMAIL API)
            clientId: CLIENT_ID,
            // Get in Google Console API (GMAIL API)
            clientSecret: CLIENT_SECRET,
            // Get from Google OAuth2.0 Playground (Using Cliet ID & Client Secret Key)
            refreshToken: REFRESH_TOKEN
        }
    })

    let optionsBody = () => {
        if(purpose === 'loginReq') {
            return `<b>${clientRole} ${clientName} is ${subjectEmail}</b>`
        } else {
            return `<b>${clientEmail} is ${subjectEmail}</b>`
        }
    }

    // - body of Message
    let mailBody = `
        <div>
            <p>${optionsBody()}</p>
        </div>
        <div>
            <p>Proceed to https://fmcalc.lalapolalaanewb.com to create a token within 24 hours time.</p>
        </div>
        <div>
            <p>Sincerely,</p>
            <p>FMCalc System [<b>Lalapolalaa Newb</b>]</p>
        </div>
    `

    // - Create BODY of mail
    let mailOptions = {
        // Email should be SAME as USER EMAIL above     
        from: `FMCalc System <${SENDER_EMAIL}>`,
        // ANY Email to send the mail (to send to many use ',' inside the single quote. Eg: 'xxx@gmail.com, xxx@yahoo.com')
        to: 'fathi_noor@nitajsfera.com',
        subject: `[FMCalc Lalapolalaa Newb] ${subjectEmail}`,
        // TEXT cannot apply any HTML Elements (use either TEXT or HTML)
        // text: 'Hey there, it’s our first message sent with Nodemailer ',
        // HTML can apply any HTML Elements (use either TEXT or HTML)
        html: mailBody
    }

    // send email
    return await transport.sendMail(mailOptions)
    .then(success => 'Successful!')
    .catch(err => 'Unsuccesful!')
}

// Send a email copy to CLIENT (Send Token)
async function tokenSendClientNoty(client, token, purpose) {
    let subjectEmail, clientEmail, clientName, registerLink

    if(purpose === 'loginReq') {
        subjectEmail = 'Login Access Key'
        clientEmail = client.email
        clientName = client.name
    } else {
        subjectEmail = 'Register Access Key'
        clientEmail = client.name
        clientName = `Mr/Mrs/Ms/Miss`
        registerLink = token.pathUrl + `/auth/registeraccess?token=${token.accessToken}`
    }

    // - Create Nodemailer TRANSPORT INFO
    let transport = nodemailer.createTransport({
        // Service 
        service: 'Gmail',
        // Auth
        auth: {
            type: 'OAuth2',
            // Email use to send email (Your Google Email. Eg: xxx@gmail.com)
            user: GMAIL_EMAIL,
            // Get in Google Console API (GMAIL API)
            clientId: CLIENT_ID,
            // Get in Google Console API (GMAIL API)
            clientSecret: CLIENT_SECRET,
            // Get from Google OAuth2.0 Playground (Using Cliet ID & Client Secret Key)
            refreshToken: REFRESH_TOKEN
        }
    })

    let optionsBody = () => {
        if(purpose === 'loginReq') {
            return `
                <p>Below are your <b>Access Key</b> for Login: </p>
                <div>
                    <ul>
                        <li>Subject: <b>${subjectEmail}</b></li>
                        <li>Access Key info: </li>
                        <ul>
                            <li>Access Key: <b>${token.accessToken}</b></li>
                            <li>Key Lifetime: <b>${token.duration}</b></li>
                            <li>Key Created At: <b>${token.createdAt}</b></li>
                            <li>Key Expired At: <b>${token.expiredAt}</b></li>
                        </ul>
                    </ul>
                </div>
            `
        } else {
            return `
                <p>Below are your <b>Register Link</b>: </p>
                <div>
                    <ul>
                        <li>click <a href="${registerLink}">HERE</a></li>
                        <li>Or copy <b>${registerLink}</b></li>
                        <li>Register Link info: </li>
                        <ul>
                            <li>Link Lifetime: <b>${token.duration}</b></li>
                            <li>Link Created At: <b>${token.createdAt}</b></li>
                            <li>Link Expired At: <b>${token.expiredAt}</b></li>
                        </ul>
                    </ul>
                </div>
            `
        }
    }

    let optionsReminder = () => {
        if(purpose === 'loginReq') {
            return `You can <b>stay logged-in for only ${token.duration} in the system</b>. Please request for another key if you wish to stay logged-in longer.`
        } else{
            return `You can <b>use the Register Link for only ${token.duration} or before it's expired (refer above 'Link Expired At' )</b>. Please request for another link if you link expired.`
        }
    }

    // - body of Message
    let mailBody = `
        <div>
            <p>Hi! <b>${clientName}</b></p>
            <p>Thank you for reaching us at https://fmcalc.lalapolalaanewb.com</p>
        </div>
        <div>${optionsBody()}</div>
        <div>
            <p><b>REMINDER:</b> ${optionsReminder()}</p>
            <p>Do please <b>Contact Us</b> for any inquiry. We will reach out to you within 24 hours. Please be patience and kindly wait for our reply.</p>
            <p>Again, thank you for reaching us.</p>
        </div>
        <div>
            <p>Sincerely,</p>
            <p>FMCalc System [<b>Lalapolalaa Newb</b>]</p>
        </div>
    `

    // - Create BODY of mail
    let mailOptions = {
        // Email should be SAME as USER EMAIL above     
        from: `FMCalc System <${SENDER_EMAIL}>`,
        // ANY Email to send the mail (to send to many use ',' inside the single quote. Eg: 'xxx@gmail.com, xxx@yahoo.com')
        to: clientEmail,
        subject: `[FMCalc Lalapolalaa Newb] ${subjectEmail}`,
        // TEXT cannot apply any HTML Elements (use either TEXT or HTML)
        // text: 'Hey there, it’s our first message sent with Nodemailer ',
        // HTML can apply any HTML Elements (use either TEXT or HTML)
        html: mailBody
    }

    // send email
    return await transport.sendMail(mailOptions)
    .then(success => 'Successful!')
    .catch(err => 'Unsuccesful!')
}

// Send a email copy to CLIENT (Send Token)
async function tokenSendAdminNoty(client, token, purpose) {
    let subjectEmail, clientEmail, clientName, clientRole, registerLink
    
    if(purpose === 'loginReq') {
        subjectEmail = 'Login Access Key'
        clientEmail = client.email
        clientName = client.name
        clientRole = client.role
        const roleData = JSON.parse(await getAsync(`fmcalc_role`))
        roleData.forEach(role => {
            if(role._id == client.role) clientRole = role.name
        })
    } else {
        subjectEmail = 'Requesting Register Access Key'
        clientEmail = client
        clientName = `Mr/Mrs/Ms/Miss`
        clientRole = client.role
        registerLink = token.pathUrl + `/auth/registeraccess?token=${token.accessToken}`
    }

    // - Create Nodemailer TRANSPORT INFO
    let transport = nodemailer.createTransport({
        // Service 
        service: 'Gmail',
        // Auth
        auth: {
            type: 'OAuth2',
            // Email use to send email (Your Google Email. Eg: xxx@gmail.com)
            user: GMAIL_EMAIL,
            // Get in Google Console API (GMAIL API)
            clientId: CLIENT_ID,
            // Get in Google Console API (GMAIL API)
            clientSecret: CLIENT_SECRET,
            // Get from Google OAuth2.0 Playground (Using Cliet ID & Client Secret Key)
            refreshToken: REFRESH_TOKEN
        }
    })

    let optionsHeader = () => {
        if(purpose === 'loginReq') {
            return `<b>${clientRole} ${clientName} received ${subjectEmail}</b>`
        } else {
            return `<b>${clientRole} ${clientEmail} received ${subjectEmail}</b>`
        }
    }

    let optionsBody = () => {
        if(purpose === 'loginReq') {
            return `
                <p>Below are the <b>Access Key</b> for requestor - ${clientRole} ${clientName}: </p>
                <div>
                    <ul>
                        <li>Access Key info: </li>
                        <ul>
                            <li>Access Key: <b>${token.accessToken}</b></li>
                            <li>Key Lifetime: <b>${token.duration}</b></li>
                            <li>Key Created At: <b>${token.createdAt}</b></li>
                            <li>Key Expired At: <b>${token.expiredAt}</b></li>
                        </ul>
                    </ul>
                </div>
            `
        } else {
            return `
                <p>Below are the <b>Register Link</b> for requestor - ${clientRole} ${clientEmail}: </p>
                <div>
                    <ul>
                        <li>Register Link: click <a href="${registerLink}">HERE</a> or copy <b>${registerLink}</b</li>
                    </ul>
                </div>
            `
        }
    }

    // - body of Message
    let mailBody = `
        <div>
            <p>${optionsHeader()}</p>
        </div>
        <div>${optionsBody()}</div>
        <div>
            <p>Sincerely,</p>
            <p>FMCalc System [<b>Lalapolalaa Newb</b>]</p>
        </div>
    `

    // - Create BODY of mail
    let mailOptions = {
        // Email should be SAME as USER EMAIL above     
        from: `FMCalc System <${SENDER_EMAIL}>`,
        // ANY Email to send the mail (to send to many use ',' inside the single quote. Eg: 'xxx@gmail.com, xxx@yahoo.com')
        to: 'fathi_noor@nitajsfera.com',
        subject: `[FMCalc Lalapolalaa Newb] ${subjectEmail}`,
        // TEXT cannot apply any HTML Elements (use either TEXT or HTML)
        // text: 'Hey there, it’s our first message sent with Nodemailer ',
        // HTML can apply any HTML Elements (use either TEXT or HTML)
        html: mailBody
    }

    // send email
    return await transport.sendMail(mailOptions)
    .then(success => 'Successful!')
    .catch(err => 'Unsuccesful!')
}

/* GMAIL Configuration Setup Export                                    ***/

module.exports = {
    keyReqClientNoty,
    keyReqAdminNoty,
    tokenSendClientNoty,
    tokenSendAdminNoty
} 