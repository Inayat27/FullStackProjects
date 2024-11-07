
const express = require('express');
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const { recipe, user } = require('../db/db');




// get user Profile info
router.get('/profile',authenticate,(req,res) =>
{
    res.send( `Welcome ${req.userData.name}`);
});

// get user Specific Recipes
router.get('/recipes',authenticate,(req,res) =>
{
    recipe.find({ userId: req.userData._id })
    .then((recipes) =>
    {
        res.json({recipes})
    })
    
});


// get bookmark recipes

router.get('/bookmarks',authenticate, async (req,res) =>
{
    const response = await user.find({_id:req.userData.id})
   res.json({
    Bookmarked : response[0].bookmarks
   })
})


// add recipe to bookmark

router.post('/addBookMark/:id',authenticate,(req,res) =>
{
    const recipeId = req.params.id;
    user.findByIdAndUpdate(req.userData.id,{$push:{bookmarks:recipeId}},{new:true})
    .then(() =>
    {
        res.json({msg:"Added to the Bookmark"})
    })

})






module.exports=router