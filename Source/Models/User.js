const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
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
    todos: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Todo' 
        }
    ]
});

let User = mongoose.model('User', UserSchema);

module.exports = { User }