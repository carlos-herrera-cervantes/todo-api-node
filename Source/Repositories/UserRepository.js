'use strict';

const { User } = require('../Models/User');

const getAllAsync = async () => await User.find();

const getByIdAsync = async id => await User.findById(id);

const getByEmailAsync = async email => await User.findOne({ email });

const createAsync = async user => { let userCreated = await User.create(user); return userCreated.save(); }

const updateAsync = async user => await User.findOneAndUpdate({ _id: user.id }, { $set: user.metadata }, { new: true });

const deleteAsync = async id => await User.findOneAndRemove({ _id: id });

const userRepository = () => ({ getAllAsync, getByIdAsync, getByEmailAsync, createAsync, updateAsync, deleteAsync });

module.exports = { userRepository };
