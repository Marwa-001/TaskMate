const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user-model')
const userRouter = require('./routes/userRouter')
const todosRouter = require('./routes/index')
const db = require('./config/mongoose-collection')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', async (req, res) => {
    let users = await userModel.find()
    res.send(users)
})

app.use('/user', userRouter)
app.use('/todos', todosRouter)

app.listen(3000)