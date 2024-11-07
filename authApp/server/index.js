const express = require('express');
require('dotenv').config();
const app = express();
const rootRouter = require('./routes/index')
const cors = require('cors');
app.use(express.json())
app.use(cors())


app.use('/api/v1',rootRouter)

app.listen(process.env.PORT,(req,res) =>
{
    console.log(`Server is Running on ${process.env.PORT}`);
})