import "./App.css";
import React from 'react';
import { useReducer } from "react";
import { Home } from "./Components/home/home";
import { WriteReview } from "./Components/writeReview/writeReview"

import { Header } from "./Components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ReviewContext } from "./Components/state/review/review-context";
import { ReviewReducer } from "./Components/state/review/review.reducer";

function App() {
  
    const [todoState, todoDispatch] = useReducer(ReviewReducer, {
      todos: [
        /*  {
            title: "Buy Milk",
             isComplete: false,
          },
          {
            title: "Walk Dog",
            isComplete: true,
           }, */
      ],
    });
  return (
    <HashRouter>
      <Header />
      <ReviewContext.Provider value={{ todoState, todoDispatch }}>
        <Routes>
          {/* http://localhost:3000/#/ */}
          <Route path="/" element={<Home />} />
          {/* http://localhost:3000/#/writeReview */}
          <Route path="/writeReview" element={<WriteReview />} />
         
        </Routes>
        </ReviewContext.Provider>
    </HashRouter>
  );
}

export default App;
 