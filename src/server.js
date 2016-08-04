'use strict';

const TusObj = require('./tus');
const server = TusObj.createTusServerObj();

const express = require('express');
var app = express();
var router = express.Router();
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;

server.datastore = TusObj.createTusFileStore('/files');

// route middleware that will happen on every request
router.head('/files/*', function (req, res) {
  server.handle(req, res);
  TusObj.consoleOutput('proccessed', req, res, false);
})
router.get('/files/*', function (req, res) {
  res.status(405);
})
router.post('/files/*', function (req, res) {
  let uploadOut = server.handle(req, res);

  uploadOut.then((fufillmentValue) => {
    TusObj.consoleOutput(`fufilled: ${fufillmentValue}`, req, res, false);
  },
  (rejectReason) => {
    TusObj.consoleOutput(`rejected: ${rejectReason}`);
  })

  return uploadOut;
})
router.patch('/files/*', function (req, res) {
  try {
    let uploadOut = server.handle(req, res);

    uploadOut.then((fufillmentValue) => {
      TusObj.consoleOutput(`fufilled: ${fufillmentValue}`, req, res, false);
    },
    (rejeconsoleOutputon) => {
      TusObj.consoleOutput(`rejected: ${rejectReason}`);
    })
    return uploadOut;
  } catch (error) {
    console.log(`${new Date().toISOString()} : Oh No! A wild exception occurred.`);
    console.log(error);
    res.status(500);
  }
})

app.use('/', router);

app.listen(port, host, function () {
  console.log(`${new Date().toISOString()} : Server started on host: ${host} and port: ${port}`);
})
