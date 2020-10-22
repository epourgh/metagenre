import React, {useContext, useState, useEffect} from 'react';
import { GlobalContext } from '../../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    console.log(`id: ${url.searchParams.get("id")}`)
    const id = url.searchParams.get("id").toString();
    const q1id = url.searchParams.get("q1id").toString();
    const q2id = url.searchParams.get("q2id").toString();
    const windowsParams = [id, q1id, q2id];
    return windowsParams;
}

export default function ForgotIndex() {
    const { backendUrl } = useContext(GlobalContext)
    const [id, q1id, q2id] = getWindowParam();
    const [securityQuestions, setSecurityQuestions] = useState([]);
    const [securityResponse, setSecurityResponse] = useState({
        q1r: '',
        q2r: ''    
    });

    useEffect(() => {
        fetch(`${backendUrl}/securityQuestions`)
            .then(response => response.json())
            .then(response => {
                setSecurityQuestions(response.data)
            })
            .catch(err => console.error(err))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const RenderQuestions = () => {

        console.log(securityQuestions)

        if (securityQuestions.length > 1) {
            return (
                <>
                    <label>{securityQuestions[q1id-1].content} </label>
                    <input value={securityResponse.q1r} 
                        onChange={e => setSecurityResponse({ ...securityResponse, q1r: e.target.value })} />
                    <br />

                    <label>{securityQuestions[q2id-1].content}</label>
                    <input value={securityResponse.q2r} 
                        onChange={e => setSecurityResponse({ ...securityResponse, q2r: e.target.value })} />
                    <br />
                </>
            )
        } else {
            return (<p></p>)
        }
    }

    const submitQuestions = () => {

        if (securityResponse.q1r !== '' && securityResponse.q2r !== '') {
            fetch(`${backendUrl}/userSelectedSecurityQuestions/check?id=${id}&sq1r=${securityResponse.q1r}&sq2r=${securityResponse.q2r}`)
                .then(res => {
                    console.log(res);
                    window.location.href = `/user/forgot/change?id=${id}`;
                })
                .catch(err => console.log(err))
            }
        }

    return (
        <div className="bodyContentStyling">
            <div className="single-content-container">

                <h2>Change Password</h2>
                <br />

                <RenderQuestions />

                <br />
                <button onClick={() => submitQuestions()}>Submit</button>
                
            </div>
        </div>
    );
}