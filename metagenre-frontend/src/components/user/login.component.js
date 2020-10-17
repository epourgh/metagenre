import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export default function Login() {
    
    const [username, setUsername] = useState({
        username: '',
        password: ''
    });
    
    const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)

    console.log(localStorage)
  
    const signIn = () => {

        if (typeof username.username != undefined && typeof username.password != undefined) {
        fetch(`${backendUrl}/username/login?username=${username.username}&password=${username.password}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.data.length >= 1) {

                    localStorage.setItem('loginId', response.data[0].id)
                    localStorage.setItem('loginUsername', response.data[0].username)

                    if (response.data[0].displayName !== null) {
                        localStorage.setItem('loginDisplay', response.data[0].displayName)
                    }

                    setLoggedIn({
                        id: localStorage.getItem('loginId'),
                        username: localStorage.getItem('loginUsername'),
                        display: localStorage.getItem('loginDisplay')
                    })
                }
            })
            .catch(err => console.log(err))
        }
    }

    const signOut = () => {
        if (loggedIn.id != 0) {
            localStorage.removeItem('loginId');
            localStorage.removeItem('loginUsername');
            localStorage.removeItem('loginDisplay');

            setLoggedIn({
                id: 0,
                username: 'Currently not logged in.',
                display: ''
            })
        }
    }

    function userNav() {
        return (
            <p>
                <b>user id:</b> { loggedIn.id }, <b>display name:</b> { loggedIn.display }, <b>username:</b> { loggedIn.username }
                <p><button onClick={() => signOut()}>Sign Out</button></p>
            </p>
        )
    }

    function notLoggedInNav() {
        return (
            <div className="single-content-container">
                <p>{ loggedIn.username }</p>

                <input value={username.username} 
                       onChange={e => setUsername({ ...username, username: e.target.value })} />
                <br />
                <input value={username.password} 
                        onChange={e => setUsername({ ...username, password: e.target.value })} />
                <button onClick={() => signIn()}>Sign In</button>
                <br />
                <p><Link to="/user/register" className="nav-link">Sign Up</Link> | <Link to="/user/forgot" className="nav-link">Forgot Password</Link></p>
            
                    
            </div>
        )
    }

    const loggedInNavbar = (loggedIn.id !== 0) ? userNav() : notLoggedInNav();

    return (
        <div className="bodyContentStyling">
            {loggedInNavbar}  
        </div>
    )
}
