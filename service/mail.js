const nodeMailer = require('nodemailer')
require('dotenv').config();
const adminEmail = process.env.ADMINEMAIL
const adminPassword = process.env.ADMINPASSWORD
const mailHost = process.env.MAILHOST
const mailPort = process.env.MAILPORT
const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  })

  const options = {
    from: adminEmail, 
    to: to, 
    subject: subject, 
    html: htmlContent 
  }

  return transporter.sendMail(options)
  .then(() => {
      console.log('Email sent successfully');
    }).catch((err) => {
      console.log('Failed to send email');
      console.error(err);
    });
}

module.exports = {
  sendMail: sendMail
}