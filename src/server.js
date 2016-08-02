const tus = require('tus-node-server')
const server = new tus.Server()
const express = require('express')

var app = express()
var router = express.Router()
var host = process.env.HOST || '0.0.0.0'
var port = process.env.PORT || 3000

server.datastore = new tus.FileStore({
  path: '/files',
  namingFunction: (req) => {
    let uploadMetadata = req.headers['upload-metadata']
    let fileName = `campodata-upload-${new Date().toISOString()}`
    if (uploadMetadata) {
      let splitMetadata = uploadMetadata.split(',')

      splitMetadata.forEach((item) => {
        if (item.match(/^filename/i)) {
          let itemArr = item.split(' ')

          if (itemArr && itemArr.length > 1) {
            let buff = Buffer.from(itemArr[1], 'base64')
            fileName = buff.toString()
          }
        }
      })
    }

    return fileName
  }
})

function tusOutput (tusOutcome, req = undefined, res = undefined, rejected = true) {

  console.log(`Time: ${new Date().toISOString()}`)
  console.log(`Tus outcome: ${tusOutcome}`)
  console.log(`Request method: ${req.method}`)
  console.log(`Response code: ${res.statusCode}`)
  console.log(`Request Headers: ${reqHeaders}`)
  console.log(`Response Headers: ${resHeaders}`)

}

// route middleware that will happen on every request
router.head('/files/*', function (req, res) {
  server.handle(req, res)

  tusOutput('proccessed', req, res, false)
})
router.get('/files/*', function (req, res) {
  console.log(`${new Date().toISOString()} : GET request received. Method not allowed.`)
  res.status(405)
})
router.post('/files/*', function (req, res) {
  let uploadOut = server.handle(req, res)

  uploadOut.then((fufillmentValue) => {
    tusOutput(`fufilled: ${fufillmentValue}`, req, res, false)
  },
  (rejectReason) => {
    tusOutput(`rejected: ${rejectReason}`)
  })

  return uploadOut
})
router.patch('/files/*', function (req, res) {
  // log each request to the console
  console.log(req.method, req.url)
  console.log(req.headers['upload-metadata'])

  try {
    let uploadOut = server.handle(req, res)

    uploadOut.then((fufillmentValue) => {
      tusOutput(`fufilled: ${fufillmentValue}`, req, res, false)
    },
    (rejectReason) => {
      tusOutput(`rejected: ${rejectReason}`)
    })
    return uploadOut
  } catch (error) {
    console.log(`${new Date().toISOString()} : Oh No! A wild exception occurred.`)
    console.log(error)
    res.status(500)
  }
})

app.use('/', router)

app.listen(port, host, function () {
  console.log(`${new Date().toISOString()} : Server started on host: ${host} and port: ${port}`)
})
