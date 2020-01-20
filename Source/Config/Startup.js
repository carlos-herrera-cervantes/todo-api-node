'use strcit';

const { UserController } = require('../Controllers/UserController');
const { TodoController } = require('../Controllers/TodoController');
const { UserRepository } = require('../Repositories/UserRepository');
const { TodoRepository } = require('../Repositories/TodoRepository');

const configureServices = () => {
    let userRepository = new UserRepository();
    let todoRepository = new TodoRepository();
    let userController = new UserController(userRepository, todoRepository);
    let todoController = new TodoController(todoRepository, userRepository);

    return { userController, todoController };
}

module.exports = { configureServices }