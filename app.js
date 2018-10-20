var express = require('express')
var util = require('./util')
var app = express()

app.get('/', function (req, res) {
  res.send('Project Arns!')
})

app.post('/notification', async function (req, res) {
  await util.sendSMSNotification()
  await util.sendPWANotification()
  res.send('Sent Notifications')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
