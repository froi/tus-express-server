'use strict';

var TusObj;

TusObj = {
  createTusServerObj: function() {
    let tus = require('tus-node-server');
    return new tus.Server();
  },
  createTusFileStore: function(tusPath) {
    let tus = require('tus-node-server');
    let filestore = new tus.FileStore({
      path: tusPath,
      namingFunction: function(req) {
        let uploadMetadata = req.headers['upload-metadata'];
        let fileName = `campodata-upload-${new Date().toISOString()}`;
        if (uploadMetadata) {
          let splitMetadata = uploadMetadata.split(',');

          splitMetadata.forEach((item) => {
            if (item.match(/^filename/i)) {
              let itemArr = item.split(' ');

              if (itemArr && itemArr.length > 1) {
                let buff = Buffer.from(itemArr[1], 'base64');
                fileName = buff.toString();
              }
            }
          })
        }
        return fileName;
      }
    });
    return filestore;
  },
  _createOutput: function(tusOutcome, req = undefined, res = undefined) {
    return [
      `Tus outcome: ${tusOutcome}`,
      `Request url: ${req.url}`,
      `Request method: ${req.method}`,
      `Response code: ${res.statusCode}`,
      `Request Headers: ${JSON.stringify(req.headers)}`,
      `Response Headers: ${JSON.stringify(res.headers)}`
    ].join('\n');
  },
  consoleOutput: function (tusOutcome, req = undefined, res = undefined) {
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(TusObj._createOutput(tusOutcome, req, res))
  }
}

module.exports = TusObj;
