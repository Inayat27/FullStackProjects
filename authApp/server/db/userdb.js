const mongoose = require('mongoose');
require('dotenv').config()

const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI);


const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50

    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    }
})


userSchema.pre('save', async function (next) 
{
const user = this;
const saltRounds = 11;
console.log(user);
if (!user.isModified('password')) {
    return next();
  }

    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        next();
      } catch (error) {
        console.log('Error while hashing the password', error);
        next(error); // Pass the error to the next middleware
      }

})


userSchema.methods.comparePassword = async function(password)
{
    const response = await bcrypt.compare(password, this.password);
  return response;
}

const User = mongoose.model('user',userSchema);

module.exports = {User};