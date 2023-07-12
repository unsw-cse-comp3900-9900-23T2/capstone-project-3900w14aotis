import React from "react";
import ProfilePicture from "./ProfilePicture";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";

const TaskUsers = ({ assignees, group }) => {
  return (
    <>
      {group ? (
        <AvatarGroup max={3}>
          {assignees.map((user) => {
            return (
              <ProfilePicture
                key={user.uid ? user.uid : user.email}
                userDetails={user}
                imgWidth={35}
                imgHeight={35}
              />
            );
          })}
        </AvatarGroup>
      ) : (
        assignees.map((user) => {
          return (
            <ProfilePicture
              key={user.uid ? user.uid : user.email}
              userDetails={user}
              imgWidth={35}
              imgHeight={35}
            />
          );
        })
      )}
    </>
  );
};

export default TaskUsers;
