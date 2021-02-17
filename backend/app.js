const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let testAccount = nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'gabanishu45@gmail.com', // generated ethereal user
    pass: '***', // generated ethereal password
  },
});

app.use((req,res,next) =>{
  //Defines which domains are allowed to access our resources
  res.setHeader("Access-Control-Allow-Origin","*");
  //Incoming request may have these type of headers
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS ")
  next();
});

app.post("/api/sendMail",(req,res,next)=> {
  // setup email data with unicode symbols
  var mailOptions = {
    from: ''+req.body.email+'', // sender address
    to: 'gabanishi45@gmail.com', // list of receivers
    subject: 'Query', // Subject line
    text: 'Feedback', // plain text body
    html: '<b>'+req.body.description+'</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.status(201).json({
      message : 'Mail Sent Successfully!'
    });
  });
});

module.exports = app;
