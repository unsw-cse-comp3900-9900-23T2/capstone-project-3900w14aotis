import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Headerbar from "../components/Headerbar";
import { getAuth } from "firebase/auth";
import ConnectionCard from "../components/ConnectionCard";
import { allConnectionsFetch } from "../api/connections";
import { displayError } from "../utils/helpers";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

function ConnectionsPage() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const connectionAdded = useSelector((state) => state.connectionAdded);

  const getConnections = async () => {
    try {
      const user = getAuth();

      const allConnectionsResponse = await allConnectionsFetch(
        user.currentUser.uid
      );
      const details = allConnectionsResponse.detail.message;

      setConnections(details);
      setLoading(false);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, [connectionAdded]);

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
        {loading ? (
          <Loading />
        ) : (
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
            {Array.isArray(connections) ? (
              connections.map((connection) => (
                <ConnectionCard
                  key={connection.uid}
                  uId={connection.uid}
                  firstName={connection.firstName}
                  lastName={connection.lastName}
                  email={connection.email}
                  profileImage={connection.profileImage}
                />
              ))
            ) : (
              <p>No current connections.</p>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ConnectionsPage;
