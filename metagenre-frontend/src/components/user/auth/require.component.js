import React, { useEffect, useContext  } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { useHistory } from "react-router-dom";

export function Require() {
    const history = useHistory()
    const {userCredentials} = useContext(GlobalContext)

    useEffect(() => {
        if(userCredentials.id === 0) {
            history.push('/user/login')
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if(userCredentials.id === 0) {
            history.push('/user/login')
        }
    }, [userCredentials]) // eslint-disable-line react-hooks/exhaustive-deps

    return <></>;
};