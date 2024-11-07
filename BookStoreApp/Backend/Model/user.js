const {userSchema} = require('../db/db')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



userSchema.pre('save', async function (next) {
    const u = this;
    if(!u.isModified('password')) return next();

    try {
     u.password = await bcrypt.hash(u.password , 11)
     next()
    } catch (error) {
        return next(error);
    }


})


userSchema.methods.comparePassword = async function(password)
{
    const res = await bcrypt.compare(password,this.password)
    return res;
}

const User = mongoose.model('user',userSchema);



module.exports = User;