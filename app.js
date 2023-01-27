const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler.js')

// middleware
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)

// handle 404
app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Lift off! .... on port ${port}`))
  } catch (error) {
    console.log('Whoopsie!', error)
  }
}

start()
