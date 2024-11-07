const {
  validateUserSchema,
  validateUserLoginSchema,
} = require("../Validation/userValidate");
const { user } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// // Register a new user
const register = async (req, res,next) => {
  const userData = req.body;
  const parsedUserData = validateUserSchema.safeParse(userData);

  if (!parsedUserData.success) {
     res.json({
      msg: "Wrong Input",
    });
    return
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    user
      .create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      })
      .then(() => {
        res.json({
          msg: "Registration Successfull",
        });
        return
      });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user

const login = async (req, res) => {
    
    try {
      const loginCredential = req.body;

      const parsedLogin = validateUserLoginSchema.safeParse(loginCredential);
 
      if (!parsedLogin.success)
        return res.json({
          msg: "Invalid Input",
        });
    const userFetched = await user.findOne({ email: loginCredential.email });
    if (!userFetched) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await userFetched.comparePassword(loginCredential.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign(
      { userId: userFetched._id },
      process.env.SECRET_KEY,
      { expiresIn: "1 hour" }
    );

    res.json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
