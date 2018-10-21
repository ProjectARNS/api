const express = require('express')
const util = require('./util')
const app = express()
const status = {}
status.timeLastRequest = null

app.get('/', (req, res) => {
  res.send('Project Arns!')
})

app.post('/:type', async (req, res) => {
  status.type = 'storm'
  if ((new Date().getTime() - status.timeLastRequest) > 20000) {
    console.log('Mandou SMS')
    await util.sendSMSNotification(req.params.type)
  } else {
    console.log('Mandou PUSH')
    await util.sendPWANotification(req.params.type)
  }
  res.send('true')
})

app.get('/device', (req, res) => {
  status.timeLastRequest = new Date().getTime()
  res.send(true)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
