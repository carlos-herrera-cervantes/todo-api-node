'use strict';

const { handleExceptionAsync } = require('../Extensions/Error');
const { runGetAllAsync, runGetByIdAsync, runGetByUserIdAsync, runCreateAsync, runUpdateAsync, runDeleteAsync } = require('../Tasks/TodoTasks');

const getAllAsync = async (request, response) => await handleExceptionAsync(runGetAllAsync, request, response);

const getByIdAsync = async (request, response) => await handleExceptionAsync(runGetByIdAsync, request, response);

const getByUserIdAsync = async (request, response) => await handleExceptionAsync(runGetByUserIdAsync, request, response);

const createAsync = async (request, response) => await handleExceptionAsync(runCreateAsync, request, response);

const updateAsync = async (request, response) => await handleExceptionAsync(runUpdateAsync, request, response);

const deleteAsync = async (request, response) => await handleExceptionAsync(runDeleteAsync, request, response);

module.exports = { 
  getAllAsync,
  getByIdAsync,
  getByUserIdAsync,
  createAsync,
  updateAsync,
  deleteAsync
};