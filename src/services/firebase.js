import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.size > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedUsers(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedinUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(spDocId, userId, isFollowed) {
  return await firebase
    .firestore()
    .collection("users")
    .doc(spDocId)
    .update({
      followers: isFollowed
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}
// userId -> 2
// following -> [3,4,5]
export async function getPhotos(userId, following) {
  // we will get all the photos of users we are following
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export const isUserFollowingProfile = async (loggedInUsername, profileUserId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUsername)
    .where('following', 'array-contains', profileUserId)
    .get()
  
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
  return response.userId;
}

export const toggleFollow = async (isFollowingProfile , activeUserDocId, profileDocId, profileUserId, followingUserId) => {
  await updateLoggedinUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile)
}






