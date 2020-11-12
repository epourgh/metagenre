import React, {useContext, useState} from 'react';
import { GlobalContext } from '../context/GlobalState';

export default function Mail() {
  const {backendUrl} = useContext(GlobalContext) || 0;
  const [value, setValue] = useState('');

  const sendMail = () => {

    fetch(`${backendUrl}/mail/`)
      .then(response => {
        console.log(response)
        // getMediumsGenres(routeString);
      })
      .catch(err => console.log(err))
      
      setValue('');

  }

  return (
        <>
          <br /> <br /><br /><br /> <br /><br />
          <form onSubmit={() => sendMail()}>
            <textarea value={value} onChange={e => setValue(e.target.value)}/>
            <button>sent</button>
          </form>
        </>
  );
}