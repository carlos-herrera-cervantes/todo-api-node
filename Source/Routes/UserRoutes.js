'use strict';

const express = require('express');
const { getAllAsync, createAsync, getByIdAsync, updateAsync, deleteAsync } = require('../Controllers/UserController');
const { getByUserIdAsync } = require('../Controllers/TodoController');
const { login } = require('../Controllers/LoginController');
const { authenticateUser } = require('../Middlewares/Authentication');
const { validateId, validatePagination, validateRole } = require('../Middlewares/Validator');
const { userExistsById, userExistsByEmail } = require('../Middlewares/User');
const { updateDateMiddleware } = require('../Middlewares/UpdateDate');

const userRouter = express.Router();

userRouter.route('/')
    .get(
        authenticateUser,
        validateRole('Admin', 'Client'),
        validatePagination,
        getAllAsync
    )
    .post(
        authenticateUser,
        createAsync
    );

userRouter.route('/:id')
    .get(
        authenticateUser,
        validateRole('Admin', 'Client'),
        validateId,
        userExistsById, 
        getByIdAsync
    )
    .patch(
        authenticateUser, 
        validateId,
        validateRole('Admin', 'Client'),
        userExistsById, 
        updateDateMiddleware, 
        updateAsync
    )
    .delete(
        authenticateUser, 
        validateId,
        validateRole('Admin', 'Client'),
        userExistsById, 
        deleteAsync
    );

userRouter.route('/:id/todos')
    .get(
        authenticateUser, 
        validateRole('Admin', 'Client'),
        validateId, 
        validatePagination, 
        userExistsById, 
        getByUserIdAsync
    );

userRouter.route('/login')
    .post(
        userExistsByEmail,
        login
    );

module.exports = { userRouter };
