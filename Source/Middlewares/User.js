'use strict';

const { userRepository } = require('../Repositories/UserRepository.js');
const { requestExtensions } = require('../Extensions/RequestExtensions');

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
    let object = requestExtensions().createObjectQuery({ email: request.body.email });
    let user = await userRepository().getOneAsync(object);

    if (!user) { return response.status(404).send({ message: response.__('UserNotFound') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const userMiddleware = () => ({ userExistsById, userExistsByEmail });

module.exports = { userMiddleware };
