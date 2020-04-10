'use strict';

const { userRepository } = require('../Repositories/UserRepository.js');

const userExistsById = async (request, response, next) => {
  try {
    let user = await userRepository().getByIdAsync(request.params.id);

    if (!user) { return response.status(404).send({ message: response.__('UserNotFound') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const userExistsByEmail = async (request, response, next) => {
  try {
    let user = await userRepository().getByEmailAsync(request.body.email);

    if (!user) { return response.status(404).send({ message: response.__('UserNotFound') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const userMiddleware = () => ({ userExistsById, userExistsByEmail });

module.exports = { userMiddleware };
