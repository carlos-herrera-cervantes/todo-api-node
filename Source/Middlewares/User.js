'use strict';

const { handleExceptionAsync } = require('../Extensions/Error');
const { runValidateUserExistsById, runValidateUserExistsByEmail } = require('../Tasks/UserTasks');

const userExistsById = async (request, response, next) => await handleExceptionAsync(runValidateUserExistsById, request, response, next);

const userExistsByEmail = async (request, response, next) => await handleExceptionAsync(runValidateUserExistsByEmail, request, response, next);

module.exports = { userExistsById, userExistsByEmail };
