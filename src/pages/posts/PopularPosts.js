import React, { useState, useEffect } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Post from "./Post";

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  const fetchPopularPosts = async () => {
    try {
      const { data } = await axiosRes.get("/posts");
      const popularPosts = data.results.filter(
        (post) => post.likes_count > 5 || post.review_count > 10
      );
      setPopularPosts(popularPosts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Popular Posts</h2>
      {popularPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PopularPosts;
