const mongoose = require('mongoose');
const moment = require('moment');
const { roles } = require('../Constants/Roles');
const { Todo } = require('../Models/Todo');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 18
    },
    role: {
        type: String,
        default: roles.client
    },
    createdAt: {
        type: Date,
        default: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    },
    updatedAt: {
        type: Date,
        default: moment().utc().format('YYYY-MM-DDTHH:mm:ss')
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
});

UserSchema.pre('deleteOne', async function(next) {
    await Todo.deleteMany({ user: this._conditions._id });
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = { User }
