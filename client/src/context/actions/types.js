export const ACTIONS = {
    USER: {
        SIGN_IN: 'sign-in',
        SIGN_OUT: 'sign-out'        
    },
    MEDIUM: {
        INIT: 'initial-state',
        SET: {
            MEDIUM: {
                GENRE_NAME: 'set-medium-genre-name',
                GENRE_TYPE: 'set-medium-genre-type'
            },
            PICTURE_COUNT: 'set-picture-count',
        },
        FETCH: { 
            SINGLE: {
                MEDIUMS_CREATORS_SERIES: 'fetch-single-mediums-creators-series',
                SIMILAR_TITLE: 'fetch-single-similar-title',
                EXT_LINKS: 'fetch-single-ext-links',
                SIMILAR: 'fetch-single-similar',
                MEDIUMS_DETAILS: 'fetch-single-mediums-details',
                PLATFORMS: 'fetch-single-platforms',
                REGIONS: 'fetch-single-regions',
            }, 
            MULTIPLE: {
                MEDIUMS_GENRES: 'fetch-multiple-mediums-genres',
                MEDIUMS_SUBGENRES: 'fetch-multiple-mediums-subgenres'
            }
        }
    }
}