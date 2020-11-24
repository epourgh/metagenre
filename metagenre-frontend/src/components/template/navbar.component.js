import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext} from '../../context/GlobalState';
import { actionSignOut } from '../../context/actions/index'

// (loggedIn.id !== 'N/A')

export default function Navbar() {
  const { showNavStyle, reducers, dispatch } = useContext(GlobalContext)
  let loggedInNavbar = (reducers.user.id !== 0 && reducers !== null) ? userNav() : notLoggedInNav();

  const signOut = () => {
    if (reducers.user.id !== 0) {
      
      localStorage.removeItem('reducer-id');
      localStorage.removeItem('reducer-username');
      localStorage.removeItem('reducer-display');

      dispatch(actionSignOut());
    }
  }

  function userNav() {
       return (
          <span>
              <li className="navbar-item"><Link to="/user/profile">{ reducers.user.username }</Link></li>
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