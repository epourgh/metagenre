import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();

    return id;
}

export default function ForgotIndex() {
  const id = getWindowParam();
  const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)
  const [code, setCode] = useState('');

  const reset = () => {
    if (typeof code != undefined || code != '') {
      fetch(`${backendUrl}/retrieve/update?userId=${id}&inputChecksum=${code}`)
        .then(res => {
            console.log(res);
            window.location.href = './change'
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="bodyContentStyling">
        <div className="single-content-container">
          <ul>
            <li className="navbar-item">
                <label>Type in your code: </label>
                <input value={code} 
                    onChange={e => setCode(e.target.value)} />
                <br />
            </li>
          </ul>
          <br />
          <button onClick={() => reset()}>Submit</button>
      </div>
    </div>
  );
}