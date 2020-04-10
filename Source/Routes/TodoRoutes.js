'use strict';

const express = require('express');
const { todoController } = require('../Controllers/TodoController');
const { authenticateUser } = require('../Middlewares/Authentication');
const { validateId } = require('../Middlewares/Validator');
const { todoMiddleware } = require('../Middlewares/Todo');
const { userMiddleware } = require('../Middlewares/User');
const { updateDateMiddleware } = require('../Middlewares/UpdateDate');

const todoRouter = express.Router();

todoRouter.route('/')
    .get(authenticateUser, todoController().getAllAsync);

todoRouter.route('/:id')
    .get(authenticateUser, validateId, todoMiddleware().todoExistsById, todoController().getByIdAsync)
    .post(authenticateUser, validateId, userMiddleware().userExistsById, todoController().createAsync)
    .patch(authenticateUser, validateId, todoMiddleware().todoExistsById, updateDateMiddleware, todoController().updateAsync)
    .delete(authenticateUser, validateId, todoMiddleware().todoExistsById, todoController().deleteAsync);

module.exports = { todoRouter };
