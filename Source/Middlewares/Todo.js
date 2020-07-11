'use strict';

const { handleExceptionAsync } = require('../Extensions/Error');
const { runValidateTodoExistsByIdAsync } = require('../Tasks/TodoTasks');

const todoExistsById = async (request, response, next) => await handleExceptionAsync(runValidateTodoExistsByIdAsync, request, response, next);

module.exports = { todoExistsById };