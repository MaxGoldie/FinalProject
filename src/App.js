import "./App.css";
import React from 'react';
import { useReducer } from "react";
import { Home } from "./Components/home/home";
import { WriteReview } from "./Components/writeReview/writeReview";
import { MoreInfo } from "./Components/moreInfo/moreInfo";

import { Header } from "./Components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ReviewsContext } from "./Components/state/review/reviews-context";
import { ReviewsReducer } from "./Components/state/review/reviews.reducer";
import { Component } from "react";

function App() {
  
    const [reviewsState, reviewsDispatch] = useReducer(ReviewsReducer, {
      reviews: [
        
      ],
    });
  return (
    <HashRouter>
      <Header />
      <ReviewsContext.Provider value={{ reviewsState, reviewsDispatch }}>
        <Routes>
          {/* http://localhost:3000/#/ */}
          <Route path="/" element={<Home />} />
          {/* http://localhost:3000/#/writeReview/{id} */}
          <Route path="/writeReview/:hotelId" element={<WriteReview />} />
          {/* http://localhost:3000/#/moreInfo/{id} */}
          <Route path="/moreInfo/:hotelId" element={<MoreInfo />} />
         
        </Routes>
        </ReviewsContext.Provider>
    </HashRouter>
  );
}

export default App;
 