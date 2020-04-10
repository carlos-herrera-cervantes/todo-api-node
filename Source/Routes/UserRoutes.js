'use strict';

const express = require('express');
const { userController } = require('../Controllers/UserController');
const { loginController } = require('../Controllers/LoginController');
const { authenticateUser } = require('../Middlewares/Authentication');
const { validateId } = require('../Middlewares/Validator');
const { userMiddleware } = require('../Middlewares/User');
const { updateDateMiddleware } = require('../Middlewares/UpdateDate');

const userRouter = express.Router();

userRouter.route('/')
    .get(authenticateUser, userController().getAllAsync)
    .post(authenticateUser, userController().createAsync);

userRouter.route('/:id')
    .get(authenticateUser, validateId, userMiddleware().userExistsById, userController().getByIdAsync)
    .patch(authenticateUser, validateId, userMiddleware().userExistsById, updateDateMiddleware, userController().updateAsync)
    .delete(authenticateUser, validateId, userMiddleware().userExistsById, userController().deleteAsync);

userRouter.route('/login')
    .post(userMiddleware().userExistsByEmail, loginController().login);

module.exports = { userRouter };
