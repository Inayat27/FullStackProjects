import axios from "axios";
import { useState } from "react";
import {toast} from "react-hot-toast";



function AddBook() {


    const [bookInput, setbookInput] = useState({
        name: '',
        author: '',
        description: '',
        price:0,
        image: '',
        isavailable: false
    })
    return (
        <div className="flex flex-col justify-center items-center mt-10">

            <h1 className="font-bold  drop-shadow-2xl  text-3xl">Add Your Book Here!</h1>
            <div className="w-full md:w-1/3 m-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="name"
                >
                    Title
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={bookInput.name}
                    onChange={(e) =>
                        setbookInput((ip) => ({ ...ip, name:e.target.value}))
                    }
                    placeholder="Enter Book Title"
                    id="name"
                ></input>
            </div>
            <div className="w-full md:w-1/3 ">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="Author"
                >
                    Book Author
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={bookInput.author}
                    onChange={(e) =>
                        setbookInput((ip) => ({ ...ip, author: e.target.value }))
                    }
                    placeholder="Enter your Author"
                    id="Author"
                ></input>
            </div>
            <div className="w-full md:w-1/3 ">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="Description"
                >
                    Description
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={bookInput.description}
                    onChange={(e) =>
                        setbookInput((ip) => ({ ...ip, description: e.target.value }))
                    }
                    placeholder="Enter your Description"
                    id="Description"
                ></input>
            </div>
            <div className="w-full md:w-1/3 ">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="Price"
                >
                    Price
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={bookInput.price}
                    onChange={(e) =>
                        setbookInput((ip) => ({ ...ip, price:parseInt(e.target.value )}))
                    }
                    placeholder="Enter your Price"
                    id="Price"
                ></input>
            </div>
            <div className="w-full md:w-1/3 ">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="Image"
                >
                    Image
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={bookInput.image}
                    onChange={(e) =>
                        setbookInput((ip) => ({ ...ip, image: e.target.value }))
                    }
                    placeholder="Enter your Image"
                    id="Image"
                ></input>
            </div>
            <button
                type="button"
                className="rounded-md mt-10 bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"

                onClick={() => {
                    axios
                        .post("http://localhost:3000/user/addbook", bookInput)
                        .then((r) => {
                            console.log(r)
                            if (r.data) {
                                //  sessionStorage.setItem('cookie',r.data.token)
                               
                                toast.success("Book Added Succesfully");
                               
                            } else {
                                toast.error(r.data.msg);
                            }
                            // console.log(Input);
                        })
                        .catch((e) => toast.error(e));
                }}

            >
                Add
            </button>

        </div>
    );
}

export default AddBook;
