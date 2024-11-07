const express = require('express');
require('dotenv').config();
const app = express();
const rootRoutes = require('./routes/index')
const cors = require('cors')
app.use(express.json());

app.use(cors())
app.use("/api/v1",rootRoutes)



app.listen(process.env.PORT,(req,res) =>
{
    console.log(`server running on port ${process.env.PORT}`);
})