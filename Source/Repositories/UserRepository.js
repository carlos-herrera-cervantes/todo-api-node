'use strict';

const { User } = require('../Models/User');

const getAllAsync = async object => await User.find(object.criteria ? object.criteria : {}).skip(object.page).limit(object.pageSize).sort(object.sort ? object.sort : {});

const getByIdAsync = async id => await User.findById(id);

const getOneAsync = async object => await User.findOne(object.criteria ? object.criteria : {});

const createAsync = async user => { let userCreated = await User.create(user); return userCreated.save(); }

const updateAsync = async user => await User.findOneAndUpdate({ _id: user.id }, { $set: user.metadata }, { new: true });

const deleteAsync = async id => await User.findOneAndRemove({ _id: id });

const deleteTodoAsync = async identifiers => {
  let user = await User.findById(identifiers.user);
  let metadata = { todos: user.todos.filter(element => element != identifiers.todo) }

  return await updateAsync({ id: user._id, metadata });
}

const count = async () => await User.countDocuments();

const userRepository = () => ({ getAllAsync, getByIdAsync, getOneAsync, createAsync, updateAsync, deleteAsync, deleteTodoAsync, count });

module.exports = { userRepository };
