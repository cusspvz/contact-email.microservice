import env from './env'
import app from './app'

// import routes
import './routes/email'
import './routes/healthz'
import './routes/root'

const PORT = env.SERVER_PORT || 8080
app.listen(PORT, () => {
  console.log(`HTTP Server Start: Success! Port: ${PORT}`)
})
