
const jwt = require('jsonwebtoken');
const { user } = require('../db/db');
// require('dotenv').config()

const authenticate = async (req,res,next) =>
{
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY)

       
        const userData = await user.findOne({_id:decodedToken.userId})
     
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
          }

          req.userData = userData;
          next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }


}


module.exports= authenticate