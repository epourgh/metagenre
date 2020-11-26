// React hooks middleware suggestion: https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
// Memoization Suggestion: https://medium.com/front-end-weekly/writing-redux-like-simple-middleware-for-react-hooks-b163724a7058

// Send fetch request 
// Check if it's single or multiple
// Set the states 


dispatchMiddleware(dispatch)(actionFetch({
    section: `mediumsGenres`,
    url: `url`
}));

{
    mediumsGenres: [], set 
    userpickedGenresLength: 0, set
    mediumsSubgenres: [], set
    
    mediumsCreatorsSeries: [], fetch single
    similarTitle: [], fetch single
    extLinks: [], fetch single
    similar: [], fetch single
    
    mediumsDetails: [] && pictureCount: [0, 0, 0, '', ''], fetch single
    pictureCount: [0, 0, 0, '', ''], set

    platforms: [], fetch single
    regions: [], fetch single
    medium: { set
            genreName: '',
            genreType: 'genre'
    },
    mediumsGenresMultiple: { fetch multiple
            items: [], 
            mediumsGenresView: []
    },
    mediumsSubgenresMultiple: { fetch multiple
            items: [], 
            mediumsGenresView: []
    }
}