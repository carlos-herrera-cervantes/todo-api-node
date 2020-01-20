'use strcit';

const { UserController } = require('../Controllers/UserController');
const { TodoController } = require('../Controllers/TodoController');

const { UserRepository } = require('../Repositories/UserRepository');
const { TodoRepository } = require('../Repositories/TodoRepository');

const { LoginController } = require('../Controllers/LoginController');
const { Authentication } = require('../Middlewares/Authentication');

const configureServices = () => {
    let userRepository = new UserRepository();
    let todoRepository = new TodoRepository();
    let userController = new UserController(userRepository, todoRepository);
    let todoController = new TodoController(todoRepository, userRepository);
    let loginController = new LoginController(userRepository);
    let authentication = new Authentication();

    return { userController, todoController, loginController, authentication };
}

module.exports = { configureServices }