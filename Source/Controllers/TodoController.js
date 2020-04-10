'use strict';

const { todoRepository } = require('../Repositories/TodoRepository');
const { userRepository } = require('../Repositories/UserRepository');
const { requestExtensions } = require('../Extensions/RequestExtensions');

const getAllAsync = async (request, response) => {
  try {
    let object = requestExtensions().createObjectQuery(request.query);
    let todos = await todoRepository().getAllAsync(object);

    return response.status(200).send(todos);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const getByIdAsync = async (request, response) => {
  try {
    let todo = await todoRepository().getByIdAsync(request.params.id);

    return response.status(200).send(todo);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const getByUserIdAsync = async (request, response) => {
  try {
    request.query.user = request.params.id;
    let object = requestExtensions().createObjectQuery(request.query);
    let todos = await todoRepository().getAllAsync(object);

    return response.status(200).send(todos);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const createAsync = async (request, response) => {
  try {
    request.body.user = request.params.id;

    let todo = await todoRepository().createAsync(request.body);
    let user = await userRepository().getByIdAsync(request.params.id);

    user.todos.push(todo);
    await userRepository().updateAsync({ id: request.params.id, metadata: user });

    return response.status(200).send(todo);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const updateAsync = async (request, response) => {
  try {
    let todo = {
      id: request.params.id,
      metadata: request.body
    };

    let updatedTodo = await todoRepository().updateAsync(todo);

    return response.status(201).send(updatedTodo);
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const deleteAsync = async (request, response) => {
  try {
    let todo = await todoRepository().getByIdAsync(request.params.id);

    await userRepository().deleteTodoAsync({ user: todo.user, todo: request.params.id });
    await todoRepository().deleteAsync(request.params.id);

    return response.status(204).send();
  }
  catch (error) {
    return response.status(500).send(error);
  }
}

const todoController = () => ({ getAllAsync, getByIdAsync, getByUserIdAsync, createAsync, updateAsync, deleteAsync });

module.exports = { todoController };
