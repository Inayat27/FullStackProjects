
const jwt = require('jsonwebtoken');
const authenticated = async (req,res,next) =>
{
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.json({
            msg:'Please Provide Token'
        });
    }

    const decodeToken = await jwt.verify(token,process.env.JWT_SECRET);
    if (!decodeToken) {
        return res.json({
            msg:'Invalid Token'
        });
    }
    req.user =decodeToken;
    
    next();
}


module.exports = {authenticated}