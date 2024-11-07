import { Profile } from "../components/shared"
import Friends from "../components/ui/Friends"
import PostCardWrapper from "../components/ui/PostCardWrapper"
import Trending from "../components/ui/Trending"



const Home = () => {
  return (
    <>
    <section className=" h-[90vh] flex">
        <div className="w-2/3  overflow-y-auto overflow-x-hidden max-h-screen scrollbar-thin scrollbar-thumb-gray-500  scrollbar-track-gray-800 scrollbar-thumb-rounded-full ">
        {/* postCardWrapper */}
        <PostCardWrapper/>
      </div>
      {/* Trending component */}
      <div className="w-1/3 flex flex-col items-center -2">
        <Trending/>
        <Friends/>
      </div>
    </section>
      {/* <div className="absolute top-[56px] right-0 flex w-1/2 justify-end h-[calc(100vh-56px)] bg-white "> */}
      <div >
      <Profile />

      </div>
    </>

  )
}

export default Home
