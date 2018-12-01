'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
// const axios = require('axios');
require('dotenv').config();
var app = (module.exports = loopback());

app.use(loopback.static('public'));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// app.get('/api/robotLogin', (req, res) => {
//   axios({
//     method: 'post',
//     url: 'http://localhost:3000/api/organizers/login',
//     data: {
//       username: process.env.ADMIN_USERNAME,
//       password: process.env.ADMIN_PASSWORD,
//       ttl: 60 * 1
//     }
//   }).then(response => res.send(response.data));
// });

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
