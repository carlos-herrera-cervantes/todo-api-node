'use strict';

const { todoRepository } = require('../Repositories/TodoRepository');
const { userRepository } = require('../Repositories/UserRepository');
const { requestExtensions } = require('../Extensions/RequestExtensions');
const { getPaginateProperty } = require('../Extensions/ResponseExtensions');

const getAllAsync = async (request, response) => {
  try {
    const object = requestExtensions().createObjectQuery(request.query);
    const todos = await todoRepository().getAllAsync(object);
    const totalDocuments = await todoRepository().count();
    const paginate = getPaginateProperty({ query: request.query, documents: todos, totalDocuments });

    return response.status(200).send({ status: true, data: todos, paginate });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const getByIdAsync = async (request, response) => {
  try {
    const todo = await todoRepository().getByIdAsync(request.params.id);

    return response.status(200).send({ status: true, data: todo });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const getByUserIdAsync = async (request, response) => {
  try {
    request.query.user = request.params.id;
    const object = requestExtensions().createObjectQuery(request.query);
    const todos = await todoRepository().getAllAsync(object);
    const totalDocuments = await todoRepository().count(object);
    const paginate = getPaginateProperty({ query: request.query, documents: todos, totalDocuments });

    return response.status(200).send({ status: true, data: todos, paginate });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const createAsync = async (request, response) => {
  try {
    request.body.user = request.params.id;

    const todo = await todoRepository().createAsync(request.body);
    const user = await userRepository().getByIdAsync(request.params.id);

    user.todos.push(todo);
    await userRepository().updateAsync({ id: request.params.id, metadata: user });

    return response.status(200).send({ status: true, data: todo });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const updateAsync = async (request, response) => {
  try {
    const todo = {
      id: request.params.id,
      metadata: request.body
    };

    const updatedTodo = await todoRepository().updateAsync(todo);

    return response.status(201).send({ status: true, data: updatedTodo });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const deleteAsync = async (request, response) => {
  try {
    const todo = await todoRepository().getByIdAsync(request.params.id);

    await userRepository().deleteTodoAsync({ user: todo.user, todo: request.params.id });
    await todoRepository().deleteAsync(request.params.id);

    return response.status(204).send({ status: true, data: {} });
  }
  catch (error) {
    return response.status(500).send({ status: false, message: error.message });
  }
}

const todoController = () => ({ getAllAsync, getByIdAsync, getByUserIdAsync, createAsync, updateAsync, deleteAsync });

module.exports = { todoController };
