const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,  // <-- FIXED (don't call Date.now())
  },
  duedate: String,
  status: {
    type: String,
    default: "Pending",
  },
  priority: String,
  category: String,
  collaborators: [{ // 👈 New field for collaborators
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
});

module.exports = mongoose.model("todo", todoSchema)