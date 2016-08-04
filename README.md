# TUS.io POC

This project was primarily made as a proof of concept for the use of Tus.io as a middleware component in an Express.js app.

## Using the Docker image

```
$> docker run -d -p 3000:3000 -v /<host_files_dir>:/src/files froi/ubuntu-tus:latest
```

# Devs

1. Clone repository:
```
$> git clone git@github.com:froi/tus-express-server.git
```

2. Move into tus-express-server directory
```
$> cd tus-express-server
```

3. Install dependencies:
```
$> npm install
```
or if you don't want the devDependencies:
```
$> npm install --production
```

## What are we using

* [Express.js](https://expressjs.com/) - used to create our basic REST API.
* [tus-node-server](https://github.com/tus/tus-node-server) - used as a middleware in our Express.js app.
* [tus-js-client](https://github.com/tus/tus-js-client) - used to test our Express.js app.
* [Mocha](https://mochajs.org/) - JS test framework
* [Chai](http://chaijs.com/) - JS assertion library.

## Running the tests

From the root directory run:

```
$> mocha src/test/tus-obj-spec.js
```

## Creating the Docker image

From the root of the project run:

```
$> docker build -t <user>/<image_name> .
```

# TUS protocol

The Tus protocol is a resumable file upload protocol that works over basic HTTP.

To read more about Tus please visit:

* [Tus.io](http://tus.io)
* [Tus on Github](https://github.com/tus)
