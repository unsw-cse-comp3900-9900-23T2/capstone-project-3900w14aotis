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

export const profileUpdateFetch = async (
    uId,
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
    })
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": API_MEDIA_TYPE },
      body: jsonData,
    };
  
    const profileUpdatePromise = await fetch(
      `${API_URL}/profile/update/${uId}`,
      requestOption
    );
  
    const profileUpdateResponse = await profileUpdatePromise.json();
    return profileUpdateResponse;
};