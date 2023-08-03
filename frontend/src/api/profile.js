const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an API call to get details of a profile given a user id.
export const profileDetailFetch = async (uId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const profileDetailPromise = await fetch(
    `${API_URL}/profile/${uId}/get`,
    requestOption
  );

  const profileDetailResponse = await profileDetailPromise.json();
  return profileDetailResponse;
};

// Sends an API call to update details of a profile. These details include a
// user's first name, last name, email, profile image and cover image.
export const profileUpdateFetch = async (
  uid,
  firstName,
  lastName,
  email,
  profileImage,
  coverProfileImage
) => {
  const jsonData = JSON.stringify({
    firstName,
    lastName,
    email,
    profileImage,
    coverProfileImage,
  });
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const profileUpdatePromise = await fetch(
    `${API_URL}/profile/update/${uid}`,
    requestOption
  );
  const profileUpdateResponse = await profileUpdatePromise.json();
  return profileUpdateResponse;
};

// Sends an API call to get the user's achievements.
export const profileAchievementsFetch = async (uId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const profileAchievementsPromise = await fetch(
    `${API_URL}/profile/achievements/${uId}`,
    requestOption
  );

  const profileAchievementsResponse = await profileAchievementsPromise.json();
  return profileAchievementsResponse;
};

// Sends an API call to check if profile achievements should be hidden or
// displayed on a profile.
export const checkHiddenAchievementsFetch = async (uid) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const checkHiddenAchievementsPromise = await fetch(
    `${API_URL}/profile/achievement/check/${uid}`,
    requestOption
  );

  const checkHiddenAchievementsResponse =
    await checkHiddenAchievementsPromise.json();
  return checkHiddenAchievementsResponse;
};

// Sends an API call to set the visiblity of profile achievements on a profile.
export const setHiddenAchievementsFetch = async (uid, hidden) => {
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const setHiddenAchievementsPromise = await fetch(
    `${API_URL}/profile/achievement/set/${uid}?hidden=${hidden}`,
    requestOption
  );

  const setHiddenAchievementsResponse =
    await setHiddenAchievementsPromise.json();
  return setHiddenAchievementsResponse;
};
