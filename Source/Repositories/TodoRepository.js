'use strict';

const { Todo } = require('../Models/Todo');

const getAllAsync = async object =>
    await Todo
        .find(object.criteria ? object.criteria : {})
        .skip(object.page)
        .limit(object.pageSize)
        .sort(object.sort ? object.sort : {});

const getByIdAsync = async id => await Todo.findById(id);

const createAsync = async todo => { let todoCreated = await Todo.create(todo); return await todoCreated.save(); }

const updateAsync = async todo => await Todo.findOneAndUpdate({ _id: todo.id }, { $set: todo.metadata }, { new: true });

const deleteAsync = async id => await Todo.findOneAndDelete({ _id: id });

const deleteManyAsync = async id => await Todo.deleteMany({ _id: id });

const count = async object => await Todo.countDocuments(object.criteria ? object.criteria : {});

const todoRepository = () => ({ getAllAsync, getByIdAsync, createAsync, updateAsync, deleteAsync, deleteManyAsync, count });

module.exports = { todoRepository };
