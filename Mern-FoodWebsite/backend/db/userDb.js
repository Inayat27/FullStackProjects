const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        default:''
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})

const foodSchema = mongoose.Schema({
    dishname:{
        type:String,
        required:true,
        default:''
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    dishImage:String
})



const User = mongoose.model('USER',userSchema);
const Food = mongoose.model('Food',foodSchema);


module.exports = {User , Food};