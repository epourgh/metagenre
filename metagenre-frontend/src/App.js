import React from 'react';
import { GlobalProvider } from './context/GlobalState';

import './styles/main.scss';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./components/home.component";
import Mail from "./components/mail.component";

import Register from "./components/user/register.component";
import Login from "./components/user/login.component";
import ForgotIndex from "./components/user/forgot/index.component";
import ForgotCode from "./components/user/forgot/code.component";
import ForgotChange from "./components/user/forgot/change.component";
import Profile from "./components/user/profile.component";
import Security from "./components/user/forgot/security.component";


import Mediums from "./components/mediums.component";
import Medium from "./components/medium.component";
import Banner from "./components/template/banner.component";
import Navbar from "./components/template/navbar.component";
import Footer from "./components/template/footer.component";
import RelationshipsIndex from "./components/relationships/index.component";
import RelationshipsSubgenres from "./components/relationships/subgenres.component";
import Series from "./components/collections/series.component";
import Creator from "./components/collections/creator.component";
import Genre from "./components/collections/genre.component";

export default function App() {

  // const routeResult = useRoutes(routes);

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
              <Route path="/relationships" exact component={RelationshipsIndex} />
              <Route path="/relationships/subgenres" exact component={RelationshipsSubgenres} />
              <Route path="/series" exact component={Series} />
              <Route path="/creator" exact component={Creator} />
              <Route path="/genre" exact component={Genre} />

              <Route path="/user/register" exact component={Register} /> 
              <Route path="/user/login" exact component={Login} />
              <Route path="/user/forgot" exact component={ForgotIndex} />
              <Route path="/user/forgot/code" exact component={ForgotCode} />
              <Route path="/user/forgot/change" exact component={ForgotChange} /> 
              <Route path="/user/profile" exact component={Profile} />
              <Route path="/user/security" exact component={Security} />
              

            </Switch>
          </div>
          <Footer />
        </GlobalProvider>
      </Router>
  );
}
