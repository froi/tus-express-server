/* eslint no-console: 0 */

var fs = require('fs')
var tus = require('tus-js-client')

var path = 'testfile.txt'
var file = fs.createReadStream('testfile.txt')
var size = fs.statSync(path).size
var host = process.env.HOST || '127.0.0.1'
var port = process.env.PORT || '3000'

var options = {
  endpoint: `http://${host}:${port}/files/`,
  resume: true,
  chunkSize: size ,
  metadata: {
    filename: 'testfile.txt'
  },
  headers: {
    'upload-file-rename': `upload-${new Date().toISOString()}.txt`
  },
  uploadSize: size,
  onError: (error) => {
    throw error
  },
  onChunckComplete: (chunkSize, bytesAccepted, bytesTotal) => {
    console.log('ChunkSize: ', chunkSize)
    console.log('bytesAccepted: ', bytesAccepted)
    console.log('bytesTotal: ', bytesTotal)
  },
  onProgress: (bytesUploaded, bytesTotal) => {
    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
    console.log(bytesUploaded, bytesTotal, percentage + '%')
  },
  onSuccess: () => {
    console.log('Upload finished:', upload.url)
  }
}

var upload = new tus.Upload(file, options)
upload.start()
