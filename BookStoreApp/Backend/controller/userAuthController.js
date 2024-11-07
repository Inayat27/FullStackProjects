const zod = require("zod");

const User = require("../Model/user");
const userValidationSchema = require("../Validation/userValidation");
const jwt = require("jsonwebtoken");

// conteroller used to register the user
const register = async (req, res) => {
  const userPayload = req.body;
  const parsedPayload = userValidationSchema.safeParse(userPayload);
  if (!parsedPayload.success) {
    return res.json({
      msg: "Invalid Input",
    });
  }

  const iscreaetd = await User.create({
    name: userPayload.name,
    email: userPayload.email,
    password: userPayload.password,
  });

  if (!iscreaetd) {
    return res.json({
      msg: "Something Unexpected Happen",
    });
  }

  res.json({
    msg: "User created Successfully",
  });
};

// login user with register email and password

const login = async (req, res) => {
  const loginCredentials = req.body; // {email,pass}

  const isRegisteredUser = await User.findOne({
    email: loginCredentials.email,
  });

  if (!isRegisteredUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await isRegisteredUser.comparePassword(
    loginCredentials.password
  );

  if (!passwordMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = await jwt.sign(
    { userId: isRegisteredUser._id, email: loginCredentials.email },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );

  res.cookie('token',token).json(isRegisteredUser)
};

module.exports = { register, login };
