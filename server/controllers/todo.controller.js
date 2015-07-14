'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var ToDoModel = mongoose.model('ToDo');

/**
 * Signup
 */
exports.addTodo = function(req, res) {

  // Init Variables
  var todo = new ToDoModel(req.body);

  // Then save the user
  todo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      res.json(todo._id);
    }
  });
};

exports.getTodos = function(req, res) {
    ToDoModel.find().exec(function(err, todos) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        res.json(todos);
      }
    });
};
