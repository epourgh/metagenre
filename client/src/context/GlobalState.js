import React, { useState, createContext, useEffect, useReducer } from "react";
import combineReducers from "./reducers/combineReducers";
import dispatchMiddleware from "./middleware/async";
import user from "./reducers/user";
import medium from "./reducers/medium";
import relationship from "./reducers/relationship";
import home from "./reducers/home";
import global from "./reducers/global";
import { userInitState, mediumInitState, relationshipInitState, homeInitState, globalInitState } from "./reducers/init"
import { actionUser, actionMedium, actionRelationship, actionHome, actionGlobal } from "./actions/index";

export const GlobalContext = createContext();
export const DispatchContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [mediums, setMediums] = useState([{ id: 0, tag: 0, title: '', active: 0 }]);
  const [genres, setGenres] = useState([{id: 0, name: ''}]);
  const [subgenres, setSubgenres] = useState([{id: 0, name: ''}]);
  const [showNavStyle, setShowNavStyle] = useState('navbar');

  // const backendUrl = 'http://localhost:4000'; // docker container does not need localhost with local nginx
  const backendUrl = '/api';

  const [reducers, dispatch] = useReducer(combineReducers({
    user: user,
    medium: medium,
    relationship: relationship,
    home: home,
    global: global
  }), { user: [], medium: [], relationship: [], home: [], global: [] });
  
  useEffect(() => {

    dispatchRequestsCallback();

    dispatchMiddleware(dispatch)(actionUser.signIn(userInitState));
    dispatchMiddleware(dispatch)(actionMedium.actionMediumInit(mediumInitState));
    dispatchMiddleware(dispatch)(actionRelationship.actionRelationshipInit(relationshipInitState));
    dispatchMiddleware(dispatch)(actionHome.actionHomeInit(homeInitState));
    dispatchMiddleware(dispatch)(actionGlobal.actionGlobalInit(globalInitState));

  }, []);

  useEffect(() => {
    setMediums((typeof reducers.global.mediums !== "undefined")?reducers.global.mediums:[{ id: 0, tag: 0, title: '', active: 0 }]);
    setGenres((typeof reducers.global.genres !== "undefined")?reducers.global.genres:[{id: 0, name: ''}]);
    setSubgenres((typeof reducers.global.subgenres !== "undefined")?reducers.global.subgenres:[{id: 0, name: ''}]);

    localStorage.setItem('reducer-id', reducers.user.id);
    localStorage.setItem('reducer-username', reducers.user.username);
    localStorage.setItem('reducer-display', reducers.user.display);
  }, [reducers]);

  const dispatchRequestsCallback = () => {
      dispatchRequests.mediums();
      dispatchRequests.genres();
      dispatchRequests.subgenres();
  }

  const dispatchRequests = {
      mediums: () => {
          dispatchMiddleware(dispatch)(actionGlobal.actionGlobalMediums({url: `${backendUrl}/mediumsForSearch`}));
      },
      genres: () => {
          dispatchMiddleware(dispatch)(actionGlobal.actionGlobalGenres({url: `${backendUrl}/genres`}));
      },
      subgenres: () => {
          dispatchMiddleware(dispatch)(actionGlobal.actionGlobalSubgenres({url: `${backendUrl}/subgenres`}));
      }
  }

  return (
    <GlobalContext.Provider value={{ backendUrl, mediums, setMediums, genres, subgenres, showNavStyle, setShowNavStyle, reducers }}>
      <DispatchContext.Provider value={{dispatchMiddleware, dispatch}}>
        {children}
      </DispatchContext.Provider>
    </GlobalContext.Provider>
  );
};