import app from '../app'

// healthcheck
app.get('/', (req: any, res: any) => {
  res.end()
})


