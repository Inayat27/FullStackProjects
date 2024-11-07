
import burger from '../../assets/burger-removebg-preview.png'
const FoodCard = () => {
  return (
    <div className="card card-side bg-base-100  shadow-xl">
  <figure><img src={burger} alt="Movie"/></figure>
  <div className="card-body">
  <h2 className="card-title">Newly Launched Burger!</h2>
  <p>Try our latest creation - the Deluxe Burger with premium ingredients and mouthwatering flavors.</p>
  <div className="card-actions justify-end">
    <button className="btn my-2">Order Now</button>
  </div>
</div>

</div>
  )
}

export default FoodCard
