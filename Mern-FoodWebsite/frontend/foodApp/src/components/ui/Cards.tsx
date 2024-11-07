import { useEffect ,useState} from 'react'
import FoodCard from './FoodCard'
import axios from 'axios'
import burger from '../../assets/burger-removebg-preview.png'

const Cards = () => {

  const [FoodCardDetails, setFoodCardDetails] = useState([])

  useEffect ( () =>{
  axios.get('http://localhost:3000/api/v1/user/allFood').then((r) => {

    setFoodCardDetails(r.data)
  })

    
  } ,[])
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 py-10 px-10 md:grid-cols-3 grid-flow-row gap-5
    '>
      <div className="card card-side bg-base-100  shadow-xl">
  <figure><img src={burger} alt="Movie"/></figure>
  <div className="card-body">
  <h2 className="card-title">jj!</h2>
  <p>Try our latest creation - the Deluxe Burger with premium ingredients and mouthwatering flavors.</p>
  <div className="card-actions justify-end">
    <button className="btn my-2">Order Now</button>
  </div>
</div>

</div>
    </div>
  )
}

export default Cards
