import React from "react";
import {
  Card,
  Media,
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
    // followed_count,
    // post_status,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align_item-center">
            <span>{updated_at}</span>
            {is_owner && postPage && "logic here"}
          </div>
        </Media>

        <Card.Body>
          <Row>
            <Col>
              {author && (
                <Card.Title className="text-center">{author}</Card.Title>
              )}
              {genre_filter && (
                <Card.Subtitle className="text-center">
                  {genre_filter}
                </Card.Subtitle>
              )}
            </Col>
            <Col>
              {title && (
                <Card.Title className="text-center">{title}</Card.Title>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
              </Link>
            </Col>
            <Col>
              {content && (
                <Card.Text className="text-center">{content}</Card.Text>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <div className={styles.PostBar}>
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
