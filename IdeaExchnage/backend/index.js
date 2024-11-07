const express = require('express');
require('dotenv').config();
const rootRoutes = require('./routes')

const app = express();

app.use(express.json())

app.use('/api/v1/',rootRoutes)

app.listen(process.env.PORT,() =>{
    console.log(`server is running on ${process.env.PORT}`);
})