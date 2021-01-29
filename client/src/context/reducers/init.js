export const globalInitState = {
    mediums: [{
        id: 0,
        tag: 0,
        title: '',
        active: 0
    }],
    genres: [{id: 0, name: ''}],
    subgenres: [{id: 0, name: ''}]
}

export const userInitState =  {id: parseInt(localStorage.getItem('reducer-id')) || 0, 
                            username: localStorage.getItem('reducer-username') || 'Currently not logged in.', 
                            display: localStorage.getItem('reducer-display') || '-'};

export const mediumInitState = {
    mediumsGenres: [],
    userpickedGenresLength: 0,
    mediumsSubgenres: [],
    mediumsCreatorsSeries: [],
    similarTitle: [],
    extLinks: [], 
    similar: [{title: '', mediums: []}],  
    details: [{title: ''}], 
    platforms: [], 
    regions: [], 
    pictureCount: [0, 0, 0, '', ''], 
    medium: {
            genreName: '',
            genreType: 'genre'
    },
    mediumsGenresMultiple: {
            items: [], 
            mediumsGenresView: []
    },
    mediumsSubgenresMultiple: {
            items: [], 
            mediumsGenresView: []
    }
};

export const relationshipInitState = {
    userSubgenreChoices: [],
    genresSubgenres: [],
    userPickedSubgenresLength: 3
};

export const homeInitState = {
    frontPageMediums: [],
    mediumsReleases: {books: [], films: [], games: []}
}