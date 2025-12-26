const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const authRoutes = require('./routes/auth.routes')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin:"http://localhost:5173", // frontend / postman origin
  credentials: true               // ALLOW COOKIES
}));

app.get("/",(req,res)=>{
    res.send("request is working")
})

app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)  // Direct to food Routes
app.use('/api/food-partner',foodPartnerRoutes) // Direct to food partner routes
module.exports = app;

