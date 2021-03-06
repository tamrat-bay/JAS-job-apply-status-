const nodemailer = require("nodemailer");
const jasEmail = require('../emailInfo.json');

// console.log(jas);

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(request) {
  const { email, id } = request;
  // console.log('useremail and id', email,id);
  console.log('jasEmailjasEmailjasEmailjasEmailjasEmailjasEmailjasEmail');
  console.log(jasEmail);

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: jasEmail.email, // generated ethereal user
      pass: jasEmail.password // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: jasEmail.email, // sender address
    to: email, // list of receivers
    subject: "Jas-Team Reset Password", // Subject line
    text: "", // plain text body
    html: `<p>To reset your password please click on this link : <a href="http://localhost:3000/reset/${id}">Reset LINK</a> </p>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports.sendEmail = sendEmail;