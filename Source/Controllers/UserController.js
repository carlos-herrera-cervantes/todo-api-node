'use strict';

const bcrypt = require('bcrypt');

const { userRepository } = require('../Repositories/UserRepository.js');
const { requestExtensions } = require('../Extensions/RequestExtensions');
const { getPaginateProperty } = require('../Extensions/ResponseExtensions');

const getAllAsync = async (request, response) => {
  try {
    const object = requestExtensions().createObjectQuery(request.query);
    const users = await userRepository().getAllAsync(object);
    const totalDocuments = await userRepository().count();
    const paginate = getPaginateProperty({ query: request.query, documents: users, totalDocuments });

    return response.status(200).send({ status: true, data: users, paginate });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const getByIdAsync = async (request, response) => {
  try {
    const user = await userRepository().getByIdAsync(request.params.id);

    return response.status(200).send({ status: true, data: user });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const createAsync = async (request, response) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);

    const user = await userRepository().createAsync(request.body);

    return response.status(200).send({ status: true, data: user });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const updateAsync = async (request, response) => {
  try {
    const user = {
      id: request.params.id,
      metadata: request.body
    };

    const updatedUser = await userRepository().updateAsync(user);

    return response.status(201).send({ status: true, data: updatedUser });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const deleteAsync = async (request, response) => {
  try {
    const id = request.params.id;

    await userRepository().deleteAsync(id);

    return response.status(204).send({ status: true, data: {}});
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const userController = () => ({ getAllAsync, getByIdAsync, createAsync, updateAsync, deleteAsync });

module.exports = { userController };
