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