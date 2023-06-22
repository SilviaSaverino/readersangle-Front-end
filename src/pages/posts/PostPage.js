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
import Review from "../reviews/Review";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
// import PopularPosts from "./PopularPosts";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [reviews, setReviews] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/reviews/?post=${id}`),
          //   axiosReq.get(`poststatus/?post=${id}&?profile=${id}`),
        ]);
        setPost({ results: [post] });
        setReviews(reviews);
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const filteredReviews = reviews.results.filter(
    (review) => review.post.toString() === id
  );

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2">
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
          ) : filteredReviews.length ? (
            "Comments/Reviews"
          ) : null}
          {filteredReviews.length ? (
            <InfiniteScroll
            children={
                filteredReviews.map((review) => (
                    <Review key={review.id} {...review} 
                    setPost={setPost}
                    setReviews={setReviews} />
                  ))
            }
            dataLength={reviews.results.length}
            loader={<Asset spinner />}
            hasMore={!!reviews.next}
            next={() => fetchMoreData(reviews, setReviews)}
            />            
          ) : currentUser ? (
            <span>No reviews yet, be the first to write one!</span>
          ) : (
            <span>No reviews yet. Log in to leave one</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
