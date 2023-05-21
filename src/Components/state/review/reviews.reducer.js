

export const ReviewActions = {
  ADD: "ADD",
};

export const ReviewsReducer = (state, action) => {
  return { reviews: [action.review, ...state.reviews] }
};
