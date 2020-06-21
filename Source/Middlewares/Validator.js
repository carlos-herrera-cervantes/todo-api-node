'use strict';

const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { accessTokenRepository } = require('../Repositories/AccessTokenRepository');

const validateId = (request, response, next) => {
  try {
    const id = request.params.id;

    if (!ObjectID.isValid(id)) { return response.status(400).send({ status: false, message: response.__('InvalidObjectId') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const validatePagination = (request, response, next) => {
  try {
    const { paginate, page, pageSize } = request.query;

    if (!paginate) {
      [ request.query.page, request.query.pageSize ] = [ 0, 0 ];
      return next();
    }

    const isNotHavePages = !page || !pageSize;

    if (paginate.parseBoolean() && isNotHavePages) {
      return response.status(400).send({ status: false, message: response.__('InvalidPaginateParams') });
    }

    const isInvalidPages = parseInt(page) <= 0 || parseInt(pageSize) <= 0 || parseInt(pageSize) > 100;

    if (isInvalidPages) { 
      return response.status(400).send({ status: false, message: response.__('InvalidPaginateNumbers') });
    }

    [ request.query.page, request.query.pageSize ] = [ parseInt(page), parseInt(pageSize) ];

    return next();
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const validateRole = (...roles) => async (request, response, next) => {
  try {
    const { headers: { authorization } } = request;
    const extractedToken = authorization.split(' ')[1];
    const token = await accessTokenRepository().getOneAsync({ criteria: { token: extractedToken } });
    
    if (roles.includes(_.get(token, 'role', ''))) {
      return next();
    }

    return response.status(401).send({ status: false, message: response.__('InvalidPermissions') });
  } 
  catch (error) {
      return response.status(500).send({ status: false, message: error.message });
  }
}

module.exports = { validateId, validatePagination, validateRole };
