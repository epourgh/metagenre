import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function Mail() {
  const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)

  const sendMail = () => {

    fetch(`${backendUrl}/mail/`)
      .then(response => {
        console.log(response)
        // getMediumsGenres(routeString);
      })
      .catch(err => console.log(err))

  }

  return (
        <>
          <br /> <br /><br /><br /> <br /><br />
          <a onClick={() => sendMail()}>sent</a>
        </>
  );
}