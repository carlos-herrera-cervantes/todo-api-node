'use strict';

const { handleExceptionAsync } = require('../Extensions/Error');
const { runValidateAutenticationAsync } = require('../Tasks/LoginTasks');

const authenticateUser = async (request, response, next) => await handleExceptionAsync(runValidateAutenticationAsync, request, response, next);

module.exports = { authenticateUser };
