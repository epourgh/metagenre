import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotIndex() {

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
          {/* <Link to="/user/forgot/secure">Security Questions</Link> */}
        </li>
      </ul>
    </>
  );
}