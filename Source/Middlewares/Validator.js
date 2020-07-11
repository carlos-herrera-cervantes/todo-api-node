'use strict';

const { handleException, handleExceptionAsync } = require('../Extensions/Error');
const { runValidateId, runValidatePagination } = require('../Tasks/GenericTasks');
const { runValidateRoleAsync } = require('../Tasks/UserTasks');

const validateId = (request, response, next) => handleException(runValidateId, request, response, next);

const validatePagination = (request, response, next) => handleException(runValidatePagination, request, response, next);

const validateRole = (...roles) => async (request, response, next) => await handleExceptionAsync(runValidateRoleAsync, request, response, next, roles);

module.exports = { validateId, validatePagination, validateRole };
