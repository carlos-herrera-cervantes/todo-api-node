'use strict';

const { handleExceptionAsync } = require('../Extensions/Error');
const { runLogin } = require('../Tasks/LoginTasks');

const login = async (request, response) => await handleExceptionAsync(runLogin, request, response);

module.exports = { login };