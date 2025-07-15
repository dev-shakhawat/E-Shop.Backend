const nodemailer = require("nodemailer");


async function mailsend( mailto, subject,  html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.auth_email,
          pass: process.env.app_pass_google,
        },
      });

    const info = await transporter.sendMail({
      from: process.env.auth_email,
      to: mailto,
      subject: subject, 
      html: html, // HTML body
    });
}


module.exports = mailsend
 