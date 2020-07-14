import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function Login() {
    
    const [username, setUsername] = useState({
        username: '',
        password: ''
    });
    
    const {loggedIn, setLoggedIn} = useContext(GlobalContext)

    console.log(localStorage)
  
    const signIn = () => {

        if (typeof username.username != undefined && typeof username.password != undefined) {
        fetch(`http://localhost:4000/username/login?username=${username.username}&password=${username.password}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.data.length >= 1) {

                    localStorage.setItem('loginId', response.data[0].id)
                    localStorage.setItem('loginUsername', response.data[0].username)

                    setLoggedIn({
                        id: localStorage.getItem('loginId'),
                        username: localStorage.getItem('loginUsername')
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

            setLoggedIn({
                id: 0,
                username: 'Currently not logged in.'
            })
        }
    }

    function userNav() {
        return (
            <p>
                <b>user id:</b> { loggedIn.id }, <b>username:</b> { loggedIn.username }
                <p><button onClick={() => signOut()}>Sign Out</button></p>
            </p>
        )
    }

    function notLoggedInNav() {
        return (
            <>
                <p>{ loggedIn.username }</p>

                <input value={username.username} 
                       onChange={e => setUsername({ ...username, username: e.target.value })} />
                <br />
                <input value={username.password} 
                        onChange={e => setUsername({ ...username, password: e.target.value })} />
                <button onClick={() => signIn()}>Sign In</button>
                <br />
                <p><Link to="/register" className="nav-link">Sign Up</Link> | <Link to="/forgot" className="nav-link">Forgot Password</Link></p>
            
                    
            </>
        )
    }

    const loggedInNavbar = (loggedIn.id !== 0) ? userNav() : notLoggedInNav();

    return (
        <div className="bodyContentStyling">
            {loggedInNavbar}  
        </div>
    )
}

