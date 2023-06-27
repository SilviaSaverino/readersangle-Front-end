import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset.js";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    author: "",
    genre_filter: "",
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

  const { title, author, genre_filter, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre_filter", genre_filter);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
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
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="text-center">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.author?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="text-center">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Genre:</Form.Label>
        <Form.Control
          as="select"
          name="genre_filter"
          value={genre_filter}
          onChange={handleChange}
        >
          {genreChoices.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors.genre?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="text-center">
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Book Synopsis:</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="text-center">
          {message}
        </Alert>
      ))}

      <Button className={`${btnStyles.Button} ${btnStyles.Dull}`} type="submit">
        Create
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Dull}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      {errors.non_field_errors?.map((message, idx) => (
        <Alert variant="warning" key={idx} className="text-center">
          {message}
        </Alert>
      ))}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
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
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx} className="text-center">
                {message}
              </Alert>
            ))}
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
