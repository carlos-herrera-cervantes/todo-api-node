'use strict';

const { ObjectID } = require('mongodb');

const validateId = (request, response, next) => {
  try {
    let id = request.params.id;

    if (!ObjectID.isValid(id)) { return response.status(400).send({ message: response.__('InvalidObjectId') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const validatePagination = (request, response, next) => {
  try {
    let { paginate, page, pageSize } = request.query;
    
    if (!paginate) { [ request.query.page, request.query.pageSize ] = [ 0, 0 ]; return next(); }
    
    if (paginate.parseBoolean() && (!page || !pageSize)) { return response.status(400).send({ message: response.__('InvalidPaginateParams') }); }

    if (parseInt(page) <= 0 || parseInt(pageSize) <= 0 || parseInt(pageSize) > 100) { return response.status(400).send({ message: response.__('InvalidPaginateNumbers') }); }

    [ request.query.page, request.query.pageSize ] = [ parseInt(page), parseInt(pageSize) ];

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

module.exports = { validateId, validatePagination };
