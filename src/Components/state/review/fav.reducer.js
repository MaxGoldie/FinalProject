import { cloneDeep } from "lodash";

export const FavActions = {
 
  DELETE: "DELETE",
};

export const favReducer = (state, action) => {
  switch (action.type) {
    
    case FavActions.DELETE: {
      return {
        favs: state.favs.filter(fav => fav.hotelname!== action.payload),
      };
      }

  
  }
};
