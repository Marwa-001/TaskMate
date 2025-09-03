const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user-model')
const userRouter = require('./routes/userRouter')
const todosRouter = require('./routes/index')
const db = require('./config/mongoose-collection')
const cookieParser = require('cookie-parser')
const cors = require("cors");
// 🔔 Start the notification service
require('./notificationService');

app.use(cors({
  origin: "http://localhost:3001",  // your React dev server
  credentials: true                 // allow cookies/headers
}));

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', async (req, res) => {
    let users = await userModel.find()
    res.send(users)
})

app.use('/api/user', userRouter)
app.use("/api/todos", todosRouter);

app.listen(3000)