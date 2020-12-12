import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext, DispatchContext } from '../../context/GlobalState';
import { actionUser } from '../../context/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser, faKey } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    
    const [username, setUsername] = useState({
        username: '',
        password: ''
    });
    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState('password')

    const { dispatchMiddleware, dispatch } = useContext(DispatchContext);
    const {backendUrl, reducers} = useContext(GlobalContext);

    console.log(localStorage);
  
    const signIn = () => {

        if (typeof username.username !== undefined && typeof username.password !== undefined) {
            fetch(`${backendUrl}/username/login?username=${username.username}&password=${username.password}`)
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    if (response.data.length >= 1) {
                        localStorage.setItem('loginId', response.data[0].id)
                        localStorage.setItem('loginUsername', response.data[0].username)
                        localStorage.setItem('token', response.token)
                        

                        if (response.data[0].displayName !== null) {
                            localStorage.setItem('loginDisplay', response.data[0].displayName)
                        }

                        dispatchMiddleware(dispatch)(actionUser.signIn({
                            id: localStorage.getItem('loginId'),
                            username: localStorage.getItem('loginUsername'),
                            display: localStorage.getItem('loginDisplay')
                        }));
                        
                    }
                })
                .catch(err => console.log(err))
        }


    }

    const signOut = () => {
        if (reducers.user.id !== 0) {
            localStorage.removeItem('reducer-id');
            localStorage.removeItem('reducer-username');
            localStorage.removeItem('reducer-display');

            dispatchMiddleware(dispatch)(actionUser.signOut());
        }
    }

    function userNav() {
        return (
            <p>
                <b>user id:</b> { reducers.user.id }, <b>display name:</b> { reducers.user.display }, <b>username:</b> { reducers.user.username }
                <p><button onClick={() => signOut()}>Sign Out</button></p>
            </p>
        )
    }

    function togglePasswordVisibility() {

        const changeText = (typeof passwordVisibilityToggle==='undefined' || passwordVisibilityToggle==='password')?'text':'password';
        console.log(changeText)
        setPasswordVisibilityToggle(changeText);
    }

    function notLoggedInNav() {
        return (
                <div className="login-container">

                    <div className="login-title">
                        <h2>Welcome</h2>
                    </div>

                    <button className="user-login-icon"><FontAwesomeIcon icon={faUser}/></button><input value={username.username}
                           className="user-input"
                           placeholder={"Username"}
                           onChange={e => setUsername({ ...username, username: e.target.value })} />
                    
                    <br />

                    <button className="user-login-icon"><FontAwesomeIcon icon={faKey}/></button><input value={username.password} 
                           className="password-input"
                           type={passwordVisibilityToggle || 'password'}
                           placeholder={"Password"}
                           onChange={e => setUsername({ ...username, password: e.target.value })} /><button onClick={() => togglePasswordVisibility()} className="password-view-toggle"><FontAwesomeIcon icon={faEye}/></button>

                    <button onClick={() => signIn()}>Sign In</button>

                    <br />

                    <div className="login-options">
                        <p><Link to="/user/register" className="nav-link">Sign Up</Link> | <Link to="/user/forgot" className="nav-link">Forgot Password</Link></p>
                    </div>

                </div>
        )
    }

    const loggedInNavbar = (reducers.user.id !== 0) ? userNav() : notLoggedInNav();

    return (
        <div className="bodyContentStyling">
            {loggedInNavbar}  
        </div>
    )
}

