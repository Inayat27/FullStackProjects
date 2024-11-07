const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);


const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required:true
  },
  password: String,
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});

const recipeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  title: String,
  ingredients: String,
  instructions: String,
  cookingTime: Number,
  diffLevel: String,
});


userSchema.methods.comparePassword = async function (password) {

    const ans = await bcrypt.compare(password, this.password)
  return ans;
};

const user = mongoose.model("User", userSchema);
const recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { user, recipe };
