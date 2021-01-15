import React, { useEffect, useContext  } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import { useHistory } from "react-router-dom";

export function Require() {
    const history = useHistory()
    const {reducers} = useContext(GlobalContext)

    useEffect(() => {
        if(reducers.user.id === 0) {
            history.push('/user/login')
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if(reducers.user.id === 0) {
            history.push('/user/login')
        }
    }, [reducers.user]) // eslint-disable-line react-hooks/exhaustive-deps

    return <></>;
};