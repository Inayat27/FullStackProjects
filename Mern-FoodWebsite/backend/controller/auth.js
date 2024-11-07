const {User} = require("../db/userDb");
const { userValidation, loginValidation } = require("../validation/userValidation");
const jwt = require('jsonwebtoken')



const signUp = async (req, res) => {
    const userPayload = req.body;
    const parsedPayload = userValidation.safeParse(userPayload);

    if (!parsedPayload.success) {
        return res.json({
            msg: 'Invalid Input'

        })
    }

    const isUserExit = await User.findOne({ email: userPayload.email });
    if (isUserExit) {
        return res.json({
            msg: 'User already present!'
        })
    }


    try {

        const newUser = await User.create({
            fullname:userPayload.name, email:userPayload.email, password:userPayload.password
        })

        res.json({
            id: newUser._id,
            email: newUser.email,
            msg: 'User Created Successfully!...'
        })


    } catch (error) {

        console.log(error);
        return res.json({
            msg: 'Error Occured while Creating user'
        })
    }

}




const login = async (req, res) => {
    const loginCredentials = req.body;
    const parsedData = loginValidation.safeParse(loginCredentials);

    if (!parsedData.success) {
        return res.json({
            msg: 'Invalid Input!'
        })
    }



    try {

        const isUserPresent = await User.findOne({ email: loginCredentials.email });
        if (!isUserPresent) {
            return res.json({
                msg: 'User not Found ,Please SignUp...'
            })
        }
        const token = jwt.sign({ user_id: isUserPresent._id, email: isUserPresent.email }, process.env.JWT_SECRET_KEY);

        res.json({
            token:'Bearer ' + token,
            userId:isUserPresent._id
        })

    } catch (error) {
        console.log(error);
        return res.json({
            msg:'Error Occured while Login!'
        })
    }


}


module.exports = { signUp ,login }