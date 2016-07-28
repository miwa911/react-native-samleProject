'use strict';
/* global Parse */
var nodemailer = require('nodemailer');

function sendEmail() {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://hcmwae8%40gmail.com:waewaeWAE@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
      to: 'muaiphone123@gmail.com', // list of receivers
      subject: 'Hello1 ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
Parse.Cloud.define('test_push', function(request, response) {
  Parse.Cloud.useMasterKey();

  sendEmail();
  var user = request.user;
  // if (!user) {
  //   return response.error({message: 'Not logged in'});
  // }
  console.log('abc')
  response.success('value')

});
