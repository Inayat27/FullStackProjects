const jwt = require('jsonwebtoken')

const isAuthorized = (req,res,next) =>
{
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json({
            msg:'Token Required!'
        })
    }

    try {
        
        const decodedToken = jwt.verify(token,process.env.SECRET_KEY);
        if (!decodedToken) {
            return res.status(403).json({
                msg:'Invalid Token'
            })
        }
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error);
    }

}


module.exports= isAuthorized;