// import React from "react";
// import { Container, Row, Col, Carousel } from "react-bootstrap";
// import appStyles from "../../App.module.css";
// import Asset from "../../components/Asset";
// import { useProfileData } from "../../contexts/ProfileDataContext";
// import { Link } from "react-router-dom";
// import Avatar from "../../components/Avatar";

// const ProfileList = ({ mobile }) => {
//   const profileData = useProfileData();
//   const { profileList } = profileData;

//   return (
//     <Container
//       className={`${appStyles.Content} ${
//         mobile && "d-lg-none text-center mb-3"
//       }`}
//     >
//       {profileList.results && profileList.results.length ? (
//         <>
//           <h5>Users profiles</h5>
//           <hr />
//           {mobile ? (
//             <Carousel interval={2500} itemsPerSlide={4}>
//               {profileList.results.slice(0, 4).map((profile) => (
//                 <Carousel.Item key={profile.id}>
//                   <Row>
//                     <Col>
//                       <Link to={`/profiles/${profile.id}/`}>
//                         <Avatar src={profile.image} height={55} />
//                       </Link>
//                       <p>
//                         <strong>{profile.owner}</strong>
//                         <br />
//                         Created on:
//                         <br />
//                         {profile.created_at}
//                       </p>
//                     </Col>
//                   </Row>
//                 </Carousel.Item>
//               ))}
//             </Carousel>
//           ) : (
//             profileList.results.map((profile) => (
//               <Row key={profile.id}>
//                 <Col>
//                   <Link to={`/profiles/${profile.id}/`}>
//                     <Avatar src={profile.image} height={55} />
//                   </Link>
//                 </Col>
//                 <Col>
//                   <p>
//                     <strong>{profile.owner}</strong>
//                     <br />
//                     Created on:
//                     <br />
//                     {profile.created_at}
//                   </p>
//                 </Col>
//               </Row>
//             ))
//           )}
//         </>
//       ) : (
//         <Asset spinner />
//       )}
//     </Container>
//   );
// };

// export default ProfileList;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileList = ({ mobile }) => {
  const profileData = useProfileData();
  const { profileList, fetchMoreProfiles } = profileData;
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    if (profileList.next) {
      await fetchMoreProfiles(profileList.next);
    } else {
      setHasMore(false);
    }
  };

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {profileList.results && profileList.results.length ? (
        <>
          <h5>Users profiles</h5>
          <hr />
          {mobile ? (
            <Carousel interval={2500} itemsPerSlide={4}>
              {profileList.results.slice(0, 4).map((profile) => (
                <Carousel.Item key={profile.id}>
                  <Row>
                    <Col>
                      <Link to={`/profiles/${profile.id}/`}>
                        <Avatar src={profile.image} height={55} />
                      </Link>
                      <p>
                        <strong>{profile.owner}</strong>
                        <br />
                        Created on:
                        <br />
                        {profile.created_at}
                      </p>
                    </Col>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <InfiniteScroll
              dataLength={profileList.results.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={<Asset spinner />}
              endMessage={<Asset message="No more profiles to load." />}
              scrollThreshold={0.1}
            >
              {profileList.results.map((profile) => (
                <Row key={profile.id}>
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
                      <br />
                      {profile.created_at}
                    </p>
                  </Col>
                </Row>
              ))}
            </InfiniteScroll>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfileList;