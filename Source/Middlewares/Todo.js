'use strict';

const { todoRepository } = require('../Repositories/TodoRepository');

const todoExistsById = async (request, response, next) => {
  try {
    const todo = todoRepository().getByIdAsync(request.params.id);

    if (!todo) { return response.status(404).send({ status: false, message: response.__('TodoNotFound') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const todoMiddleware = () => ({ todoExistsById });

module.exports = { todoMiddleware };
