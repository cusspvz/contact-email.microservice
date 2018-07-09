import Express from 'express'
import Nodemailer from 'nodemailer'
import Recaptcha from 'recaptcha'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { name } from '../package.json'
const app = Express()
const { env } = process

const transporter = Nodemailer.createTransport({
  service: env.NODEMAILER_SERVICE,
  auth: env.NODEMAILER_AUTH && {
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
})

const recaptcha = env.RECAPTCHA_PUBLIC_KEY && env.RECAPTCHA_PRIVATE_KEY && new Recaptcha(env.RECAPTCHA_PUBLIC_KEY, env.RECAPTCHA_PRIVATE_KEY)
Recaptcha.prototype.validate = function (data = {}) {
  const rcptcha = Object.create(this)
  rcptcha.data = data

  return new Promise((ful, rej) => {
    rcptcha.verify(function (success, error_code) {
      if ( success ) {
        ful()
      } else {
        rej( error_code )
      }
    })
  })
}

// setup middlewares
app.use(helmet())
app.use(cors({
  origin: (
    env.CORS_ORIGIN_REGEXP && new RegExp(env.CORS_ORIGIN_REGEXP) ||
    env.CORS_ORIGIN_ARRAY && new RegExp(env.CORS_ORIGIN_ARRAY) ||
    env.NODE_ENV !== 'production' && '*' ||
    false
  )
}))

// healthcheck
app.get('/healthz', (req, res) => {
  res.send({
    service: name,
    features: {
      'reCAPTCHA': !! Recaptcha
    },
  })
  res.end()
})



// send email
app.post('/email',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  async (req, res, next) => {
    if ( ! recaptcha ) return next()

    const {
      body: { recaptcha_challenge_field: challenge, recaptcha_response_field: response },
      connection: { remoteAddress: remoteip },
    } = req

    // verify recaptcha
    try {
      await recaptcha.validate({ remoteip, challenge, response })
    } catch (err) {
      next(new Error('reCAPTHA error: '+err.toString()))
    }

  },
  async (req, res) => {
    const {
      body: { email, subject, message },
    } = req

    // check email


    transporter.sendMail({

    })
  }
)