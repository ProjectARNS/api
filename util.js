const axios = require('axios')
require('dotenv').config()
const checklist = require('./checklist')

function sendPWANotification (type) {
  let checkFound = checklist.find(atual => atual.type === type)
  const notification = {
    app_id: process.env.APP_ID,
    headings: { 'en': checkFound.title.toString() + ' - Projeto Arns' },
    contents: { 'en': 'Know how remain safe' },
    include_player_ids: process.env.PUSHIDS.split(',')
  }

  axios.post('https://onesignal.com/api/v1/notifications', notification)
    .then(function (res) {
      return res
    })
    .catch(function (error) {
      console.log('TCL: sendPWANotification -> ror.response.data', error.response.data)
      return error.response.data
    })
}

function sendSMSNotification (message) {
  let AWS = require('aws-sdk')
  AWS.config.update({ region: 'us-east-1' })
  process.env.PHONENUMBER.split(',').forEach((element) => {
    let params = {
      Message: 'TEXT_MESSAGE',
      PhoneNumber: element
    }

    let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise()

    publishTextPromise
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.error(err, err.stack)
        return err
      })
  })
}

module.exports = {
  sendPWANotification,
  sendSMSNotification
}
