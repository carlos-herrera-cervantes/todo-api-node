const mongoose = require('mongoose');
const moment = require('moment');
const { User } = require('./User');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    },
    updatedAt: {
        type: Date,
        default: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

TodoSchema.post('findOneAndDelete', async function(document) {
    const { todos } = await User.findById(document.userId);
    const cleanTodos = todos.filter(todo => todo.toString() !== document._id.toString());
    const request = { todos: cleanTodos };
    await User.findByIdAndUpdate({ _id: document.user }, { $set: request }, { new: true });
});

TodoSchema.post('save', async function(document) {
    const { userId } = document;
    const { todos } = await User.findById(userId);
    todos.push(document._id);
    const response = { todos };
    await User.findByIdAndUpdate({ _id: user }, { $set: response }, { new: true });
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };
