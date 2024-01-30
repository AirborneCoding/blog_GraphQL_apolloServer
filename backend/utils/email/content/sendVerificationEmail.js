const sendEmail = require('../config/sendEmail');
const ejs = require('ejs');
const path = require('path');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {


  const verifyEmail = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`;

  const templatePath = path.join(__dirname, '../template/verifyEmail.ejs');

  const renderedTemplate = await ejs.renderFile(templatePath, {
    name: name,
    verifyEmail: verifyEmail,
  });

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: renderedTemplate,
  });
};

module.exports = sendVerificationEmail;
