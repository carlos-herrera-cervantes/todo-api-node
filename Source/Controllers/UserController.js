'use strict';

const { handleExceptionAsync } = require('../Extensions/Error');
const { runGetAllAsync, runGetByIdAsync, runCreateAsync, runUpdateAsync, runDeleteAsync } = require('../Tasks/UserTasks');

const getAllAsync = async (request, response) => await handleExceptionAsync(runGetAllAsync, request, response);

const getByIdAsync = async (request, response) => await handleExceptionAsync(runGetByIdAsync, request, response);

const createAsync = async (request, response) => await handleExceptionAsync(runCreateAsync, request, response);

const updateAsync = async (request, response) => await handleExceptionAsync(runUpdateAsync, request, response);

const deleteAsync = async (request, response) => await handleExceptionAsync(runDeleteAsync, request, response);

module.exports = {
  getAllAsync,
  getByIdAsync,
  createAsync,
  updateAsync,
  deleteAsync
};
