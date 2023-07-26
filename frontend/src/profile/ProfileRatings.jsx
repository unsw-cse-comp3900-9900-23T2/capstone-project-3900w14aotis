import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import Chart from "react-apexcharts";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { allRatingsFetch } from "../api/rating.js";
import { displayError } from "../utils/helpers";

const ProfileRatings = () => {

  const { userId } = useParams();
  const [ratingNames, setRatingNames] = useState([]);
  const [ratingValues, setRatingValues] = useState([]);

  // Get all ratings of a user
  const allRatings = async () => {
    try {
      const allRatingsResponse = await allRatingsFetch(userId);
      const ratings = allRatingsResponse.detail.message;
      setRatingNames(Object.keys(ratings));
      setRatingValues(Object.values(ratings));
      console.log("ratings: ", ratings);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    allRatings();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          height: "25rem",
          borderRadius: "1.25rem",
          background: "#FFF",
          boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.25)",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          marginTop: "3%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1%",
          }}
        >
          <h3 className={styles.statusHeading}>Ratings</h3>
        </Box>
        <PerfectScrollbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "2%",
              paddingLeft: "5%",
              paddingRight: "5%",
              height: "80%",
            }}
          >
            <Chart
              options={{
                chart: {
                  type: "bar",
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: ratingNames,
                }
              }}
              series={[{
                data: ratingValues
              }]}
              type="bar"
              width="100%"
              height="100%"
              className={styles.ratingsChart}
            />
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export default ProfileRatings;
