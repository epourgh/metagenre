import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export default function ForgotIndex() {
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)

  return (
      <ul>
        <li className="navbar-item">
          <b>What would you like to retrieve?</b>
        </li>
        <li className="navbar-item">
          <Link to="/forgot/password">Password</Link>
        </li>
        <li className="navbar-item">
          <Link to="/forgot/username">Username</Link>
        </li>
      </ul>
  );
}