'use strict';

const jwt = require('jsonwebtoken');

const authenticateUser = async (request, response, next) => {
  try {
    let token = request.headers.authorization;

    if (!token) { return response.status(401).send({ message: response.__('NotHavePermissions') }); }

    let tokenValid = await jwt.verify(token.split(' ').pop(), process.env.SECRET_KEY);

    if (!tokenValid) { return response.status(401).send({ message: response.__('InvalidToken') }); }

    return next();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

module.exports = { authenticateUser };
