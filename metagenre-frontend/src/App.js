import React, { useState, useContext, createContext } from 'react';
import { GlobalProvider } from './context/GlobalState';

import './styles/main.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useRoutes} from 'hookrouter';

import Home from "./components/home.component";
import Mail from "./components/mail.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import Mediums from "./components/mediums.component";
import Medium from "./components/medium.component";
import Banner from "./components/template/banner.component";
import Navbar from "./components/template/navbar.component";
import Footer from "./components/template/footer.component";
import ForgotIndex from "./components/forgot/index.component";
import RelationshipsIndex from "./components/relationships/index.component";
import RelationshipsSubgenres from "./components/relationships/subgenres.component";
import Series from "./components/collections/series.component";
import Creator from "./components/collections/creator.component";
import Genre from "./components/collections/genre.component";

const routes = {
  "/home": () => <Home />,
  "/mediums": () => <Mediums />,
  "/medium": () => <Medium />,
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/forgot": () => <ForgotIndex />,
  "/relationships": () => <RelationshipsIndex />,
  "/relationships/subgenres": () => <RelationshipsSubgenres />,
  "/series": () => <Series />,
  "/creator": () => <Creator />,
  "/genre": () => <Genre />
};

export default function App() {

  const routeResult = useRoutes(routes);

  return (
    <Router>
        <GlobalProvider>
          <div className="header-content">
            <Banner /> 
            <Navbar />
          </div>
          <div className='body'>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/mail" exact component={Mail} />
              <Route path="/mediums" exact component={Mediums} />
              <Route path="/medium" exact component={Medium} />
              <Route path="/Register" exact component={Register} /> 
              <Route path="/Login" exact component={Login} />
              <Route path="/forgot" exact component={ForgotIndex} />
              <Route path="/relationships" exact component={RelationshipsIndex} />
              <Route path="/relationships/subgenres" exact component={RelationshipsSubgenres} />
              <Route path="/series" exact component={Series} />
              <Route path="/creator" exact component={Creator} />
              <Route path="/genre" exact component={Genre} />
              <Route path="/profile" exact component={Profile} />
            </Switch>
          </div>
          <Footer />
        </GlobalProvider>
      </Router>
  );
}
