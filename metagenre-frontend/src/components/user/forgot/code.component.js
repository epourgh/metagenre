import React, {useContext, useState} from 'react';
import { GlobalContext } from '../../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();
    const username = url.searchParams.get("username").toString();
    const retrieve = url.searchParams.get("retrieve").toString();
    return [id, username, retrieve];
}

export default function ForgotIndex() {
  const [id, username, retrieve] = getWindowParam();
  const { backendUrl, loggedIn} = useContext(GlobalContext)
  const [code, setCode] = useState('');

  const submission = () => {
    if (typeof code !== undefined || code !== '') {
      if (retrieve === 'verification') {
        fetch(`${backendUrl}/verified?username=${username}&inputChecksum=${code}`)
          .then(res => {
              console.log(res);
              if (loggedIn.id === 0) {
                window.location.href = `/user/login`;
              } else {
                window.location.href = `/`;
              }
              
          })
          .catch(err => console.log(err))
      } else if (retrieve === 'password') {
        fetch(`${backendUrl}/retrieve/update?userId=${id}&inputChecksum=${code}`)
          .then(res => {
              console.log(res);
              window.location.href = `./change?id=${id}`;
          })
          .catch(err => console.log(err))
      }
    }
  }

  return (
    <div className="login-container">
        <ul>
          <li className="navbar-item">
              <label>Type in your code: </label>
              <input value={code} 
                  onChange={e => setCode(e.target.value)} />
              <br />
          </li>
          <li className="navbar-item">
              <br />
              <button onClick={() => submission()}>Submit</button>
          </li>
        </ul>
    </div>
  );
}