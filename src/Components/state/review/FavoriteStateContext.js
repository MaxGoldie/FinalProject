import React, { createContext, useState } from 'react';

export const FavoriteStateContext = createContext();

export const FavoritesStateProvider = ({ children }) => {
  const [favoriteHotels, setFavoriteHotels] = useState([]);

  const addFavoriteHotel = (hotelId) => {
    setFavoriteHotels((prevFavorites) => [...prevFavorites, hotelId]);
  };

  return (
    <FavoriteStateContext.Provider value={{ favoriteHotels, addFavoriteHotel }}>
      {children}
    </FavoriteStateContext.Provider>
  );
};
