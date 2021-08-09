import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "./header";
import {
  getUserPhotosByUserId,
} from "../../services/firebase";
import Photos from "./photos";

const UserProfile = ({ user }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initalState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
      getProfileInfoAndPhotos();
    
  }, [user.userId, user]);

  return (
    <div>
      <Header photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </div>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  user: PropTypes.shape({
    emailAddress: PropTypes.string,
    dateCreated: PropTypes.number.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
