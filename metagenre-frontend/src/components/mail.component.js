import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function Mail() {
  const {backendUrl} = useContext(GlobalContext)

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
          <button onClick={() => sendMail()}>sent</button>
        </>
  );
}