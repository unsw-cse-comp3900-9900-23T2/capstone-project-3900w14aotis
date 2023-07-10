import React from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import { getAuth } from "firebase/auth";
import ConnectionCard from "../components/ConnectionCard";

function ConnectionsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Headerbar text="Connections" />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 70px - 5rem)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            height: "91%",
            width: "93%",
            columnGap: "4vw",
            rowGap: "4vh",
          }}
        >
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
          <ConnectionCard />
        </Box>
      </Box>
    </Box>
  );
}

export default ConnectionsPage;
