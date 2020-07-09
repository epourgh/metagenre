import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState({
      id: localStorage.getItem('loginId') || 0,
      username: localStorage.getItem('loginUsername') || 'Currently not logged in.'
  })

  return (
    <GlobalContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </GlobalContext.Provider>
  );
};