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
      from: '"Resolve failed delivery" <WaybackApp@gmail.com>', // sender address
      to: request.body.email, // list of receivers
      subject: "Resolve failed delivery", // Subject line 
      html: `
        <b>Please click on the following link to resolve the incidence with your delivery.</b>
        <a>${request.body.link}</a>
      `, // html body
    });
    response.send(info)
  } catch (err) {
    console.log(err);
    response.send(err)
  }
}

module.exports = { sendEmail }