import app from '../app'
import recaptcha from '../recaptcha'
import transporter from '../transporter'

// send email
app.post('/email', async (req, res, next) => {
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
})