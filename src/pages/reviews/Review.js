import React, { useState } from "react";
import { Media, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Review.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import ReviewEditForm from "./ReviewEditForm";

const Review = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setReviews,
    reviewlikes_count,
    reviewlike_id,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            reviews_count: prevPost.results[0].reviews_count - 1,
          },
        ],
      }));

      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
      }));
    } catch (err) {}
  };

  const handleReviewLike = async () => {
    try {
      const { data } = await axiosRes.post("/reviewlikes/", { review: id });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                reviewlikes_count: review.reviewlikes_count + 1,
                reviewlike_id: data.id,
              }
            : review;
        }),
      }));
    } catch (err) {}
  };

  const handleReviewUnlike = async () => {
    try {
      await axiosRes.delete(`/reviewlikes/${reviewlike_id}/`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                reviewlikes_count: review.reviewlikes_count - 1,
                reviewlike_id: null,
              }
            : review;
        }),
      }));
    } catch (err) {}
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <ReviewEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setReviews={setReviews}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner ? (
          <>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own review!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
            {reviewlikes_count}
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          </>
        ) : reviewlike_id ? (
          <>
            <span onClick={handleReviewUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
            {reviewlikes_count}
          </>
        ) : currentUser ? (
          <>
            <span onClick={handleReviewLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
            {reviewlikes_count}
          </>
        ) : (
          <>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like reviews!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
            {reviewlikes_count}
          </>
        )}
      </Media>
    </div>
  );
};

export default Review;
