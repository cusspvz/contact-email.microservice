import Express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import env from './env'

const app = Express()

// setup middlewares
app.use(helmet())
app.use(cors({
  origin: (
    env.CORS_ORIGIN_REGEXP && new RegExp(env.CORS_ORIGIN_REGEXP) ||
    env.CORS_ORIGIN_COMMA_SEP && env.CORS_ORIGIN_COMMA_SEP.split(',') ||
    env.NODE_ENV !== 'production' && '*' ||
    false
  )
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// error handling
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  res.status(err && ( err.code || err.statusCode ) || 500)
  res.send(err.message)
  res.end()
})

export default app