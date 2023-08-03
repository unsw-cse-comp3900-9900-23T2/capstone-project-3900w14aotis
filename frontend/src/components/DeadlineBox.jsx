import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Loading from "./loaders/Loading";

/**
 * This shows the deadline of a task. It is colour coded:
 * - Done: green
 * - Due within 7 days: yellow
 * - Due after 7 days: grey
 * - Due today or deadline passed: pink
 */
const DeadlineBox = ({ deadline, status, width, height }) => {
  const [color, setColor] = useState("#E5E5E5");
  const [deadlineString, setDeadlineString] = useState("");
  const [finalDeadline, setFinalDeadline] = useState(deadline);
  const [borderColor, setBorderColor] = useState("#8A8A8A");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFinalDeadline(deadline);
  }, [deadline]);

  useEffect(() => {
    const date = new Date(finalDeadline).toString().split(" ");
    setDeadlineString(`${date[1]} ${date[2]}, ${date[3]}`);
    const currDate = new Date(Date.now());
    const startDate = new Date(finalDeadline).toISOString();
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
      } else if (days > 0) {
        setColor("#FFF3C7");
        setBorderColor("#E09032");
      } else if (days <= 0) {
        setColor("#FFD0D0");
        setBorderColor("#FF3333");
      }
    }
    setLoading(false);
  }, [finalDeadline]);

  if (loading) {
    return <Loading />;
  }
  return Date.parse(deadline) === 0 ? (
    <></>
  ) : (
    <Box
      sx={{
        backgroundColor: color,
        width: width,
        height: height,
        display: "grid",
        placeContent: "center",
        borderRadius: "10px",
        border: `solid ${borderColor} 3px`,
        color: borderColor,
      }}
    >
      {deadlineString}
    </Box>
  );
};
export default DeadlineBox;
