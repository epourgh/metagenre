import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
const md5 = require("md5");

export default function Register() {

    const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)

    const [ questions, setQuestions ] = useState([]);
    const [ usernameObject, setUsernameObject] = useState({
        username: '',
        password: '',
        password2: '',
        displayName: '',
        email: '',
        question1: {
            id: '',
            answer: ''
        },
        question2: {
            id: '',
            answer: ''
        }
    });

    useEffect(() => {

        console.log('fetching...');

        fetch(`${backendUrl}/securityQuestions`)
            .then(response => response.json())
            .then(response => {
                if (response.data.length > 0) {
                    console.log(response.data)
                    setQuestions(response.data.map(question => question))
                }
            })
            .catch((error) => {
                console.log(error);
            })

        console.log(questions);

    }, []);

  
  const signUp = () => {

    if(usernameObject.password === usernameObject.password2) {

        const hashedPassword = hash(usernameObject.password);
        console.log(compare(usernameObject.password, hashedPassword));
        
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
    
        if (typeof usernameObject.username != undefined && typeof usernameObject.password != undefined) {
          fetch(`${backendUrl}/username/add?username=${usernameObject.username}&password=${hashedPassword}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    } else {
        console.log('passwords do not match')
    }


  }

  return (
    <div className="bodyContentStyling">
        <div className="single-content-container">

            <h2>Register</h2>
            <br />

            <label>Username: </label>
            <input value={usernameObject.username} 
                onChange={e => setUsernameObject({ ...usernameObject, username: e.target.value })} />
            <br />

            <label>Password: </label>
            <input value={usernameObject.password} 
                onChange={e => setUsernameObject({ ...usernameObject, password: e.target.value })} />
            <br />


            <label>Retype Password: </label>
            <input value={usernameObject.password2} 
                onChange={e => setUsernameObject({ ...usernameObject, password2: e.target.value })} />
            <br />

            <label>Display Name: </label>
            <input value={usernameObject.displayName} 
                onChange={e => setUsernameObject({ ...usernameObject, displayName: e.target.value })} />           
            <br />

            <label>email: </label>
            <input value={usernameObject.email} 
                onChange={e => setUsernameObject({ ...usernameObject, email: e.target.value })} />   
            <br />
                        
            <label>Security Queston 1: </label>
            <select useRef="userInput"
                    required
                    value={usernameObject.question1.id}
                    onChange={e => setUsernameObject({ ...usernameObject, question1: { id: e.target.value} })}>
                {
                    questions.map(function(question) {
                        return (
                            <option 
                                key={question.id}
                                value={question.id}>
                                {question.content}
                            </option>
                        )
                    })
                }
            </select>
            <br />

            <label>Answer: </label>
            <input value={usernameObject.question1.answer} 
                onChange={e => setUsernameObject({ ...usernameObject, question1: { answer: e.target.value} })} />
            <br />

            <label>Security Queston 2: </label>
            <select useRef="userInput"
                    required
                    value={usernameObject.question2.id}
                    onChange={e => setUsernameObject({ ...usernameObject, question2: { id: e.target.value} })}>
                {
                    questions.map(function(question) {
                        return (
                            <option 
                                key={question.id}
                                value={question.id}>
                                {question.content}
                            </option>
                        )
                    })
                }
            </select>
            <br />
            
            <label>Answer: </label>
            <input value={usernameObject.question2.answer} 
                onChange={e => setUsernameObject({ ...usernameObject, question2: { answer: e.target.value} })} />
            <br />

            <button onClick={() => signUp()}>Sign Up</button>
        </div>
    </div>
  )
}