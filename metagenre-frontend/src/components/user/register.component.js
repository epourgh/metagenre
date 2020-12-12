import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const md5 = require("md5");

export default function Register() {

    const {backendUrl} = useContext(GlobalContext)

    const [ questions, setQuestions ] = useState([]);
    const [passwordVisibilityToggle1, setPasswordVisibilityToggle1] = useState('password');
    const [passwordVisibilityToggle2, setPasswordVisibilityToggle2] = useState('password');

    const [ usernameObject, setUsernameObject] = useState({
        username: '',
        password: '',
        password2: '',
        displayName: '',
        email: '',
        question1: {
            id: 0,
            answer: ''
        },
        question2: {
            id: 0,
            answer: ''
        }
    });

    useEffect(() => {
        console.log(`${usernameObject.question1.id} | ${usernameObject.question1.answer} | ${usernameObject.question2.id} | ${usernameObject.question2.answer}`)
    })


    useEffect(() => {

        getSecurityQuestions()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getSecurityQuestions = () => {
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
    }
  
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
          fetch(`${backendUrl}/username/add?username=${usernameObject.username}&displayName=${usernameObject.displayName}&password=${hashedPassword}&email=${usernameObject.email}&securityQuestion1id=${usernameObject.question1.id}&securityQuestion1answer=${usernameObject.question1.answer}&securityQuestion2id=${usernameObject.question2.id}&securityQuestion2answer=${usernameObject.question2.answer}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    } else {
        console.log('passwords do not match')
    }

  }

  function togglePasswordVisibility1() {
        const changeText = (typeof passwordVisibilityToggle1==='undefined' || passwordVisibilityToggle1==='password')?'text':'password';
        console.log(changeText)
        setPasswordVisibilityToggle1(changeText);
  }

  function togglePasswordVisibility2() {
        const changeText = (typeof passwordVisibilityToggle2==='undefined' || passwordVisibilityToggle2==='password')?'text':'password';
        console.log(changeText)
        setPasswordVisibilityToggle2(changeText);
  }

  return (
    <div className="loginBodyContentStyling">
        <div className="login-container">

            
            
            <div className="login-title">
                <h2>Register</h2>
            </div>


            <input value={usernameObject.username} 
                placeholder={"Username*"}
                className="full-rounded-input"
                onChange={e => setUsernameObject({ ...usernameObject, username: e.target.value })} />

            <input value={usernameObject.password}
                placeholder={"Password*"}
                className="register-password-input"
                type={passwordVisibilityToggle1 || 'password'}
                onChange={e => setUsernameObject({ ...usernameObject, password: e.target.value })} /><button onClick={() => togglePasswordVisibility1()} className="password-view-toggle"><FontAwesomeIcon className="FontAwesomeIcon" icon={faEye}/></button>


            <input value={usernameObject.password2} 
                placeholder={"Retype Password*"}
                className="register-password-input"
                type={passwordVisibilityToggle2 || 'password'}
                onChange={e => setUsernameObject({ ...usernameObject, password2: e.target.value })} /><button onClick={() => togglePasswordVisibility2()} className="password-view-toggle"><FontAwesomeIcon className="FontAwesomeIcon" icon={faEye}/></button>

            <input value={usernameObject.displayName} 
                placeholder={"Display Name*"}
                className="full-rounded-input"
                onChange={e => setUsernameObject({ ...usernameObject, displayName: e.target.value })} />           

            <input value={usernameObject.email} 
                placeholder={"Email*"}
                className="full-rounded-input"
                onChange={e => setUsernameObject({ ...usernameObject, email: e.target.value })} />   

            <hr className="login-container-hr"/>
            <div className="security-question-div">
                <label>Security Queston 1: </label>
            </div>
            <div className="security-question-div">
                <select required
                        onChange={e => setUsernameObject({ ...usernameObject, question1: {...usernameObject.question1, id: e.target.value} })}>
                    {
                        questions.map(question => <option key={question.id} value={question.id}>{question.content}</option>)
                    }
                </select>
            </div>
                        

            <input value={usernameObject.question1.answer} 
                placeholder={"Answer to Security Question 1*"}
                className="full-rounded-input"
                onChange={e => setUsernameObject({ ...usernameObject, question1: {...usernameObject.question1, answer: e.target.value} })} />
            
            <hr className="login-container-hr"/>
            <div className="security-question-div">
                <label>Security Queston 2: </label>
            </div>
            <div className="security-question-div">
                <select required
                        onChange={e => setUsernameObject({ ...usernameObject, question2: {...usernameObject.question1, id: e.target.value} })}>
                    {
                        questions.map(question => <option key={question.id} value={question.id}>{question.content}</option>)
                    }
                </select>
            </div>
            
            <input value={usernameObject.question2.answer} 
                placeholder={"Answer to Security Question 1*"}
                className="full-rounded-input"
                onChange={e => setUsernameObject({ ...usernameObject, question2: {...usernameObject.question1, answer: e.target.value} })} />

            <hr className="login-container-hr"/>
            <button onClick={() => signUp()}>Sign Up</button>
        </div>
    </div>
  )
}