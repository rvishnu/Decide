var express = require('express');

var bodyParser = require('body-parser');

module.exports = function(db) {
  var app = express();
  app.use(bodyParser.json());

  // Load in Database models
  require('../models/todo.model');
  require('../models/tree.model');
  require('../models/node.model');


  // Load in Route handlers
  require('../routes/todo.routes')(app);
  require('../routes/tree.routes')(app);
  require('../routes/node.routes')(app);

  require('../routes/gif.routes')(app);

  return app;
}
