const Book = require("../Model/book");
const bookValidationSchema = require("../Validation/bookValidation");

const addbook = async (req, res) => {
  const bookPayload = req.body;

  const parsedBook = bookValidationSchema.safeParse(bookPayload);
// console.log(parsedBook);
  if (!parsedBook.success) {
    return res.json({
      msg: "Invalid Input",
    });
  }

  const response = await Book.create({
    name:bookPayload.name,
    author: bookPayload.author,
    description: bookPayload.description,
    price: bookPayload.price,
    image: bookPayload.image,
    isavailable: bookPayload.isavailable,
  });

  if (!response) {
    return res.json({
      msg: "Something unExpected Happen while addding book data",
    });
  }else{
    res.json({
      msg: "Book Added SuccessFully",
    });

  }

};


const getBooks = async (req,res) =>
{
    const books = await Book.find();

    if(!books)
    {
        return res.json({
            msg:'Not able to fetch Books'
        })
    }
    res.json({
        books
    })
}


const updateBook = async (req,res) =>
{
    const bookId = req.params.bookId;
    // console.log(bookId);
    const updatedBook = req.body;

   const book = await Book.findByIdAndUpdate(bookId,updatedBook) ;


   if (!book) {
    return res.json({
        msg:"Invalid Book Id"
    })
   }

   res.json({
    msg:'Bookp Updated Successfully '
   })


}


const deleteBook = async (req,res) =>
{
    const bookId = req.params.bookId;

    const book = await Book.deleteOne({_id:bookId});
    if(!book)
    {
        return res.json({
            msg:"Invalid Book id to delete"
        })
    }

    res.json({
        msg:'Book Deleted Successfully'
    })
}


module.exports={deleteBook,updateBook,getBooks,addbook};