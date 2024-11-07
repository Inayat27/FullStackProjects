const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profileUrl:String,
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  contribution: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
  },
  imageUrl: String,
  tags: String,
  postedAt: Date,
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 11);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', PostSchema);

module.exports = { user, Post };
