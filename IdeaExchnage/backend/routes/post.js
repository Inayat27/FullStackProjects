const express = require("express");

const router = express.Router();
const { authenticated } = require("../middleware/authenticatedUser");
const { postValidationSchema } = require("../validation/postValidaion");
const { Post } = require("../db/userdb");
const { initializeApp } = require("firebase/app");
const multer = require("multer");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../config/firebase.config");

initializeApp(config);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();
// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/add",
  authenticated,
  upload.single("filename"),
  async (req, res) => {
    const payload = req.body;
    const parsedPayload = postValidationSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return res.json({
        msg: "Invalid Input",
      });
    }

    try {
      const dateTime = giveCurrentDateTime();

      const storageRef = ref(
        storage,
        `Post/${req.file.originalname} + ${dateTime}`
      );
      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };
      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);
      if (!downloadURL) {
        return res.json({
          msg: "Something unexpected happen while uploading the post",
        });
      }

      await Post.create({
        title: payload.title,
        description: payload.description,
        imageUrl: downloadURL,
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
);

//get All post 

router.get('/posts',authenticated,async (req,res)  =>
{
    try {
      const posts =  await Post.find();
      res.json(posts)
        
    } catch (error) {
        
    }
})

//post delete routeer
router.delete("/delete:id", authenticated, async (req, res) => {
  try {
    const postId = req.params.id;

    //deleting the post
    const isDeleted = await Post.findOneAndDeleteOne({ _id: postId });
    if (isDeleted) {
      return res.json({
        msg: "Post Deleted Successfully",
      });
    }
  } catch {
    return res.status(400).send(error.message);
  }
});

// utility function
const getDateTime = function () {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliseconds = currentDate.getMilliseconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

module.exports = router;
