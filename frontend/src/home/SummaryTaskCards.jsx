import React from "react";
import { Box } from "@mui/material";
import DeadlineBox from "../components/DeadlineBox";
import styles from "./styles/SummaryTaskCards.module.css";
import Loading from "../components/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";

const SummaryTaskCards = ({ status, tasks, isLoading }) => {
  return (
    <Box
      sx={{
        width: "80%",
        // height: "20.75rem",
        height: "40%",
        borderRadius: "1.25rem",
        background: "#FFF",
        boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginTop: "30px",
          width: "80%",
        }}
      >
        <h3 className={styles.statusHeading}>{status}</h3>
        <Box
          sx={{
            width: "100%",
            height: "75%",
          }}
        >
          <PerfectScrollbar>
            {isLoading ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  // alignItems: "center",
                  width: "100%",
                }}
              >
                {tasks.length === 0 ? (
                  <Box>
                    <h4>No assigned tasks</h4>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      marginTop: "20px",
                    }}
                  >
                    {tasks.map((task) => {
                      return (
                        <Box
                          key={task.taskID}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "3.625rem",
                            borderRadius: "10px",
                            background: "#FFF",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            filter: "drop-shadow(0px 0px 4px #000)",
                          }}
                        >
                          <h4>{task.Title}</h4>
                          <Box sx={{ width: "clamp(1rem, 6rem, 8rem)" }}>
                            <DeadlineBox
                              deadline={task.Deadline}
                              status={task.Status}
                              width={"clamp(1rem, 6rem, 8rem)"}
                              height={"60%"}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            )}
          </PerfectScrollbar>
        </Box>
      </Box>
    </Box>
  );
};
export default SummaryTaskCards;
