import React, { createContext, useReducer } from 'react';
import { favReducer} from './fav.reducer'; 
export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const initialState = {
    favs: [], 
  };

  const [favState, favDispatch] = useReducer(favReducer, initialState);

  return (
    <FavContext.Provider value={{ favState, favDispatch }}>
      {children}
    </FavContext.Provider>
  );
};