'use strict';

const { ObjectID } = require('mongodb');

const validateId = (request, response, next) => {
  try {
    let id = request.params.id;

    if (!ObjectID.isValid(id)) { return response.status(400).send({ message: 'El ID ingresado no es válido.' }); }

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

module.exports = { validateId };
