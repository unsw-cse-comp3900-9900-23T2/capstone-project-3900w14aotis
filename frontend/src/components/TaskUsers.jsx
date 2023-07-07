import React from "react";
import ProfilePicture from "./ProfilePicture";

const TaskUsers = ({ assignees }) => {
  return (
    <>
      {assignees.map((user, idx) => {
        return (
          <ProfilePicture
            key={user.uid}
            userDetails={user}
            imgWidth={35}
            imgHeight={35}
          />
        );
      })}
    </>
  );
};

export default TaskUsers;
