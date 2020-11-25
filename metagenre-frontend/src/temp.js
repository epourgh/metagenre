// React hooks middleware suggestion: https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
// Memoization Suggestion: https://medium.com/front-end-weekly/writing-redux-like-simple-middleware-for-react-hooks-b163724a7058

// Send fetch request 
// Check if it's single or multiple
// Set the states 


dispatchMiddleware(dispatch)(actionSignIn({
    id: localStorage.getItem('loginId'),
    username: localStorage.getItem('loginUsername'),
    display: localStorage.getItem('loginDisplay')
}));