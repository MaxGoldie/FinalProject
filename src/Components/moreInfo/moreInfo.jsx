import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";

export const MoreInfo = () => {
  const { hotelId } = useParams();
  const [photos, setPhotos] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${hotelId}&locale=en-gb`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const hotelName = data.name;
        setHotelName(hotelName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [hotelId]);

  const [facilities, setfacilities] = useState(null);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`,
          {
            headers: {
              "X-RapidAPI-Key":
                "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
              "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
            },
          }
        );
        setPhotos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, [hotelId]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(
          `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${hotelId}&locale=en-gb`,
          {
            headers: {
              "X-RapidAPI-Key":
                "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
              "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
            },
          }
        );
        setfacilities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFacilities();
  }, [hotelId]);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await axios.get(
          `https://booking-com.p.rapidapi.com/v1/hotels/facilities?hotel_id=${hotelId}&locale=en-gb`,
          {
            headers: {
              "X-RapidAPI-Key":
                "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
              "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
            },
          }
        );
        if (response.data !== null) {
          setHighlights(response.data);
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHighlights();
  }, [hotelId]);

  const carouselStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const arrowStyle = {
    marginBottom: "100px",
    background: "none",
    color: "#000",
    cursor: "pointer",
  };

  const imageStyle = {
    width: "700px",
    height: "400px",
    marginTop: "20px",
    border: "2px solid black",
    marginTop: "0px",
  };

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{
          marginTop: "20px",
          color: "#234e9e",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        {hotelName}
      </Typography>

      <Typography variant="h4"> </Typography>
      <div className="carousel" style={carouselStyle}>
        {photos.length > 0 ? (
          <div className="carousel-wrapper">
            <IconButton color="primary" onClick={handlePrev} style={arrowStyle}>
              {" "}
              <ArrowBackIosIcon />
            </IconButton>

            <img
              src={photos[currentIndex].url_max}
              alt={`Photo ${currentIndex + 1}`}
              style={imageStyle}
            />

            <IconButton color="primary" onClick={handleNext} style={arrowStyle}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 20 }}>
          {facilities !== null ? (
            facilities.map((facility) => (
              <Grid item xs={2} sm={4} md={4} key={facility.facility_id}>
                <Item style={{ fontWeight: "bold", color: "#62a4de" }}>
                  {facility.facility_name}
                </Item>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <p>Loading facilities...</p>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};
