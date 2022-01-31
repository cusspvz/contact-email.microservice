import app from '../app'
import os from 'os'
//import { name, version } from '../../package.json'

// healthcheck
app.get('/healthz', (req: any, res: any) => {
  res.send({
    //name, version,
    hostname: os.hostname(),
    uptime: process.uptime(),
  })
  res.end()
})


