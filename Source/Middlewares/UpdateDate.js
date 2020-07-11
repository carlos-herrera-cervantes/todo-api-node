'use strict';

const { handleException } = require('../Extensions/Error');
const { runUpdateDate } = require('../Tasks/GenericTasks');

const updateDateMiddleware = (request, response, next) => handleException(runUpdateDate, request, response, next);

module.exports = { updateDateMiddleware };
