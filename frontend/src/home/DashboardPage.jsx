import React from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import { getAuth } from "firebase/auth";
import SummaryTaskCards from "./SummaryTaskCards";

const DashboardPage = () => {
  // console.log(getAuth());
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar text="Dashboard" />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 70px - 5rem)",
          width: "100%",
          // justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            // height: "100%",
          }}
        >
          <SummaryTaskCards status={"TO DO"} />
          <SummaryTaskCards status={"IN PROGRESS"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1",
          }}
        >
          Achievements
        </Box>
      </Box>
    </Box>
  );
};
export default DashboardPage;
