'use strict';

const { configureServices } = require('../Config/Startup');
const { todoController, authentication } = configureServices();

const express = require('express');

const todoRouter = express.Router();

todoRouter.route('/')
    .get(authentication.validateUser, (request, response) => todoController.getAllAsync(request, response));

todoRouter.route('/:id')
    .get(authentication.validateUser, (request, response) => todoController.getByIdAsync(request, response))
    .post(authentication.validateUser, (request, response) => todoController.createAsync(request, response))
    .patch(authentication.validateUser, (request, response) => todoController.updateAsync(request, response))
    .delete(authentication.validateUser, (request, response) => todoController.deleteAsync(request, response));

module.exports = { todoRouter }