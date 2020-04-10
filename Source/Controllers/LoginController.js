'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userRepository } = require('../Repositories/UserRepository.js');
const { requestExtensions } = require('../Extensions/RequestExtensions');

const login = async (request, response) => {
  try {
    let object = requestExtensions().createObjectQuery({ email: request.body.email });
    let user = await userRepository().getOneAsync(object);
    let isValidPassword = await bcrypt.compare(request.body.password, user.password);

    if (!isValidPassword) { return response.status(400).send({ message: response.__('InvalidCredentials') }); }

    let token = jwt.sign({ email: request.body.email }, process.env.SECRET_KEY);

    return response.status(200).send({ token });
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const loginController = () => ({ login });

module.exports = { loginController };
