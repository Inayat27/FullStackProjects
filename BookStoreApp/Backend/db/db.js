const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        Required:true
    },
    password :String
})



const bookSchema = mongoose.Schema({
    name:String,
    author:String,
    description:String,
    price:Number,
    image:String,
    isavailable:Boolean
})


module.exports={userSchema,bookSchema};