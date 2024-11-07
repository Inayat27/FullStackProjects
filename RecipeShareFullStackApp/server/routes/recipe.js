const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const validateRecipeSchema = require("../Validation/recipeValidate");
const { recipe } = require("../db/db");

router.post("/addRecipe", authenticate, (req, res) => {
  try {
    const recipeData = req.body;
    const parsedRecipeData = validateRecipeSchema.safeParse(recipeData);

    if (!parsedRecipeData.success) {
      res.json({
        msg: "Wrong Input",
      });
    }

    const userId = req.userData._id;
    recipe
      .create({
        userId: userId,
        title: recipeData.title,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        cookingTime: recipeData.cookingTime,
        diffLevel: recipeData.diffLevel,
      })
      .then(() => {
        res.json({
          msg: "Recipe added SuccessFully",
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// fetching all recipe

router.get("/recipes", authenticate, (req, res) => {
  recipe.find().then((recipes) => {
    res.json({ recipes });
  });
});

// update Recipes

router.put("/updateRecipe/:id", authenticate, async (req, res) => {
  const updateData = req.body;
  recipe
    .findOneAndUpdate({ _id: req.params.id }, updateData, { new: true })
    .then(() => {
      res.json({
        msg: "Recipe Updated SuccessFully",
      });
    })
    .catch(() => {
      res.json({
        msg: "Check Something Unexpected Happen or Invalid Id",
      });
    });
});

// // deleting Recipe
router.delete("/deleteRecipe/:id", authenticate, (req, res) => {
  recipe
    .findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.json({
        msg: "Recipe Deleted  SuccessFully",
      });
    })
    .catch(() => {
      res.json({
        msg: "Check Something Unexpected Happen or Invalid Id",
      });
    });
});



module.exports = router;
