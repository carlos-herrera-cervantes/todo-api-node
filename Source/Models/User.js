const mongoose = require('mongoose');
const moment = require('moment');

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

const User = mongoose.model('User', UserSchema);

module.exports = { User }
