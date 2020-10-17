import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalState';

export default function ForgotIndex() {
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul>
        <li className="navbar-item">
          <b>What would you like to retrieve?</b>
        </li>
        <li className="navbar-item">
          <Link to="/user/forgot/retrieve">Retrieve Password</Link>{" "}
          <Link to="/user/forgot/secure">Security Questions</Link>
        </li>
      </ul>
    </>
  );
}