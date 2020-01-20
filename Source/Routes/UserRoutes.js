'use strict';

const { configureServices } = require('../Config/Startup');
const { userController } = configureServices();

const express = require('express');

const userRouter = express.Router();

userRouter.route('/')
    .get((request, response) => userController.getAllAsync(request, response))
    .post((request, response) => userController.createAsync(request, response));

userRouter.route('/:id')
    .get((request, response) => userController.getByIdAsync(request, response))
    .patch((request, response) => userController.updateAsync(request, response))
    .delete((request, response) => userController.deleteAsync(request, response));

module.exports = { userRouter }