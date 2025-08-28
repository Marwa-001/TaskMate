const express = require('express')
const router = express.Router()
const todoModel = require('../models/todo-model')

router.get('/', async (req, res) => {
    let todos = await todoModel.find().populate("user").select("--password")
    res.send(todos)
})

router.post('/create', async (req, res) => {
    let {title, content, priority} = req.body

    let todo = await todoModel.create({
        title, content, priority
    })
    // add todo in user's todos and then save it
    res.send(todo)
})

module.exports = router