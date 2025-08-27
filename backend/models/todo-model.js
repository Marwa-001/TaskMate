const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: String,
    content: String,
    isCompleted: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: String,
    duedate: String,
    status:{
        type: String,
        default: "Pending"
    },
    priority: String
})

module.exports = mongoose.model("todo", todoSchema)