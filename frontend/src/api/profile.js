const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

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

export const profileUpdateFetch = async (uid, firstName,lastName,email, profileImage, coverProfileImage) => {
  const jsonData = JSON.stringify({
    firstName,
    lastName,
    email,
    profileImage,
    coverProfileImage
  });
  console.log(jsonData)
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const profileUpdatePromise = await fetch(`${API_URL}/profile/update/${uid}`, requestOption);
  const profileUpdateResponse = await profileUpdatePromise.json();
  return profileUpdateResponse;
};

// export const profileUpdateFetch = async (
//   uId,
//   firstName,
//   lastName,
//   email,
//   profileImage,
//   coverProfileImage
// ) => {
//   const jsonData = JSON.stringify({
//     firstName,
//     lastName,
//     email,
//     profileImage,
//     coverProfileImage,
//   })
//   const requestOption = {
//     method: "POST",
//     headers: { "Content-Type": API_MEDIA_TYPE },
//     body: jsonData,
//   };

//   const profileUpdatePromise = await fetch(
//     `${API_URL}/profile/update/${uId}`,
//     requestOption
//   );

//   const profileUpdateResponse = await profileUpdatePromise.json();
//   return profileUpdateResponse;
// };

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