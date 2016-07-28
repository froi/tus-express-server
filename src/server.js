const fs = require('fs');
const tus = require('tus-node-server');
const server = new tus.Server();
const express = require('express');
var app = express();
var router = express.Router();

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;

server.datastore = new tus.FileStore({
  path: '/files'
});

// route middleware that will happen on every request
router.all('/files/*', function(req, res) {

    // log each request to the console
    console.log(req.method, req.url);

    try {
      let uploadOut = server.handle(req, res)

      uploadOut.then((fufillmentValue) => {
        if(req.method === 'POST') {
            console.log('Initial Tus POST')
        } else {
          console.log(`${req.method} request.`)
        }

        let reqHeaders = JSON.stringify(req.headers)
        let resHeaders = JSON.stringify(res.headers)
        console.log(`Request Headers: ${reqHeaders}`)
        console.log(`Response Headers: ${resHeaders}`)
      },
      (rejectReason) => {
        console.log(`Reject Reason: ${rejectReason}`)
      });
      return uploadOut;
    } catch(error) {
      console.log(error)
      res.status(500)
    }
});

app.use('/', router)

app.listen(port, host, function() {
  console.log(`Server started on host: ${host} and port: ${port}`);
});
