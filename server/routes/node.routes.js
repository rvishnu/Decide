/**
 * Created by rvishnu on 7/12/15.
 */
'use strict';

module.exports = function(app) {
  // Node Routes
  var nodeController = require('../controllers/node.controller');

  app.route('/api/Node').post(nodeController.edit);
  app.route('/api/Node').put(nodeController.save);
  app.route('/api/Node').delete(nodeController.delete);
};
