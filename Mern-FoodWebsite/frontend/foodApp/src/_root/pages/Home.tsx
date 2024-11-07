
// import Navbar from '../../components/ui/Navbar'

import bgImage from '../../assets/bg-food.jpg'
import Cards from '../../components/ui/Cards'

const Home = () => {
  return (
    <>
    <header className="hero min-h-screen " style={{backgroundImage:`url(${bgImage}`}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold  dark:text-white">Hello there</h1>
      <p className="mb-5  dark:text-white" >Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn ">Get Started</button>
    </div>
  </div>

      
    </header>
    <Cards/>
    </>
  )
}

export default Home
