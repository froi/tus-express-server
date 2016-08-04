'use strict';

var expect = require('chai').expect;

describe('TusObj', function() {
  it('should exist', function() {
    let TusObj = require('../tus.js');
    expect(TusObj).to.not.be.undefined;
  });
});

var tus = require('tus-node-server');
var TusObj = require('../tus.js');

describe('#createTusServerObj', function() {
  it('should create a Tus server object', function() {
    let expected = new tus.Server();

    let actual = TusObj.createTusServerObj();
    expect(actual).to.instanceof(tus.Server);
  });
});

describe('#createTusFileStore', function(){
  it('should create a Tus filestore object', function() {
    let actual = TusObj.createTusFileStore('/files');
    expect(actual).to.be.instanceof(tus.FileStore);
  });
});

describe('#nameFileFromHeaders', function() {
  it('should return the expected filename from a base64 encoded string', function() {
    let expected = 'testfile.txt';

    let req = {
      headers: {
      "upload-metadata": "filename dGVzdGZpbGUudHh0"
      }
    };

    let datastore = TusObj.createTusFileStore('/files');
    let actual = datastore.generateFileName(req);
    expect(actual).to.equal(expected);
  });
});

describe('#consoleOutput', function() {
  it('should output an informative string of the request and response objects with a timestamp', function() {
    let outcome = 'fufilled: true';
    let req = {
      url: '/files/testfile.txt',
      method: 'PATCH',
      headers: {
        "tus-resumable": "1.0.0",
        "upload-file-rename": "upload-2016-08-04T03:17:04.443Z.txt",
        "upload-offset": "0",
        "content-type": "application/offset+octet-stream",
        "content-length": "488",
        "host": "127.0.0.1:3000",
        "connection": "close"
      }
    }
    let res = {
      statusCode: 204,
      headers: undefined
    }
    let expected = 'Tus outcome: fufilled: true\n' +
               'Request url: /files/testfile.txt\n' +
               'Request method: PATCH\n' +
               'Response code: 204\n' +
               'Request Headers: {"tus-resumable":"1.0.0","upload-file-rename":"upload-2016-08-04T03:17:04.443Z.txt","upload-offset":"0","content-type":"application/offset+octet-stream","content-length":"488","host":"127.0.0.1:3000","connection":"close"}\n' +
               'Response Headers: undefined';
    let actual = TusObj._createOutput(outcome, req, res);
    expect(actual).to.equal(expected);
  });
});
