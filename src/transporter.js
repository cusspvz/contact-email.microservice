import Nodemailer from 'nodemailer'
const { env } = process

const transporter = Nodemailer.createTransport({
  service: env.NODEMAILER_SERVICE,
  secure: env.NODEMAILER_SECURE,
  auth: env.NODEMAILER_AUTH && {
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
})

// verify if transporter is ok
transporter.verify(function (error, success) {
  if ( error ) {
    console.error('Transporter connect failed: There is a chance that the provided options are not correct.')
    process.exit(1)
  }

  console.log('Transporter verification: Success!')
})

export default transporter