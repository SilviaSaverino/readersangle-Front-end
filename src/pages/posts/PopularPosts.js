import React, { useState, useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/PopularPosts.module.css";
import appStyles from "../../App.module.css";

const PopularPosts = ({ mobile }) => {
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
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      <h5>Popular Posts</h5>
      <hr />
      {mobile ? (
        <Carousel
          interval={2500}
        >
          {popularPosts.slice(0, 5).map((post) => (
            <Carousel.Item key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <div className={styles.CarouselItem}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles.Image}
                  />
                  <div>
                    <i className="far fa-heart" /> {post.likes_count}
                    <i className="far fa-comments" /> {post.review_count}
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <div className={styles.PopularPostsList}>
          {popularPosts.slice(0, 5).map((post) => (
            <div key={post.id} className={styles.PostItem}>
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
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default PopularPosts;
