const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("request is working")
})

app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)  // Direct to food Routes
module.exports = app;

