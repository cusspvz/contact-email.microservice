import app from './app'
import emailRoute from './routes/email'
import healthzRoute from './routes/healthz'
const { env } = process

const PORT = env.HTTP_PORT || 8080
app.listen(PORT, () => {
  console.log(`HTTP Server Start: Success! Port: ${PORT}`)
})
