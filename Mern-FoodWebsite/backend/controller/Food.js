const { Food } = require("../db/userDb");
const FoodInputValidation = require("../validation/FoodValidation")



const allFood = async (req, res) => {
   try {
    const foods = await Food.find();
    res.json(foods)
   } catch (error) {
    console.log(error + ':- while fetching foods');
   }
    
}




const addFood = async (req, res) => {
    const foodPayload = req.body;
    const parsedPayload = FoodInputValidation.safeParse(foodPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Input',
            errors: parsedPayload.error.errors, // Include specific validation errors
        });
    }

    try {
        const addedFood = await Food.create({
            dishname: foodPayload.dishname,
            price: foodPayload.price,
            dishImage: foodPayload.dishImage
        });

        res.status(201).json({
            success: true,
            foodId: addedFood._id,
            msg: 'Food Added Successfully!',
        });
    } catch (error) {
        console.error('Error occurred while adding the Food:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};



const updateFood = async (req,res) =>
{
    const foodId = req.params.id;
    const updateFields = req.body
    try {
        const result = await Food.findOneAndUpdate({_id:foodId},{ $set: updateFields });

        if (!result) {
            return res.status(404).json({ msg: 'Food not found' });
        }

        res.json({ msg: 'Food updated successfully' });
    } catch (error) {
        console.log(error + ' error while  updating food');
    }
}

const deleteFood = async (req, res) => {
    const foodId = req.params.id; // Use lowercase "id"
    try {
        const isDeleted = await Food.findOneAndDelete({ _id: foodId });
        if (isDeleted) {
            return res.json({
                msg: 'Food Deleted Successfully!'
            });
        } else {
            return res.status(404).json({
                error: 'Food not found'
            });
        }
    } catch (error) {
        console.log(error + ' error while deleting food');
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


module.exports={
    allFood,
    addFood,
    updateFood,
    deleteFood
}