const jwt = require("jsonwebtoken");

const User = require("../Model/user");

const autheticate = async (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.token;



  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
 
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const compareUser = await User.findById(decodedToken.userId);

    if (!compareUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // res.json(compareUser)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = autheticate;
