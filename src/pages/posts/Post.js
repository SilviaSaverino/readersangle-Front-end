import React, { useState } from "react";
import {
  Card,
  Media,
  Form,
  OverlayTrigger,
  Row,
  Col,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
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
    image,
    updated_at,
    postPage,
    setPosts,
    status,
    status_id,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const postStatusChoices = [
    { value: "Read", label: "Read" },
    { value: "Will read", label: "Will Read" },
  ];

  //   const [selectedStatus, setSelectedStatus] = useState(props.post_status);

  //   const handleStatusChoice = async (e) => {
  //     const status = e.target.value;
  //     setSelectedStatus(status);

  //     try {
  //       await axiosRes.patch(`/poststatus/${id}/`, { post_status: status });
  //       setPosts((prevPosts) => ({
  //         ...prevPosts,
  //         results: prevPosts.results.map((post) =>
  //           post.id === id ? { ...post, post_status: status } : post
  //         ),
  //       }));
  //       console.log("Updated post:", { ...props, post_status: status });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const [postStatus, setPostStatus] = useState({
    status: status,
  });

    const handleStatus = async (newStatus) => {
      try {
          const { data } = await axiosRes.post(`/poststatus/`, { id: status_id, status: newStatus });
          setPostStatus((prevPosts) => ({
              ...postStatus,
              results: prevPosts.results.map((post) => {
                  return post.id === id
                  ? {...post, status_id: data.id, status: data.status }
                  : post
              })
          }))
      }catch(err) {
          console.log(err)
      }
    }

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className={styles.CustomMedia}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align_items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && "logic here"}
          </div>
        </Media>
        <Card.Body>
          <Row>
            <Col>
              {author && (
                <Card.Title className="text-center">
                  <strong>{author}</strong>
                </Card.Title>
              )}
              {genre_filter && (
                <Card.Subtitle className="text-center">
                  Genre: {genre_filter}
                </Card.Subtitle>
              )}
            </Col>
            <Col>
              {title && (
                <Card.Title className="text-center">
                  <strong>{title}</strong>
                </Card.Title>
              )}
            </Col>
          </Row>
          <Row>
            <Col md-3>
              <Link to={`/posts/${id}`}>
                <Card.Img className={styles.Image} src={image} alt={title} />
              </Link>
            </Col>
            <Col>
              {content && (
                <Card.Text className={styles.Fit}>{content}</Card.Text>
              )}
            </Col>
          </Row>
          <Row className={styles.PostBar}>
            <Col className="text-center">
              Have you read this book?
              <Form>
                {postStatusChoices.map((choice) => (
                  <Form.Check
                    inline
                    key={choice.value}
                    type="radio"
                    id={`status-${choice.value}-${id}`}
                    label={choice.label}
                    name={`status-${id}`}
                    value={choice.value}
                    checked={postStatus.status === choice.value}
                    onChange={() => handleStatus(choice.value)}
                  />
                ))}
              </Form>
            </Col>
          </Row>
          <Row className={styles.PostBar}>
            <Col className="text-center">
              <div>
                {is_owner ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>You can't like your own post!</Tooltip>}
                  >
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                ) : like_id ? (
                  <span onClick={handleUnlike}>
                    <i className={`fas fa-heart ${styles.Heart}`} />
                  </span>
                ) : currentUser ? (
                  <span onClick={handleLike}>
                    <i className={`far fa-heart ${styles.HeartOutline}`} />
                  </span>
                ) : (
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Log in to like posts!</Tooltip>}
                  >
                    <i className="far fa-heart" />
                  </OverlayTrigger>
                )}
                {likes_count}
                <Link to={`/posts/${id}`}>
                  <i className="far fa-comments" />
                </Link>
                {review_count}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default Post;
