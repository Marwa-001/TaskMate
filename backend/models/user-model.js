const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "todo"
    }]
})

module.exports = mongoose.model("user", userSchema)