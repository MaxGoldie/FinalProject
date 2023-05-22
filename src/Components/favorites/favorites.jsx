import React, { useState, useEffect, useContext } from "react";
import {Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteStateContext } from "../state/review/FavoriteStateContext";
export const Favorites = () => {
  const { favoriteHotels } = useContext(FavoriteStateContext);

  console.log(favoriteHotels);

  const [displayedHotels, setDisplayedHotels] = useState(favoriteHotels);

  const handleDelete = (hotelName) => {
    const updatedHotels = displayedHotels.filter((name) => name !== hotelName);
    setDisplayedHotels(updatedHotels);
  };
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{
          marginTop: "30px",
          color: "#234e9e",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        My Favorite Hotels
        <hr />
      </Typography>

      {displayedHotels.length === 0 ? (
        <Typography
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          No favorites added
        </Typography>
      ) : (
        displayedHotels.map((hotelname, index) => {
          const isDuplicate = favoriteHotels
            .slice(0, index)
            .includes(hotelname);

          return isDuplicate ? null : (
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "15px",
              }}
              key={`${hotelname}-${index}`}
            >
              <FavoriteIcon style={{ color: "#c73232", marginRight: "10px" }} />
              {hotelname}
            </Typography>
          );
        })
      )}
    </div>
  );
};
