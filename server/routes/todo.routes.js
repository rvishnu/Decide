'use strict';

module.exports = function(app) {
  // ToDo Routes
  var todoController = require('../controllers/todo.controller');

  app.route('/api/addtodo').put(todoController.addTodo);
  app.route('/api/getTodos').get(todoController.getTodos);

};