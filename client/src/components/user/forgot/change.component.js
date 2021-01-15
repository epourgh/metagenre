import React, {useContext, useState} from 'react';
import { GlobalContext } from '../../../context/GlobalState';
const md5 = require("md5");


function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();

    return id;
}

export default function ForgotIndex() {
    const id = getWindowParam();
    const {backendUrl} = useContext(GlobalContext)
    const [passwordObject, setPasswordObject] = useState({
        password: '',
        password2: ''    
    });


  const changePassword = () => {

    if(passwordObject.password === passwordObject.password2) {

        const hashedPassword = hash(passwordObject.password);
        console.log(compare(passwordObject.password, hashedPassword));
        
        function hash(rawPassword, options = {}) {
            /**
             * salt is optional, if not provided it will be set to current timestamp
             */
            const salt = options.salt ? options.salt : new Date().getTime();
    
            /**
             * rounds is optional, if not provided it will be set to 10
             */
            const rounds = options.rounds ? options.rounds : 10;
    
            let hashed = md5(rawPassword + salt);
            for (let i = 0; i <= rounds; i++) {
            hashed = md5(hashed);
            }
            return `${salt}$${rounds}$${hashed}`;
        }
    
        function compare(rawPassword, hashedPassword) {
            try {
            const [ salt, rounds ] = hashedPassword.split('$');
            const hashedRawPassword = hash(rawPassword, { salt, rounds });
            return hashedPassword === hashedRawPassword;
            } catch (error) {
            throw Error(error.message);
            }
        }
    
        if (typeof passwordObject.username != undefined && typeof passwordObject.password != undefined) {
          fetch(`${backendUrl}/password/update?userId=${id}&password=${hashedPassword}`)
            .then(res => {
                console.log(res);
                window.location.href = '../login'
            })
            .catch(err => console.log(err))
        }
    } else {
        console.log('passwords do not match')
    }


  }

  return (
    <div className="login-container">

        <h2>Change Password</h2>
        <br />

        <label>Password: </label>
        <input value={passwordObject.password} 
            onChange={e => setPasswordObject({ ...passwordObject, password: e.target.value })} />
        <br />

        <label>Retype Password: </label>
        <input value={passwordObject.password2} 
            onChange={e => setPasswordObject({ ...passwordObject, password2: e.target.value })} />
        <br />

        <br />
        <button onClick={() => changePassword()}>Submit</button>
        
    </div>
  );
}