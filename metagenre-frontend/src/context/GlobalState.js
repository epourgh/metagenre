import React, { useState, createContext, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [mediums, setMediums] = useState([{
    id: 0,
    tag: 0,
    title: '',
    active: 0
  }]);

  const [genres, setGenres] = useState([{id: 0, name: ''}]);
  const [subgenres, setSubgenres] = useState([{id: 0, name: ''}]);
  

  useEffect(() => {
    getMediums();
    getGenres();
    getSubgenres();
  }, []);

  const [loggedIn, setLoggedIn] = useState({
      id: localStorage.getItem('loginId') || 0,
      username: localStorage.getItem('loginUsername') || 'Currently not logged in.'
  })

  const getMediums = () => {
    fetch(`/api/mediumsForSearch`)
      .then(response => response.json())
      .then(response => {
        setMediums(response.data.map(medium => {
          return {
            id: medium.id,
            tag: medium.title.toLowerCase(),
            title: medium.title,
            active: 0
          };
        }))
      });
  }

  const getGenres = () => {
    fetch(`/api/genres`)
      .then(response => response.json())
      .then(response => {
        setGenres(response.data)
      });
  }

  const getSubgenres = () => {
    fetch(`/api/subgenres`)
      .then(response => response.json())
      .then(response => {
        setSubgenres(response.data)
      });
  }

  return (
    <GlobalContext.Provider value={{loggedIn, setLoggedIn, mediums, setMediums, genres, subgenres}}>
      {children}
    </GlobalContext.Provider>
  );
};