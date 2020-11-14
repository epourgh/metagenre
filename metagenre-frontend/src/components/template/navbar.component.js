import React, {useContext} from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext, ACTIONS } from '../../context/GlobalState';

// (loggedIn.id !== 'N/A')

export default function Navbar() {
  const { showNavStyle, userCredentials, dispatch } = useContext(GlobalContext)
  let loggedInNavbar = (userCredentials.id !== 0) ? userNav() : notLoggedInNav();
  

  const signOut = () => {
    if (userCredentials.id !== 0) {
      
      localStorage.removeItem('reducer-id');
      localStorage.removeItem('reducer-username');
      localStorage.removeItem('reducer-display');

      dispatch({type: ACTIONS.SIGN_OUT});
    }
  }
  function userNav() {
       return (
          <span>
              <li className="navbar-item"><Link to="/user/profile">{ userCredentials.username }</Link></li>
              <li className="navbar-item"><span onClick={() => signOut()}>SIGN OUT</span></li>
          </span>
      )
  }

  function notLoggedInNav() {
    return (
      <>
        <li className="navbar-item">
          <Link to="/user/login" className="nav-link">SIGN IN</Link>
        </li>
        <li className="navbar-item">
          <Link to="/user/register" className="nav-link">REGISTER</Link>
        </li>
      </>
    )
  }
  return (
    <nav className={`row ${showNavStyle}`}>
      <ul className="column">
        <li className="navbar-item">
          <Link to="/" className="nav-link">HOME</Link>
        </li>
        {loggedInNavbar}  
        <li className="navbar-item">
          <Link to="/mediums?medium=game" className="nav-link">GAMES</Link>
        </li>
        <li className="navbar-item">
          <Link to="/relationships" className="nav-link">RELATIONSHIPS</Link>
        </li>
      </ul>
    </nav>
  );
}