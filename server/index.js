const winston = require('winston');
const express = require('express');
const app = express();
const path = require('path');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

  // Point static path to dist
  app.use(express.static(path.join(__filename, '/../../client/dist/client')));
  app.get('/*', function (req, res) {
    const abc = path.join(__filename, '/../client/dist/client/index.html');
    res.sendFile(path.join(__filename, '/../../client/dist/client/index.html'));
  });

const port = process.env.PORT || 3030;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;