// src/context/LikeContext.js
import { createContext, useState, useEffect } from 'react';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedIds, setLikedIds] = useState([]); 

  const toggleLike = async (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <LikeContext.Provider value={{ likedIds, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export default LikeProvider