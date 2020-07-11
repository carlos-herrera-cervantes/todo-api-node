'use strict';

const { User } = require('../Models/User');

const getAllAsync = async mongoFilter => 
  await User
    .find(mongoFilter.criteria)
    .populate(mongoFilter.relation[0])
    .skip(mongoFilter.pagination.page)
    .limit(mongoFilter.pagination.pageSize)
    .sort(mongoFilter.sort);

const getByIdAsync = async id => await User.findById(id);

const getOneAsync = async mongoFilter => await User.findOne(mongoFilter.criteria);

const createAsync = async user => await User.create(user);

const updateAsync = async user => await User.findOneAndUpdate({ _id: user.id }, { $set: user.metadata }, { new: true });

const deleteAsync = async id => await User.findOneAndDelete({ _id: id });

const countAsync = async mongoFilter => await User.countDocuments(mongoFilter.criteria);

module.exports = { 
  getAllAsync,
  getByIdAsync,
  getOneAsync,
  createAsync,
  updateAsync,
  deleteAsync,
  countAsync
};
