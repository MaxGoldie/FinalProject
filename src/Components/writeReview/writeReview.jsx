import React, { useState, useEffect  } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useInterval } from "../../hooks/use-interval";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ButtonGroup } from "@mui/material";
export const WriteReview = () => {
  const { hotelId } = useParams();
  const [reviews, ] = useState([]);
  const [currentReviews, setCurrentReviews] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [inputReviews, setReviewsInput] = useState("");
  const [inputUser, setUserInput] = useState("");
 
  function getReviews() {
    fetch('https://booking-com.p.rapidapi.com/v1/hotels/reviews')
      .then((response) => response.json())
      .then((data) => {
        console.log("Reviews:");
        console.log(data);

        setReviews(data.Items);
      });
  }

  function setReviews(reviews) {
    setCurrentReviews(reviews);
    getMessages(reviews.id);
  }

  
  function getMessages(revieweviewId) {
    fetch(
      `https://booking-com.p.rapidapi.com/v1/hotels/${hotelId}/reviews`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("messages:");
        console.log(data);

        setMessages(data.Items);
      });
  }function postMessage() {
    if (currentReviews != null) {
      const message = {
        reviewId: currentReviews.id, // required, must be an existing review id
        username: inputUser || "anonymous", // required
        text: inputMessage, // required
      };
  
      fetch(`https://booking-com.p.rapidapi.com/v1/hotels/${hotelId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(message),
      }).then(() => {
        setInputMessage("");
        getMessages(currentReviews.id); // Refresh messages after posting
      });
    } else {
      console.log("Cannot post a message because currentReviews is null");
    }
  }

  function onMessageInput(event) {
    console.log(event);
    setInputMessage(event.target.value);
  }

  function onReviewsInput(event) {
    console.log(event);
    setReviewsInput(event.target.value);
  }

  function onUserInput(event) {
    console.log(event);
    setUserInput(event.target.value);
  }

  function newReview() {
    const review = {
      name: inputReviews,
    };
  
    fetch("https://booking-com.p.rapidapi.com/v1/hotels/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(review),
    }).then(() => {
      setReviewsInput("");
      getReviews(); // Refresh reviews after creating a new one
    });
  }
  
  useEffect(() => {
    getReviews();
  }, []);

  useInterval(
    (params) => {
      const reviewId = params[0];
      if (reviewId) {
        getMessages(reviewId);
      }
    },
    1000,
    currentReviews && currentReviews.id
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(247, 214, 247);",
      },
      neutral: {
        main: "rgb(31, 31, 84);",
        contrastText: "#fff",
      },
    },
  });
  
  /* const postReview = async () => {
    const hotelId = '1676161';
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/${hotelId}/reviews`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '0e0602343bmsh79610e03408b8f6p1120dbjsn2457c05436c7',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      },
      body: JSON.stringify({
        review_text: inputReview
      })
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
  
      // Add the submitted review to the submittedReviews state
      setSubmittedReviews([...submittedReviews, data]);
  
      // Fetch updated reviews after posting

      fetchHotelReviews();
      setInputReview('');
    } catch (error) {
      console.error(error);
    }
  }; */

  return (
    <div class="pages">
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <div>
          <div style={{ paddingTop: "60px" }}>
            <TextField
              onInput={onUserInput}
              value={inputUser}
              id="standard-basic"
              label="Enter Username"
              variant="standard"
            />
          </div>

          <div style={{ paddingTop: "60px" }}>
          <TextField
  onInput={onReviewsInput}
  value={inputReviews}
  id="standard-basic"
  label="New Review"
  variant="standard"
/>

<Button
  color="neutral"
  variant="contained"
  onClick={newReview}
>
  Enter
</Button>

          </div>
          <h2 style={{ color: "gray" }}>Chats</h2>

          {reviews.map((review) => (
            <div key={review.id}>
              <ButtonGroup>
                <Button color="neutral" onClick={() => setReviews(review)}>
                  {review.name}
                </Button>
              </ButtonGroup>
            </div>
          ))}
        </div>
        <div style={{ padding: "60px" }}>
          <h2 style={{ color: "darkgray" }}>
            Username: {inputUser || "Anonymous"}
          </h2>
          <h2 style={{ color: "darkgray" }}>
            Chat: {currentReviews && currentReviews.name}
          </h2>
          <div>
          <TextField
  onInput={onMessageInput}
  value={inputMessage}
  id="standard-basic"
  label="Type message"
  variant="standard"
/>

<Button
  color="neutral"
  variant="contained"
  onClick={postMessage}
>
  POST
</Button>

          </div>
          <div>
            {messages.map((message) => (
              <div key={message.id}>
                {message.username}: {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  </div>
  );
};