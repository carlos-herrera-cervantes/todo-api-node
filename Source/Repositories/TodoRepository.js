'use strict';

const { Todo } = require('../Models/Todo');

class TodoRepository {
    constructor () { }

    async getAllAsync () {
        let todos = await Todo.find();

        return todos;
    }

    async getByIdAsync (id) {
        let todo = await Todo.findById(id);

        return todo;
    }

    async createAsync (todo) {
        let todoObject = await Todo.create(todo);

        await todoObject.save();

        return todoObject;
    }

    async updateAsync (id, todoUpdated) { await Todo.findOneAndUpdate({ _id: id }, { $set: todoUpdated }, { new: true }); }

    async deleteAsync (id) { await Todo.findOneAndDelete({ _id: id }); }

    async deleteManyAsync (id) { await Todo.deleteMany({ _id: id }); }
}

module.exports = { TodoRepository }