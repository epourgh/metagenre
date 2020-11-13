import React, { useState, createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();


export const ACTIONS = {
    SIGN_IN: 'sign-in',
    SIGN_OUT: 'sign-out'
}

function reducer(userCredentials, action) {
    switch (action.type) {
        case ACTIONS.SIGN_IN:
            return signIn(action.payload);
        case ACTIONS.SIGN_OUT:
            return {
              id: 0,
              username: 'Currently not logged in.',
              display: '-',
              time: Date.now()
            };    
        default:
            return userCredentials
    }
}

function signIn(payload) {
  return {
    id: payload.id,
    username: payload.username,
    display: payload.display,
    time: Date.now()
  }
}

export const GlobalProvider = ({ children }) => {

  const [mediums, setMediums] = useState([{
    id: 0,
    tag: 0,
    title: '',
    active: 0
  }]);

  const [genres, setGenres] = useState([{id: 0, name: ''}]);
  const [subgenres, setSubgenres] = useState([{id: 0, name: ''}]);
  const [showNavStyle, setShowNavStyle] = useState('navbar');

  // const backendUrl = '/api';
  const backendUrl = 'http://localhost:4000';

  const [userCredentials, dispatch] = useReducer(reducer, []);

  const [loggedIn, setLoggedIn] = useState({
      id: localStorage.getItem('loginId') || 0,
      username: localStorage.getItem('loginUsername') || 'Currently not logged in.',
      display: localStorage.getItem('loginDisplay') || '-'
  })
  
  useEffect(() => {

    getMediums();
    getGenres();
    getSubgenres();

    const reducerInitState =  {id: localStorage.getItem('reducer-id') || 0, 
                               username: localStorage.getItem('reducer-username') || 'Currently not logged in.', 
                               display: localStorage.getItem('reducer-display') || '-'};

    dispatch({type: ACTIONS.SIGN_IN, payload: reducerInitState});

  }, []);

  useEffect(() => {
    localStorage.setItem('reducer-id', userCredentials.id);
    localStorage.setItem('reducer-username', userCredentials.username);
    localStorage.setItem('reducer-display', userCredentials.display);
  }, [userCredentials]);
  

  const getMediums = () => {
    fetch(`${backendUrl}/mediumsForSearch`)
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
    fetch(`${backendUrl}/genres`)
      .then(response => response.json())
      .then(response => {
        setGenres(response.data)
      });
  }

  const getSubgenres = () => {
    fetch(`${backendUrl}/subgenres`)
      .then(response => response.json())
      .then(response => {
        setSubgenres(response.data)
      });
  }

  return (
    <GlobalContext.Provider value={
      {
        backendUrl,
        loggedIn,
        setLoggedIn,
        mediums,
        setMediums,
        genres,
        subgenres,
        showNavStyle,
        setShowNavStyle,
        userCredentials,
        dispatch
      }
    }>
      {children}
    </GlobalContext.Provider>
  );
};