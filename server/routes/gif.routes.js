'use strict';

module.exports = function(app) {
  var gifController = require('../controllers/gif.controller');

  app.route('/api/getTags').get(gifController.getTags);
  app.route('/api/:tagId/getTags').get(gifController.getTags);

};