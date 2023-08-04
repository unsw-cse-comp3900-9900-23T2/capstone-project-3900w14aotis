import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import styles from "./styles/ProfileCard.module.css";
import Chart from "react-apexcharts";
import "react-perfect-scrollbar/dist/css/styles.css";
import { allRatingsFetch } from "../api/rating.js";
import { displayError } from "../utils/helpers";
import { useSelector } from "react-redux";

/**
 * This shows the user's ratings on tasks they have been assigned to.
 * Possible ratings include:
 * - Very Happy
 * - Happy
 * - Neutral
 * - Sad
 * - Very Sad
 */
const ProfileRatings = () => {
  const { userId } = useParams();
  const [ratingNames, setRatingNames] = useState([]);
  const [ratingValues, setRatingValues] = useState([]);

  const profileRatingsLoad = useSelector((state) => state.profileRatingsLoad);

  const allRatings = async () => {
    try {
      const allRatingsResponse = await allRatingsFetch(userId);
      const ratings = allRatingsResponse.detail.message;
      setRatingNames(Object.keys(ratings));
      setRatingValues(Object.values(ratings));
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    allRatings();
  }, [profileRatingsLoad]);

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
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: ratingNames,
              },
            }}
            series={[
              {
                data: ratingValues,
              },
            ]}
            type="bar"
            width="100%"
            height="100%"
            className={styles.ratingsChart}
          />
        </Box>
      </Box>
    </>
  );
};
export default ProfileRatings;
