import React from "react";
import ProfilePicture from "./ProfilePicture";
import AvatarGroup from "@mui/material/AvatarGroup";

/**
 * This displays the assignees of a task as profile icons. These icons
 * are clickable and will navigate to the clicked user's profile.
 */
const TaskUsers = ({ assignees, group }) => {
  return (
    <>
      {group ? (
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": { width: 35, height: 35 },
          }}
        >
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
