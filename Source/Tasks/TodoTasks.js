'use strict';

const { getAllAsync, getByIdAsync, createAsync, updateAsync, deleteAsync, countAsync } = require('../Repositories/TodoRepository');
const { getMongoFilter } = require('../Extensions/Request');
const { ok, created, noContent, notFound } = require('../Extensions/Response');

const runGetAllAsync = async (request, response) => {
    const { query } = request;
    const mongoFilter = getMongoFilter(query);
    const todos = await getAllAsync(mongoFilter);
    const totalDocuments = await countAsync(mongoFilter);

    return ok(true, todos, response, query, totalDocuments);
}

const runGetByIdAsync = async (request, response) => {
    const { params: { id } } = request;
    const todo = await getByIdAsync(id);
    return ok(true, todo, response);
}

const runGetByUserIdAsync = async (request, response) => {
    const { query, params: { id } } = request;
    query.user = id
    const mongoFilter = getMongoFilter(query);
    const todos = await getAllAsync(mongoFilter);
    const totalDocuments = await countAsync(mongoFilter);
    
    return ok(true, todos, response, query, totalDocuments);
}

const runCreateAsync = async (request, response) => {
    const { body, params: { id } } = request;
    body.user = id;
    const todo = await createAsync(body);
    return created(true, todo, response);
}

const runUpdateAsync = async (request, response) => {
    const { params: { id }, body } = request;
    const todo = {
      id,
      metadata: body
    };
    const updatedTodo = await updateAsync(todo);
    return created(true, updatedTodo, response);
}

const runDeleteAsync = async (request, response) => {
    const { params: { id } } = request;
    await deleteAsync(id);
    return noContent(true, response);
}

const runValidateTodoExistsByIdAsync = async (request, response, next) => {
    const { params: { id } } = request;
    const todo = await getByIdAsync(id);

    if (!todo) { return notFound(false, response, 'TodoNotFound'); }

    next();
}

module.exports = {
    runGetAllAsync,
    runGetByIdAsync,
    runGetByUserIdAsync,
    runCreateAsync,
    runUpdateAsync,
    runDeleteAsync,
    runValidateTodoExistsByIdAsync
}