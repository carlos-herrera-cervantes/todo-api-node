'use strict';

const { getPaginateObject } = require('./Paginate');
const { STATUS_CODES } = require('../Constants/StatusCodes');

const ok = (status, data, response, query = {}, totalDocuments = 0) => {
    const { paginate } = query;
    
    if (paginate && paginate.parseBoolean()) {
        const paginate = getPaginateObject(query, totalDocuments);
        return response.status(STATUS_CODES.OK).send({ status, data, paginate });
    }

    return response.status(STATUS_CODES.OK).send({ status, data });
}

const created = (status, data, response) => response.status(STATUS_CODES.CREATED).send({ status, data });

const noContent = (status, response) => response.status(STATUS_CODES.NO_CONTENT).send({ status, data: {} });

const badRequest = (status, response, key) => response.status(STATUS_CODES.BAD_REQUEST).send({ status, message: response.__(key) });

const notFound = (status, response, key) => response.status(STATUS_CODES.NOT_FOUND).send({ status, message: response.__(key) });

const unauthorize = (status, response, key) => response.status(STATUS_CODES.UNAUTHORIZE).send({ status, message: response.__(key) });

const internalServerError = (status, response, message) => response.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ status, message: response.__(message) });

module.exports = {
    ok,
    created,
    noContent,
    badRequest,
    notFound,
    unauthorize,
    internalServerError
};