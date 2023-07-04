import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const DeadlineBox = ({ deadline, status, width, height }) => {
  const [color, setColor] = useState("#E5E5E5");
  const [deadlineString, setDeadlineString] = useState("");
  const [borderColor, setBorderColor] = useState("#8A8A8A");

  useEffect(() => {
    const date = new Date(deadline).toString().split(" ");
    setDeadlineString(`${date[1]} ${date[2]}, ${date[3]}`);
    const currDate = new Date(Date.now());
    const startDate = new Date(deadline).toISOString();
    const endDate = new Date(currDate).toISOString();
    let days = Math.ceil(
      (new Date(startDate) - new Date(endDate)) / 1000 / 60 / 60 / 24
    );

    if (status === "Done") {
      setColor("#D2FFD7");
      setBorderColor("#00AB11");
    } else {
      if (days > 7) {
        setColor("#E5E5E5");
        setBorderColor("#8A8A8A");
      } else if (days > 3) {
        setColor("#FFF3C7");
        setBorderColor("#E09032");
      } else if (days <= 0) {
        setColor("#FFD0D0");
        setBorderColor("#FF3333");
      }
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: color,
        width: width,
        height: height,
        display: "grid",
        placeContent: "center",
        borderRadius: "10px",
        border: `solid ${borderColor} 3px`,
      }}
    >
      {deadlineString}
    </Box>
  );
};
export default DeadlineBox;
