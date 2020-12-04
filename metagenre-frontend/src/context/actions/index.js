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

export const actionMedium = {
    actionMediumInit: function(objectLiterals) {
        return {
            type: ACTIONS.MEDIUM.INIT, 
            payload: objectLiterals
        }
    },    
    actionMediumDetails: function(link) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_DETAILS,
            payload: link
        }
    },    
    actionPlatforms: function(link) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.PLATFORMS,
            payload: link
        }
    },    
    actionRegions: function(link) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.REGIONS,
            payload: link
        }
    }
};