'use strict';

const { User } = require('../Models/User');

const getAllAsync = async ({ criteria, page, pageSize, sort, relation }) => 
  await User
    .find(criteria ? criteria : {})
    .populate(relation[0])
    .skip(page)
    .limit(pageSize)
    .sort(sort ? sort : {});

const getByIdAsync = async id => await User.findById(id);

const getOneAsync = async ({ criteria }) => await User.findOne(criteria ? criteria : {});

const createAsync = async user => { 
  const userCreated = await User.create(user); 
  return userCreated.save(); 
}

const updateAsync = async user => await User.findOneAndUpdate({ _id: user.id }, { $set: user.metadata }, { new: true });

const deleteAsync = async id => await User.findOneAndRemove({ _id: id });

const deleteTodoAsync = async identifiers => {
  const user = await User.findById(identifiers.user);
  const metadata = { todos: user.todos.filter(element => element != identifiers.todo) }

  return await updateAsync({ id: user._id, metadata });
}

const count = async ({ criteria }) => await User.countDocuments(criteria ? criteria : {});

const userRepository = () => ({ 
  getAllAsync, 
  getByIdAsync, 
  getOneAsync, 
  createAsync, 
  updateAsync, 
  deleteAsync, 
  deleteTodoAsync, 
  count 
});

module.exports = { userRepository };
