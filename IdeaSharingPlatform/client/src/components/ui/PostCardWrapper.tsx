import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { Backend_url } from "../../config";
// import InfiniteScroll from "react-infinite-scroll-component";

interface Post {
  title: string;
  content: string;
}

const PostCardWrapper = () => {
  const [postInfo, setPostInfo] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load

  useEffect(() => {
    fetchData()
  }, [hasMore]); 

  const fetchData = () => {
    axios
      .get<Post[]>(`${Backend_url}/post/posts`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data) {
          // Update postInfo with new posts
          setPostInfo(response.data);
          // Check if there are more posts to load
          setHasMore(response.data.length > 0);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

 

  return (
    <div className="flex flex-col items-center m-1 py-2 w-full mx-2 overflow-x-hidden">
      
        {postInfo.map((post) => (
          <PostCard key={Math.random()} title={post.title} content={post.content} />
        ))}
      
    </div>
  );
};

export default PostCardWrapper;
