import env from './env'
import app from './app'
import emailRoute from './routes/email'
import healthzRoute from './routes/healthz'

const PORT = env.SERVER_PORT || 8080
app.listen(PORT, () => {
  console.log(`HTTP Server Start: Success! Port: ${PORT}`)
})
