import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/PopularPosts.module.css";
import appStyles from "../../App.module.css";
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
    <Container className={`${appStyles.Content}`}>
      <h5>Popular Posts</h5>
      <hr />
      <Row className={styles.PopularPostsList}>
        {popularPosts.map((post) => (
          <Col key={post.id} className={styles.PostItem}>
            <Link to={`/posts/${post.id}`}>
              <img
                src={post.image}
                alt={post.title}
                className={styles.Image}
              />
            </Link>
            <div className={styles.PostInfo}>
              <h4 className={styles.Title}>
                <strong>{post.title}</strong>
              </h4>
              <div className={styles.Icons}>
                <div>
                  <i className="far fa-heart" /> {post.likes_count}
                </div>
                <div>
                  <i className="far fa-comments" /> {post.review_count}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularPosts;
