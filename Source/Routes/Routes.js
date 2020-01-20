'use strict';

const { UserController } = require('../Controllers/UserController');
const { TodoController } = require('../Controllers/TodoController');
const { UserRepository } = require('../Repositories/UserRepository');
const { TodoRepository } = require('../Repositories/TodoRepository');

let userRepository = new UserRepository();
let todoRepository = new TodoRepository();
let userController = new UserController(userRepository, todoRepository);
let todoController = new TodoController(todoRepository, userRepository);

const routes = app => {

    app.route('/api/v1/users')
    .get((request, response) => userController.getAllAsync(request, response))
    .post((request, response) => userController.createAsync(request, response));

    app.route('/api/v1/users/:id')
    .get((request, response) => userController.getByIdAsync(request, response))
    .patch((request, response) => userController.updateAsync(request, response))
    .delete((request, response) => userController.deleteAsync(request, response));

    app.route('/api/v1/todos')
    .get((request, response) => todoController.getAllAsync(request, response));

    app.route('/api/v1/todos/:id')
    .get((request, response) => todoController.getByIdAsync(request, response))
    .post((request, response) => todoController.createAsync(request, response))
    .patch((request, response) => todoController.updateAsync(request, response))
    .delete((request, response) => todoController.deleteAsync(request, response));

}

module.exports = { routes }