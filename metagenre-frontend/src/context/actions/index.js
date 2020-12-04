import { ACTIONS } from './types';

export function actionSignIn(information) {
    return {
        type: ACTIONS.USER.SIGN_IN,
        payload: information
    }
}

export function actionSignOut() {
    return { type: ACTIONS.USER.SIGN_OUT } 
}

export function actionFetch(fetching) {
    return {
        type: ACTIONS.MEDIUM.FETCH,
        payload: fetching.url
    }
}

export function actionMediumInit(objectLiterals) {
    return {
        type: ACTIONS.MEDIUM.INIT, 
        payload: objectLiterals
    }
}

export function actionMediumDetails(link) {
    return {
        type: ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_DETAILS,
        payload: link
    }
}