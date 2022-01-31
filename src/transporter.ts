import Nodemailer from "nodemailer";

const env = require("./env");

const transporter = Nodemailer.createTransport({
  service: env.NODEMAILER_SERVICE,

  host: env.NODEMAILER_HOST,
  port: env.NODEMAILER_PORT,
  secure: env.NODEMAILER_SECURE,

  auth: env.NODEMAILER_AUTH && {
    type: env.NODEMAILER_TYPE,
    accessToken: env.NODEMAILER_ACCESS_TOKEN,
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
})

// verify if transporter is ok
transporter.verify(function (error: any, success: any) {
  if ( error ) {
    console.error('Transporter connect failed: There is a chance that the provided options are not correct.')
    console.error(error)
    process.exit(1)
  }

  console.log('Transporter verification: Success!')
})

export default transporter