const mongoose = require('mongoose')
const { Schema } = mongoose;
const todoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tag: {
        type: String,
        require: true,
        default: 'General'
    },
    completed: {
        type: Boolean,
        default: false
    },
    user_id: String
}, { timestamps: true })

const TodoModel = mongoose.model('todos', todoSchema)
module.exports = TodoModel;

