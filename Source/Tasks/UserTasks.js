'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash');
const { getAllAsync, getByIdAsync, getOneAsync, createAsync, updateAsync, deleteAsync, countAsync } = require('../Repositories/UserRepository.js');
const accessTokenRepository = require('../Repositories/AccessTokenRepository');
const todoRepository = require('../Repositories/TodoRepository');
const { ok, created, noContent, notFound, badRequest } = require('../Extensions/Response');
const { getMongoFilter } = require('../Extensions/Request');

const runGetAllAsync = async (request, response) => {
    const { query } = request;
    const mongoFilter = getMongoFilter(query);
    const users = await getAllAsync(mongoFilter);
    const totalDocuments = await countAsync(mongoFilter);

    return ok(true, users, response, query, totalDocuments);
}

const runGetByIdAsync = async (request, response) => {
    const { params: { id } } = request;
    const user = await getByIdAsync(id);
    return ok(true, user, response);
}

const runCreateAsync = async (request, response) => {
    const { body } = request;
    body.password = await bcrypt.hash(body.password, 10);
    const user = await createAsync(body);
    return created(true, user, response);
}

const runUpdateAsync = async (request, response) => {
    const { params: { id }, body } = request;
    const user = {
      id,
      metadata: body
    };

    const updatedUser = await updateAsync(user);
    return created(true, updatedUser, response);
}

const runDeleteAsync = async (request, response) => {
    const { params: { id } } = request;
    const mongoFilter = getMongoFilter({ userId: id });
    await deleteAsync(id);
    await todoRepository.deleteManyAsync(mongoFilter);
    await accessTokenRepository.deleteManyAsync(mongoFilter);
    return noContent(true, response);
}

const runValidateUserExistsById = async (request, response, next) => {
    const { params: { id } } = request;
    const user = await getByIdAsync(id);

    if (!user) { return notFound(false, response, 'UserNotFound'); }

    next();
}

const runValidateUserExistsByEmail = async (request, response, next) => {
    const { body: { email } } = request;
    const object = getMongoFilter({ email });
    const user = await getOneAsync(object);

    if (!user) { return notFound(false, response, 'UserNotFound'); }

    next();
}

const runValidateRoleAsync = async (request, response, next, roles) => {
    const { headers: { authorization } } = request;
    const extractedToken = authorization.split(' ')[1];
    const token = await accessTokenRepository.getOneAsync({ criteria: { token: extractedToken } });
    
    if (roles.includes(_.get(token, 'role', ''))) {
      return next();
    }

    return badRequest(false, response, 'InvalidPermissions');
}

module.exports = { 
    runGetAllAsync, 
    runGetByIdAsync,
    runCreateAsync,
    runUpdateAsync,
    runDeleteAsync,
    runValidateUserExistsById,
    runValidateUserExistsByEmail,
    runValidateRoleAsync
};