'use strict';

const { Todo } = require('../Models/Todo');

const getAllAsync = async mongoFilter =>
    await Todo
        .find(mongoFilter.criteria)
        .populate(mongoFilter.relation[0])
        .skip(mongoFilter.pagination.page)
        .limit(mongoFilter.pagination.pageSize)
        .sort(mongoFilter.sort);

const getByIdAsync = async id => await Todo.findById(id);

const createAsync = async todo => await Todo.create(todo); 

const updateAsync = async todo => await Todo.findOneAndUpdate({ _id: todo.id }, { $set: todo.metadata }, { new: true });

const deleteAsync = async id => await Todo.findOneAndDelete({ _id: id });

const deleteManyAsync = async mongoFilter => Todo.deleteMany(mongoFilter.criteria);

const countAsync = async mongoFilter => await Todo.countDocuments(mongoFilter.criteria);

module.exports = { 
    getAllAsync,
    getByIdAsync,
    createAsync,
    updateAsync,
    deleteAsync,
    countAsync,
    deleteManyAsync
};
