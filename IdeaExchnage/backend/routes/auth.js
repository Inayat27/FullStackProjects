const express = require("express");
const mongoose = require('mongoose');
const { signpValidate, loginValidate } = require("../validation/authValidation");
const { user } = require("../db/userdb");

const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = signpValidate.safeParse(payload);

    if (!parsedPayload.success) {
      return res.status(400).json({
        errors: parsedPayload.error,
      });
    }

    const isAlreadyExists = await user.findOne({ email: payload.email });
    if (isAlreadyExists) {
      return res.status(409).json({
        msg: "User already exists. Please try to login.",
      });
    }

    const newUser = await user.create({
      fullname: payload.fullname,
      email: payload.email,
      password: payload.password,
    });

    const token = jwt.sign({ email: payload.email }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.error("Error while SignUp:", error);
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return res.status(404).json({ msg: "User not found." });
    } else if (error instanceof mongoose.Error) {
      return res.status(500).json({ msg: "Database error." });
    } else {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});


// initializeApp(config)
//     // Initialize Cloud Storage and get a reference to the service
//     const storage = getStorage();
//     // Setting up multer as a middleware to grab photo uploads
//     const upload = multer({ storage: multer.memoryStorage()});


router.post("/signin", async (req, res) => {
  try {
    const payload = req.body;
    const parsedPayload = loginValidate.safeParse(payload);

    if (!parsedPayload.success) {
      return res.status(400).json({
        errors: parsedPayload.error,
      });
    }

    const existingUser = await user.findOne({ email: payload.email });
    if (!existingUser) {
      return res.status(404).json({
        msg: "User doesn't exist. Please try to signup.",
      });
    }

    // password Validation
    const isCorrectPassword  = await existingUser.comparePassword(payload.password)

    if(!isCorrectPassword)
    {
      return res.status(403).json({
        msg: "Password Doesn't Match , please check!",
      });
    }

    const token = jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    if (!token) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }

  // storing the images 
//   const DateTime  = getDateTime();
//   const storageRef = ref(storage, `files/${req.file.originalname + "       " +DateTime}`);
//   // Create file metadata including the content type
//   const metadata = {
//     contentType: req.file.mimetype,
// };

// // Upload the file in the bucket storage
// const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
// //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel




    return res.json({ token });
  } catch (error) {
    console.error("Error while SignIn:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});




module.exports = router;
