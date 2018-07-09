import Express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

const { env } = process
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

export default app