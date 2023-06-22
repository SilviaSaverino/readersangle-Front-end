import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/Profile.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
  });

  const { pageProfile } = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/");
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container className={appStyles.Content}>
      {pageProfile.results.length ? (
        <>
          <h5>Users profiles</h5>
          <hr />
          {pageProfile.results.map((profile) => (
            <Row className={styles.Profiles} key={profile.id}>
              <Col>
                <Link to={`/profiles/${profile.id}/`}>
                  <Avatar src={profile.image} height={55} />
                </Link>
              </Col>
              <Col>
                <p>
                  <strong>{profile.owner}</strong>
                  <br />
                  Created on:
                  <br/>
                  {profile.created_at}
                </p>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default Profile;
