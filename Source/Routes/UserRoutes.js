'use strict';

const { configureServices } = require('../Config/Startup');
const { userController, loginController, authentication } = configureServices();

const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get(authentication.validateUser, (request, response) => userController.getAllAsync(request, response))
    .post(authentication.validateUser, (request, response) => userController.createAsync(request, response));

userRouter.route('/:id')
    .get(authentication.validateUser, (request, response) => userController.getByIdAsync(request, response))
    .patch(authentication.validateUser, (request, response) => userController.updateAsync(request, response))
    .delete(authentication.validateUser, (request, response) => userController.deleteAsync(request, response));

userRouter.route('/login')
    .post((request, response) => loginController.Login(request, response));

module.exports = { userRouter }