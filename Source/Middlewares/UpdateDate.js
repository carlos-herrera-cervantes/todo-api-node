'use strict';

const moment = require('moment');

const updateDateMiddleware = (request, response, next) => {
  try {
    request.body.updatedAt = moment().utc().format('YYYY-MM-DDTHH:mm:ss');

    return next();
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

module.exports = { updateDateMiddleware };
