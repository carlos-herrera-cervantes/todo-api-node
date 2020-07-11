'use strict';

const express = require('express');
const { getAllAsync, getByIdAsync, createAsync, updateAsync, deleteAsync } = require('../Controllers/TodoController');
const { authenticateUser } = require('../Middlewares/Authentication');
const { validateId, validatePagination, validateRole } = require('../Middlewares/Validator');
const { todoExistsById } = require('../Middlewares/Todo');
const { userExistsById } = require('../Middlewares/User');
const { updateDateMiddleware } = require('../Middlewares/UpdateDate');

const todoRouter = express.Router();

todoRouter.route('/')
    .get(
        authenticateUser, 
        validateRole('Admin', 'Client'), 
        validatePagination, 
        getAllAsync
    );

todoRouter.route('/:id')
    .get(
        authenticateUser, 
        validateRole('Admin', 'Client'),
        validateId, 
        todoExistsById, 
        getByIdAsync
    )
    .post(
        authenticateUser, 
        validateRole('Admin', 'Client'),
        validateId, 
        userExistsById, 
        createAsync
    )
    .patch(
        authenticateUser, 
        validateId, 
        validateRole('Admin', 'Client'),
        todoExistsById, 
        updateDateMiddleware, 
        updateAsync
    )
    .delete(
        authenticateUser, 
        validateId,
        validateRole('Admin', 'Client'),
        todoExistsById, 
        deleteAsync
    );

module.exports = { todoRouter };
