import React from "react";
import styles from "../../styles/Post.module.css";

const Post = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        review_count,
        likes_count,
        like_id,
        title,
        author,
        content,
        genre_filter,
        // followed_count,
        // post_status,
        image,
        updated_at
    } = props

  return <div>Post</div>;
};

export default Post;
