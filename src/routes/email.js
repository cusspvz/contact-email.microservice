import Handlebars from 'handlebars'
import app from '../app'
import recaptcha from '../recaptcha'
import transporter from '../transporter'
import isEmail from 'is-email'
import env from '../env'

const TEMPLATE_CACHE = {}
function gatherTemplate ( templateName ) {
  const templateId = `EMAIL_TEMPLATE_${templateName.toUpperCase()}`

  // try to gather it from cache first
  if ( TEMPLATE_CACHE[ templateId ] ) {
    return TEMPLATE_CACHE[ templateId ]
  }

  let templateTextSource = env[templateId + '_TEXT'] || null
  let templateHTMLSource = env[templateId + '_HTML'] || null

  if ( ! templateTextSource && ! templateHTMLSource ) {
    return null
  } else {
    // If we have the text source but not the HTML source
    if ( templateTextSource && ! templateHTMLSource ) {
      templateHTMLSource = templateTextSource
        .replace(/(\n|\\n)/g,'<br/>')
    }
  }

  // compile the template with handlebars
  const template = {
    text: templateTextSource && Handlebars.compile(templateTextSource) || (() => ''),
    html: templateHTMLSource && Handlebars.compile(templateHTMLSource) || (() => ''),
  }

  // save it into memory for the next calls
  TEMPLATE_CACHE[ templateId ] = template

  return template
}

// send email
app.post('/email',
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
      return next(new Error('reCAPTHA error: '+err.toString()))
    }

    next()
  },
  async (req, res, next) => {
    const { body: { template, from, to, subject, data } } = req

    try {

      const templateName = template || env.EMAIL_DEFAULT_TEMPLATE || 'default'
      const compiledTemplate = gatherTemplate(templateName)

      if ( ! compiledTemplate ) {
        throw { message: 'The provided template is not defined' }
      }

      // generate the html and text based on the templates provded through envvars
      const dataset = typeof data == 'object' && ! Array.isArray(data) && data || {}
      const options = {
        from: from || env.EMAIL_DEFAULT_FROM,
        to: to || env.EMAIL_DEFAULT_TO,
        subject: subject || env.EMAIL_DEFAULT_SUBJECT,
        html: compiledTemplate.html(dataset),
        text: compiledTemplate.text(dataset),
      }

      if ( env.EMAIL_FROM_VALIDATE_IN ) {
        const valid_emails = env.EMAIL_FROM_VALIDATE_IN.split(',')
        if ( valid_emails.indexOf(options.from) === -1 ) {
          throw { message: 'The provided `from` email is not allowed', code: 401 }
        }
      }

      if ( ! isEmail( options.to ) ) {
        throw { message: 'The provided `from` email is not a valid email', code: 401 }
      }

      if ( env.EMAIL_TO_VALIDATE_IN ) {
        const valid_emails = env.EMAIL_TO_VALIDATE_IN.split(',')
        if ( valid_emails.indexOf(options.to) === -1 ) {
          throw { message: 'The provided `to` email is not allowed', code: 401 }
        }
      }

      if ( ! isEmail( options.to ) ) {
        throw { message: 'The provided `to` email is not a valid email', code: 401 }
      }

      // Prevent email grouping on clients
      if (+env.EMAIL_PREVENT_GROUPING) {
        options.subject = `[${Date.now().toString(32)}] ${options.subject}`
      }

      // check email
      await transporter.sendMail(options)
    } catch (err) {
      return next(err)
    }

    res.status(201)
    res.send('SENT')
    res.end()
  }
)