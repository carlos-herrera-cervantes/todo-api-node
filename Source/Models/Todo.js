const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
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
        type: Number,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

let Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo }