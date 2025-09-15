const nodemailer = require("nodemailer");


async function mailsend( mailto, subject,  html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.AUTH_MAIL,
          pass: process.env.APP_PASS_GOOGLE,
        },
      });

    const info = await transporter.sendMail({
      from: process.env.AUTH_MAIL,
      to: mailto,
      subject: subject, 
      html: html, // HTML body
    });
}


module.exports = mailsend
 