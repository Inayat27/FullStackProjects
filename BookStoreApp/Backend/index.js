const express = require('express');
require('dotenv').config()
const userAuthRoute = require('./routes/userAuthRoute');
const userRoute = require('./routes/user')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.port
const app = express()
app.use(express.urlencoded({extended:false}))

app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use(express.json())


app.use('/auth',userAuthRoute);
app.use('/user',userRoute);


app.use((err,req,res,next) =>
{
    return res.status(500).send('An Internal server error Occured')
})
app.listen(port,() =>
{
    console.log(`server running on ${port}`);
})