import { ACTIONS } from './types';

export function actionSignIn(information) {
    return {
        type: ACTIONS.SIGN_IN,
        payload: information
    }
}

export function actionSignOut() {
    return { type: ACTIONS.SIGN_OUT } 
}