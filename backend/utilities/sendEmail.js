const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async (email, otp) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'OTP Verification',
    html: `<h1>Your OTP is ${otp}</h1>`
  })
}

module.exports = sendEmail
