const express = require('express');

const dotenv = require('dotenv').config();
const cors = require('cors')

const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const mongoose = require('mongoose');
app.use('/',require('./routes/authRoutes'))

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connection established'))
.catch(() => console.log(error))





const port = 3000
app.listen(port,() => console.log(`Server is Running on ${port}`))