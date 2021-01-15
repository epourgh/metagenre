import { ACTIONS } from './types';

export const actionUser = {
    signIn: function(information) {
        return {
            type: ACTIONS.USER.SIGN_IN,
            payload: information
        }
    },
    signOut: function() {
        return { type: ACTIONS.USER.SIGN_OUT } 
    }
}

export const actionMedium = {
    actionMediumInit: function(objectLiterals) {
        return {
            type: ACTIONS.MEDIUM.INIT, 
            payload: objectLiterals
        }
    },    
    actionMediumDetails: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_DETAILS,
            payload: fetchRequest
        }
    },    
    actionPlatforms: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.PLATFORMS,
            payload: fetchRequest
        }
    },    
    actionRegions: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.REGIONS,
            payload: fetchRequest
        }
    },
    actionSimilar: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.SIMILAR,
            payload: fetchRequest
        }
    },
    actionExternalLinks: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.EXT_LINKS,
            payload: fetchRequest
        }
    },
    actionCreatorsSeries: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_CREATORS_SERIES,
            payload: fetchRequest
        }
    },
    actionGenresMultiple: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.MULTIPLE.MEDIUMS_GENRES,
            payload: fetchRequest
        }
    },
    actionSubgenresMultiple: function(fetchRequest) {
        return {
            type: ACTIONS.MEDIUM.FETCH.MULTIPLE.MEDIUMS_SUBGENRES,
            payload: fetchRequest
        }
    }
};