'use strict';

const moment = require('moment');
const { ObjectID } = require('mongodb');
const { badRequest } = require('../Extensions/Response');

const runUpdateDate = (request, response, next) => {
    const { body } = request;
    body.updatedAt = moment().utc().format('YYYY-MM-DDTHH:mm:ss');

    next();
}

const runValidateId = (request, response, next) => {
    const { params: { id } } = request;

    if (!ObjectID.isValid(id)) { return badRequest(false, response, 'InvalidObjectId'); }

    next();
}

const runValidatePagination = (request, response, next) => {
    const { query: { paginate, page, pageSize } } = request;

    if (!paginate) {
      return next();
    }

    const isNotHavePages = !page || !pageSize;
    const invalidPaginateParams = paginate.parseBoolean() && isNotHavePages

    if (invalidPaginateParams) {
      return badRequest(false, response, 'InvalidPaginateParams');
    }

    const isInvalidPages = parseInt(page) <= 0 || parseInt(pageSize) <= 0 || parseInt(pageSize) > 100;

    if (isInvalidPages) { 
      return badRequest(false, response, 'InvalidPaginateNumbers');
    }

    next();
}

module.exports = { runUpdateDate, runValidateId, runValidatePagination };