import React, {useContext, useState} from 'react';
import { GlobalContext } from '../../../context/GlobalState';

export default function ForgotIndex() {
  const {backendUrl} = useContext(GlobalContext)
  const [usernameOrEmail, setUsernameOrEmail] = useState('');

  const retrieve = () => {
    if (typeof usernameOrEmail !== undefined || usernameOrEmail !== '') {
      fetch(`${backendUrl}/retrieve/password?usernameOrEmail=${usernameOrEmail}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="bodyContentStyling">
        <div className="single-content-container">
          <ul>
            <li className="navbar-item">
                <label>Type in your username or email: </label>
                <input value={usernameOrEmail} 
                    onChange={e => setUsernameOrEmail(e.target.value)} />
                <br />
            </li>
          </ul>
          <br />
          <button onClick={() => retrieve()}>send verification email</button>
      </div>
    </div>
  );
}