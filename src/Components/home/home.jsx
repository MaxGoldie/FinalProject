import { useState, useEffect, useContext } from "react";
import * as React from "react";
import background from "./pic.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../home/home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import StarIcon from "@mui/icons-material/Star";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import axios from "axios";
import Popover from "@mui/material/Popover";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Button from "@mui/material/Button";
import { ReviewsContext } from "../state/review/reviews-context";

import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

export const Home = () => {
  const [zipCode, setZipCode] = useState("");
  const [hotels, setHotels] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pictures, setPictures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { reviewsState, reviewsDispatch } = useContext(ReviewsContext);
  const [hotelId, setHotelId] = useState(null);

  const handleClick1 = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        `https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&hotel_id=${hotelId}&locale=en-gb&language_filter=en-gb`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      reviewsDispatch({
        review: data.result,
      });
    };
    fetchReviews();
  }, [hotelId]);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedHotelReviews, setSelectedHotelReviews] = useState([]);
  const handleCardClick = async (hotel) => {
    try {
      const url = `https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&hotel_id=${hotel.hotel_id}&locale=en-gb&language_filter=en-gb`;
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
        const result = await response.json(); // Parse the response as JSON
        console.log(result);
        setSelectedHotelReviews(result.result); // Access the 'result' property of the response
        setSelectedHotel(hotel);
        setIdInput(hotel.hotel_id);
        setPopupOpen(true);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClosePopup = () => {
    setSelectedHotel(null);
    setPopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedZipCode = `${selectedOption} ${zipCode}`;
    const url = `https://booking-com.p.rapidapi.com/v1/static/hotels?zip_code=${updatedZipCode}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setHotels(data.result);
    } catch (error) {
      console.error(error);
    }
  };
  const [popupOpen, setPopupOpen] = useState(false);

  const options = [
    { name: "Alabama", abbr: "AL" },
    { name: "Alaska", abbr: "AK" },
    { name: "Arizona", abbr: "AZ" },
    { name: "Arkansas", abbr: "AR" },
    { name: "California", abbr: "CA" },
    { name: "Colorado", abbr: "CO" },
    { name: "Connecticut", abbr: "CT" },
    { name: "Delaware", abbr: "DE" },
    { name: "Florida", abbr: "FL" },
    { name: "Georgia", abbr: "GA" },
    { name: "Hawaii", abbr: "HI" },
    { name: "Idaho", abbr: "ID" },
    { name: "Illinois", abbr: "IL" },
    { name: "Indiana", abbr: "IN" },
    { name: "Iowa", abbr: "IA" },
    { name: "Kansas", abbr: "KS" },
    { name: "Kentucky", abbr: "KY" },
    { name: "Louisiana", abbr: "LA" },
    { name: "Maine", abbr: "ME" },
    { name: "Maryland", abbr: "MD" },
    { name: "Massachusetts", abbr: "MA" },
    { name: "Michigan", abbr: "MI" },
    { name: "Minnesota", abbr: "MN" },
    { name: "Mississippi", abbr: "MS" },
    { name: "Missouri", abbr: "MO" },
    { name: "Montana", abbr: "MT" },
    { name: "Nebraska", abbr: "NE" },
    { name: "Nevada", abbr: "NV" },
    { name: "New Hampshire", abbr: "NH" },
    { name: "New Jersey", abbr: "NJ" },
    { name: "New Mexico", abbr: "NM" },
    { name: "New York", abbr: "NY" },
    { name: "North Carolina", abbr: "NC" },
    { name: "North Dakota", abbr: "ND" },
    { name: "Ohio", abbr: "OH" },
    { name: "Oklahoma", abbr: "OK" },
    { name: "Oregon", abbr: "OR" },
    { name: "Pennsylvania", abbr: "PA" },
    { name: "Rhode Island", abbr: "RI" },
    { name: "South Carolina", abbr: "SC" },
    { name: "South Dakota", abbr: "SD" },
    { name: "Tennessee", abbr: "TN" },
    { name: "Texas", abbr: "TX" },
    { name: "Utah", abbr: "UT" },
    { name: "Vermont", abbr: "VT" },
    { name: "Virginia", abbr: "VA" },
    { name: "Washington", abbr: "WA" },
    { name: "West Virginia", abbr: "WV" },
    { name: "Wisconsin", abbr: "WI" },
    { name: "Wyoming", abbr: "WY" },
  ];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    setSelectedOption(option.abbr);
    setAnchorEl(null);
  };

  const fetchHotels = async () => {
    const url =
      "https://booking-com.p.rapidapi.com/v1/static/hotels?page=00&city_id=20088325&country=us&zip_code=NY 10001";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7",
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setHotels(data.result);
    } catch (error) {
      console.error(error);
    }
  };
  const fadedClass = popupOpen ? "faded" : "";

  React.useEffect(() => {
    fetchHotels();
  }, []);
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");

  function setUrl() {
    navigate(`/moreInfo/${idInput}`);
  }

  function setUrlReview() {
    navigate(`/WriteReview/${idInput}`);
  }
  return (
    <div>
      <div className={popupOpen ? "faded" : ""}>
        <div
          style={{
            backgroundImage: `url(${background})`,
            height: 350,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <div
            class="page"
            style={{
              display: "flex",
              alignItems: "flex-start",
              //alignItems: "center",
              //justifyContent: "center",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                // alignItems: "center",
                marginTop: "100px",
                width: 400,
              }}
              onSubmit={handleSubmit}
            >
              <IconButton
                sx={{ p: "10px" }}
                aria-label="menu"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                {selectedState ? selectedState.name : "Select a State"}
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.abbr}
                    onClick={() => {
                      handleClose(option);
                      setSelectedState(option);
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>

              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                inputProps={{ "aria-label": "enter zip code" }}
              />

              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        <Grid container spacing={2} paddingTop={3} style={{ display: "flex" }}>
          {hotels.map((hotel, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardContent style={{ paddingBottom: "40px" }}>
                  {" "}
                  {/* Add padding */}
                  <Box mt={1} display="flex" alignItems="center">
                    {[...Array(hotel.exact_class)].map((_, index) => (
                      <StarIcon key={index} color="primary" />
                    ))}
                    {[...Array(5 - hotel.exact_class)].map((_, index) => (
                      <StarIcon
                        key={index + hotel.exact_class}
                        color="disabled"
                      />
                    ))}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.hotel_description}
                  </Typography>
                </CardContent>
                <Button
                  onClick={() => handleCardClick(hotel)}
                  variant="contained"
                  color="primary"
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    backgroundColor: "#585861",
                    color: "white",
                  }}
                >
                  Reviews
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      {selectedHotel && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            width: "80%",
            border: "2px solid black",
            height: "80%",
            overflow: "auto", // Added overflow for scrolling
          }}
        >
          <div>
            <div>
              <div className="home"></div>
              <div>
                <Button
                  variant="contained"
                  onClick={setUrl}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#585861",
                    color: "white",
                  }}
                >
                  More Info
                </Button>

                <Button
                  variant="contained"
                  onClick={setUrlReview}
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#585861",
                    color: "white",
                  }}
                >
                  Write a Review
                </Button>
              </div>
              <IconButton
                onClick={handleClosePopup}
                color="black"
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  margin: "10px",
                }}
              >
                <CloseSharpIcon />
              </IconButton>
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                style={{
                  marginTop: "5px",
                  color: "#234e9e",
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                {selectedHotel.name}
              </Typography>

              {Array.isArray(selectedHotelReviews) &&
                selectedHotelReviews.map((review, index) => (
                  <div key={index} className="card">
                    <div
                      key={index}
                      className="card"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                        marginRight: "15px",
                        marginLeft: "15px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {review.title}
                      </Typography>
                      {review.pros && (
                        <p>
                          <SentimentSatisfiedAltIcon
                            style={{ color: "#4f8c69" }}
                          />{" "}
                          {review.pros}
                        </p>
                      )}
                      {review.cons && (
                        <p>
                          <SentimentVeryDissatisfiedIcon
                            style={{ color: "#c73232" }}
                          />{" "}
                          {review.cons}
                        </p>
                      )}

                      {review.hotelier_response && (
                        <p>
                          <strong style={{ color: "#333333" }}>
                            Hotelier Response:
                          </strong>{" "}
                          {review.hotelier_response}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
