import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

// (loggedIn.id !== 'N/A')

export default function Navbar() {
  const { loggedIn, setLoggedIn, showNavStyle } = useContext(GlobalContext)
  const loggedInNavbar = (loggedIn.id !== 0) ? userNav() : notLoggedInNav();
  

  const signOut = () => {
    if (loggedIn.id !== 0) {
      localStorage.removeItem('loginId');
      localStorage.removeItem('loginUsername');
      localStorage.removeItem('loginDisplay');

      setLoggedIn({
        id: 0,
        username: 'Currently not logged in.',
        display: '-'
      })
    }
  }

  function userNav() {
      return (
          <span>
              <li className="navbar-item"><Link to="/user/profile">{ loggedIn.username.toUpperCase() }</Link></li>
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