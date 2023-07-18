import React from "react";

const CoverPicture = ({ userDetails, imgWidth, imgHeight }) => {
  const { coverProfileImage, firstName, lastName } = userDetails;

  return (
    <>
      {coverProfileImage ? (
        <img
          src={coverProfileImage}
          alt={`${firstName} ${lastName} CP`}
          width={imgWidth}
          height={imgHeight}
        />
      ) : (
        <img
          src="/Default-Cover.jpg"
          alt={`${firstName} ${lastName} CP`}
          width={imgWidth}
          height={imgHeight}
        />
      )}
    </>
  );
};

export default CoverPicture;
