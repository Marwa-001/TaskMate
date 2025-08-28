const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    createdAt: {
        type:String,
        default:Date.now()
    },
    duedate: String,
    status:{
        type: String,
        default: "Pending"
    },
    priority: String
})

module.exports = mongoose.model("todo", todoSchema)