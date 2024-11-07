

const express = require('express');
const autheticate = require('../middleware/userAuthMiddleware')
const router = express.Router();
const jwt = require('jsonwebtoken')

const {deleteBook,updateBook,getBooks,addbook} = require('../controller/userHelper')



router.get('/profile',autheticate,(req,res) =>
{
    const token = req.cookies.token
    // console.log(token);
    if (token) {
    jwt.verify (token, process.env.SECRET_KEY, {}, (err, user) => {
    if(err) throw err;
    return res.json(user)
    })
    } else {
    return res.json(null)
    }
})


router.post('/addbook',autheticate,addbook)
router.put('/update/:bookId',autheticate,updateBook)
router.delete('/delete/:bookId',autheticate,deleteBook)

router.get('/getBooks',getBooks)


module.exports = router