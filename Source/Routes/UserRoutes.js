'use strict';

const express = require('express');
const { userController } = require('../Controllers/UserController');
const { todoController } = require('../Controllers/TodoController');
const { loginController } = require('../Controllers/LoginController');
const { authenticateUser } = require('../Middlewares/Authentication');
const { validateId, validatePagination } = require('../Middlewares/Validator');
const { userMiddleware } = require('../Middlewares/User');
const { updateDateMiddleware } = require('../Middlewares/UpdateDate');

const userRouter = express.Router();

userRouter.route('/')
    .get(authenticateUser, validatePagination, userController().getAllAsync)
    .post(authenticateUser, userController().createAsync);

userRouter.route('/:id')
    .get(authenticateUser, validateId, userMiddleware().userExistsById, userController().getByIdAsync)
    .patch(authenticateUser, validateId, userMiddleware().userExistsById, updateDateMiddleware, userController().updateAsync)
    .delete(authenticateUser, validateId, userMiddleware().userExistsById, userController().deleteAsync);

userRouter.route('/:id/todos')
    .get(authenticateUser, validateId, validatePagination, userMiddleware().userExistsById, todoController().getByUserIdAsync);

userRouter.route('/login')
    .post(userMiddleware().userExistsByEmail, loginController().login);

module.exports = { userRouter };
