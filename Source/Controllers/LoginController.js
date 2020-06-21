'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userRepository } = require('../Repositories/UserRepository.js');
const { accessTokenRepository } = require('../Repositories/AccessTokenRepository');
const { requestExtensions } = require('../Extensions/RequestExtensions');

const login = async (request, response) => {
  try {
    const { body: { email, password } } = request;
    const object = requestExtensions().createObjectQuery({ email });
    const user = await userRepository().getOneAsync(object);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) { return response.status(400).send({ status: false, message: response.__('InvalidCredentials') }); }

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

    await accessTokenRepository().createAsync({
      token,
      email,
      role: user.role,
      userId: user._id
    });

    return response.status(200).send({ status: true, data: { token } });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const loginController = () => ({ login });

module.exports = { loginController };
