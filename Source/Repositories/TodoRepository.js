'use strict';

const { Todo } = require('../Models/Todo');

const getAllAsync = async ({ criteria, page, pageSize, sort, relation }) =>
    await Todo
        .find(criteria ? criteria : {})
        .populate(relation[0])
        .skip(page)
        .limit(pageSize)
        .sort(sort ? sort : {});

const getByIdAsync = async id => await Todo.findById(id);

const createAsync = async todo => { 
    const todoCreated = await Todo.create(todo); 
    return await todoCreated.save(); 
}

const updateAsync = async todo => await Todo.findOneAndUpdate({ _id: todo.id }, { $set: todo.metadata }, { new: true });

const deleteAsync = async id => await Todo.deleteOne({ _id: id });

const deleteManyAsync = async id => await Todo.deleteMany({ _id: id });

const count = async ({ criteria }) => await Todo.countDocuments(criteria ? criteria : {});

const todoRepository = () => ({ 
    getAllAsync, 
    getByIdAsync, 
    createAsync, 
    updateAsync, 
    deleteAsync, 
    deleteManyAsync, 
    count 
});

module.exports = { todoRepository };
