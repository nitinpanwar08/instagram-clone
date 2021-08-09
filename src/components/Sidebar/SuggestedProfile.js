import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  updateLoggedinUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

  
export default function SuggestedProfile({
  username,
  spDocId,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    //   Update the following array of the logged In user(in this case, my profile)
    await updateLoggedinUserFollowing(loggedInUserDocId, profileId, false);

    //   Update the followers array of the user whohas been followed
    await updateFollowedUserFollowers(spDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="Profile"
          onError={(e) => {
            e.target.src = "/images/avatars/default.png";
          }}
        />
        <Link to={`/p/${username}`}>{username}</Link>
      </div>
      <button
        onClick={handleFollowUser}
        className="text-xs font-bold text-blue-medium"
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.protoTypes = {
  username: PropTypes.string.isRequired,
  spDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  uderId: PropTypes.string.isRequired,
  loogedInUserDocId: PropTypes.string.isRequired,
};
