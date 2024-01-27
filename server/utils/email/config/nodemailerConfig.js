module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'airborneCoding@gmail.com', // sender
    pass: process.env.EMAIL_APP_PASSWORD,
  },
};
