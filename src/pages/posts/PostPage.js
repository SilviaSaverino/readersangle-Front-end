import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import ReviewCreateForm from "../reviews/ReviewCreateForm";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          // axios.get(`/reviews/?post=${id}`),
          axiosReq.get(`poststatus/?post=${id}&?profile=${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2">
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <ReviewCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setReviews={setReviews}
            />
          ) : reviews.results.length ? (
            "Comments/Reviews"
          ) : null}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
