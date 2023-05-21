import { createContext, useReducer } from 'react';

const initialState = { reviews: [] };

const ReviewsContext = createContext(initialState);

const reviewsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    case 'DELETE_REVIEW':
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
      };
    default:
      return state;
  }
};

const ReviewsProvider = ({ children }) => {
  const [reviewsState, reviewsDispatch] = useReducer(reviewsReducer, initialState);

  return (
    <ReviewsContext.Provider value={{ reviewsState, reviewsDispatch }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };
