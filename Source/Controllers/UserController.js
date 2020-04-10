'use strict';

const bcrypt = require('bcrypt');

const { userRepository } = require('../Repositories/UserRepository.js');
const { requestExtensions } = require('../Extensions/RequestExtensions');

const getAllAsync = async (request, response) => {
  try {
    let object = requestExtensions().createObjectQuery(request.query);
    let users = await userRepository().getAllAsync(object);

    return response.status(200).send(users);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const getByIdAsync = async (request, response) => {
  try {
    let user = await userRepository().getByIdAsync(request.params.id);

    return response.status(200).send(user);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const createAsync = async (request, response) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);

    let user = await userRepository().createAsync(request.body);

    return response.status(200).send(user);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const updateAsync = async (request, response) => {
  try {
    let user = {
      id: request.params.id,
      metadata: request.body
    };

    let updatedUser = await userRepository().updateAsync(user);

    return response.status(201).send(updatedUser);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const deleteAsync = async (request, response) => {
  try {
    let id = request.params.id;

    await userRepository().deleteAsync(id);

    return response.status(204).send();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const userController = () => ({ getAllAsync, getByIdAsync, createAsync, updateAsync, deleteAsync });

module.exports = { userController };
