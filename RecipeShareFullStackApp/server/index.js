const express = require('express');
const authRoute =require('./routes/authRoute')
const user = require('./routes/user')
const recipeRoute= require('./routes/recipe')
const app = express();
const { recipe } = require("../server/db/db");
const cors = require('cors');

app.use(express.json());
app.use(cors())

app.use('/auth',authRoute);

app.use('/user',user)
app.use('/user/recipe',recipeRoute)

app.get('/allRecipes',(req,res) =>
{
    recipe.find().then((recipes) => {
        res.json({ recipes });
      });
    
})

app.listen(3000, () =>
{
    console.log("Server Running ");
})