'use strict';

const { configureServices } = require('../Config/Startup');
const { todoController } = configureServices();

const express = require('express');

const todoRouter = express.Router();

todoRouter.route('/')
    .get((request, response) => todoController.getAllAsync(request, response));

todoRouter.route('/:id')
    .get((request, response) => todoController.getByIdAsync(request, response))
    .post((request, response) => todoController.createAsync(request, response))
    .patch((request, response) => todoController.updateAsync(request, response))
    .delete((request, response) => todoController.deleteAsync(request, response));

module.exports = { todoRouter }