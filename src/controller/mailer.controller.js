const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'waybackapp@gmail.com', // generated ethereal user
    pass: 'ynuxrgkhuaydlwgu', // generated ethereal password
  },
});

const sendEmail = async (request, response) => {
  try {
    let info = await transporter.sendMail({
      from: '<WaybackApp@gmail.com>', // sender address
      to: request.body.email, // list of receivers
      subject: request.body.subject, // Subject line 
      html: request.body.html, // html body
    });
    console.log('eoioasd');
    console.log(info);
    response.send(info)
  } catch (err) {
    console.log(err);
    response.send(err)
  }
}

module.exports = { sendEmail }