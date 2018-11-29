'use strict';
module.exports = {
    "sdjs": {
      "host": "localhost",
      "port": 27017,
      "url": "",
      "database": "sdjs-speaker",
      "password": "",
      "name": "sdjs",
      "user": "",
      "connector": "mongodb"
    },
    "atlas": {
      "host": "sdjs-speaker-shard-00-00-j2ubp.mongodb.net",
      "port": 27017,
      "url": process.env.MONGODB_ATLAS_URI,
      "database": "sdjs",
      "name": "sdjs",
      "connector": "mongodb"
    }
  }
  