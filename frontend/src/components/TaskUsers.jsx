import React from "react";
import ProfilePicture from "./ProfilePicture";

const TaskUsers = ({ assignees }) => {
  return (
    <>
      {assignees.map((user, idx) => {
        console.log(user);
        return <ProfilePicture key={user.uid} imgWidth={35} imgHeight={35} />;
      })}
    </>
  );
};

export default TaskUsers;
