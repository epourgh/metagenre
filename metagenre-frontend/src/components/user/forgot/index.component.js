import React, {useContext, useState} from 'react';
import { GlobalContext } from '../../../context/GlobalState';

export default function ForgotIndex() {
  const {backendUrl} = useContext(GlobalContext)
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [type, setType] = useState('');

  const typeHandler = (typeChosen) => setType(typeChosen);

  const retrieve = () => {
    if (typeof usernameOrEmail !== undefined || usernameOrEmail !== '') {
      if (type==='oneTimeEmail') {
        fetch(`${backendUrl}/retrieve/password?usernameOrEmail=${usernameOrEmail}`)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else if (type==='securityQuestion') {
        fetch(`${backendUrl}/userSelectedSecurityQuestions?usernameOrEmail=${usernameOrEmail}`)
          .then(response => response.json())
          .then(res => {
            const userData = res.data[0];
            console.log(userData);
            window.location.href = `./security?id=${userData.id}&q1id=${userData.securityQuestion1id}&q2id=${userData.securityQuestion2id}`;
          })
          .catch(err => console.log(err))
      }
    }
  }

  return (
    <div className="bodyContentStyling">
        <div className="single-content-container">
          <ul>
            <li className="navbar-item">
              <label>Password Retrieval Method: </label>
              <button className={`${type}Input`} onClick={() => typeHandler('securityQuestion')}>Security Questions</button>{" "}
              <button className={`${type}Code`}  onClick={() => typeHandler('oneTimeEmail')}>Email One time Code</button>
            </li> 
            <br/><br/>
            <li className="navbar-item">
                <label>Type in your username or email: </label>
                <input value={usernameOrEmail} 
                    onChange={e => setUsernameOrEmail(e.target.value)} />
                <br />
            </li>
            <br/><br/>
            <li className="navbar-item">
                <button onClick={() => retrieve()}>Continue</button>
                <br />
            </li>
          </ul>
      </div>
    </div>
  );
}