const express = require('express')
const connectToMongo = require('./config/db');
const userRouter = require('./routes/auth.route');
const todoRoute = require('./routes/todo.route');
require('dotenv').config()
var cors = require('cors')
const app = express()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/api/todo', todoRoute)
app.use('/api/user', userRouter)

app.get('/api/',(req,res)=>{
    res.send('Welcome Mr. Bhupender')
})

app.listen(PORT, async()=>{
    try {
        await connectToMongo();
        console.log(`Todo_backend @ port ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})