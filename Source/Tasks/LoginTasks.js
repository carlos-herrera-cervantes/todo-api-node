'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getOneAsync } = require('../Repositories/UserRepository.js');
const { createAsync } = require('../Repositories/AccessTokenRepository');
const { getMongoFilter } = require('../Extensions/Request');
const { badRequest, ok, unauthorize } = require('../Extensions/Response');

const runLogin = async (request, response) => {
    const { body: { email, password } } = request;
    const mongoFilter = getMongoFilter({ email });
    const user = await getOneAsync(mongoFilter);
    const isValidPassword = await bcrypt.compare(password, user.password);
  
    if (!isValidPassword) { return badRequest(false, response, 'InvalidCredentials'); }
  
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
  
    await createAsync({
      token,
      email,
      role: user.role,
      userId: user._id
    });
  
    return ok(true, { token }, response);
  }

  const runValidateAutenticationAsync = async (request, response, next) => {
    const { headers: { authorization } } = request;

    if (!authorization) { return unauthorize(false, response, 'NotHavePermissions'); }

    const isTokenValid = await jwt.verify(authorization.split(' ').pop(), process.env.SECRET_KEY);

    if (!isTokenValid) { return unauthorize(false, response, 'InvalidToken'); }

    next();
  }

  module.exports = { runLogin, runValidateAutenticationAsync };