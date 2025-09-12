const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user-model')
const userRouter = require('./routes/userRouter')
const todosRouter = require('./routes/index')
const db = require('./mongoose-collection')
const cookieParser = require('cookie-parser')
const cors = require("cors");
// 🔔 Start the notification service
// require('./notificationService');

// ✅ Add your live Vercel frontend URL here
const allowedOrigins = [
  'http://localhost:3001',
  'https://task-mate-frontend-beta.vercel.app'
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Add a health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.status(200).send('Backend is running ✅');
});


app.use('/api/user', userRouter)
app.use("/api/todos", todosRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

