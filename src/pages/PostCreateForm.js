import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../assets/upload.png";
import Asset from "../components/Asset.js";
import styles from "../styles/PostCreateEditForm.module.css";
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";
import { Image } from "react-bootstrap";

function PostCreateForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    author: "",
    genre: "",
    content: "",
    image: "",
  });
  const genreChoices = [
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
    { value: "mystery", label: "Mystery" },
    { value: "fantasy", label: "Fantasy" },
    { value: "romance", label: "Romance" },
    { value: "thriller", label: "Thriller" },
    { value: "biography", label: "Biography" },
    { value: "poetry", label: "Poetry" },
    { value: "children", label: "Children" },
    { value: "cookbooks", label: "Cookbooks" },
  ];

  const { title, author, genre, content, image } = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    URL.revokeObjectURL(image);
    if (event.target.files.length) {
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Book title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Genre:</Form.Label>
        <Form.Control
          as="select"
          name="genre"
          value={genre}
          onChange={handleChange}
        >
          {genreChoices.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Book Synopsis:</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Dull} btn`}
                      htmlFor="image-upload"
                    >
                      Change your book image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Tap or click to upload your image"
                  />
                </Form.Label>
              )}

              <Form.File
                className="d-none"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
