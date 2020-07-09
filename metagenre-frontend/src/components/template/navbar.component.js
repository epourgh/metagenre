import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

// (loggedIn.id !== 'N/A')


export default function Navbar() {
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)
  const loggedInNavbar = (loggedIn.id !== 0) ? userNav() : notLoggedInNav();

  const signOut = () => {
    if (loggedIn.id !== 0) {
      localStorage.removeItem('loginId');
      localStorage.removeItem('loginUsername');

      setLoggedIn({
        id: 0,
        username: 'Currently not logged in.'
      })
    }
  }

  function userNav() {
      return (
          <span>
              <li className="navbar-item"><Link to="">{ loggedIn.username.toUpperCase() }</Link></li>
              <li className="navbar-item"><a onClick={() => signOut()}>SIGN OUT</a></li>
          </span>
      )
  }

  function notLoggedInNav() {
    return (
      <>
        <li className="navbar-item">
          <Link to="/login" className="nav-link">SIGN IN</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register" className="nav-link">REGISTER</Link>
        </li>
      </>
    )
  }
  return (
    <nav className="row navbar">
      <ul className="column">
        <li className="navbar-item">
          <Link to="/" className="nav-link">HOME</Link>
        </li>
        {loggedInNavbar}  
        <li className="navbar-item">
          <Link to="/mediums?medium=game" className="nav-link">GAMES</Link>
        </li>
        {/* 
        <li className="navbar-item">
          <Link to="/mediums?medium=film" className="nav-link">FILMS</Link>
        </li>
        <li className="navbar-item">
          <Link to="/mediums?medium=tv show" className="nav-link">TV SERIES</Link>
        </li>
        <li className="navbar-item">
          <Link to="/mediums?medium=music" className="nav-link">MUSIC</Link>
        </li> 
        <li className="navbar-item">
          <Link to="/mediums?medium=book" className="nav-link">BOOKS</Link>
        </li> 
        */}
        <li className="navbar-item">
          <Link to="/relationships" className="nav-link">RELATIONSHIPS</Link>
        </li>
      </ul>
    </nav>
  );
}