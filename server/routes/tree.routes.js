/**
 * Created by rvishnu on 7/5/15.
 */
'use strict';

module.exports = function(app) {
  // Tree Routes
  var treeController = require('../controllers/tree.controller');

  app.route('/api/Tree').post(treeController.updateTree);
  app.route('/api/Tree').put(treeController.saveTree);
  app.route('/api/Tree').get(treeController.getTree);


};
