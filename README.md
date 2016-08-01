# TUS.io POC

This project was primarily made as a proof of concept for the use of Tus.io as a middleware component in an Express.js app.

## Using the image

```$> docker run -d -p 3000:3000 -v /<host_files_dir>:/src/files froi/ubuntu-tus:latest```

## What are we using

* [Express.js](https://expressjs.com/) - used to create our basic REST API.
* [tus-node-server](https://github.com/tus/tus-node-server) - used as a middleware in our Express.js app.
* [tus-js-client](https://github.com/tus/tus-js-client) - used to test our Express.js app.

# TUS protocol

The Tus protocol is a resumable file upload protocol that works over basic HTTP.

To read more about Tus please visit:

* [Tus.io](http://tus.io)
* [Tus on Github](https://github.com/tus)
