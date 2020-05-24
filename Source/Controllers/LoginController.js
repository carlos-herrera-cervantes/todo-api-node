'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userRepository } = require('../Repositories/UserRepository.js');
const { requestExtensions } = require('../Extensions/RequestExtensions');

const login = async (request, response) => {
  try {
    const object = requestExtensions().createObjectQuery({ email: request.body.email });
    const user = await userRepository().getOneAsync(object);
    const isValidPassword = await bcrypt.compare(request.body.password, user.password);

    if (!isValidPassword) { return response.status(400).send({ status: false, message: response.__('InvalidCredentials') }); }

    const token = jwt.sign({ email: request.body.email }, process.env.SECRET_KEY);

    return response.status(200).send({ status: true, data: { token } });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const loginController = () => ({ login });

module.exports = { loginController };
