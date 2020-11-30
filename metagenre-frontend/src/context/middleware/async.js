export default function dispatchMiddleware(dispatch) {
  return (action) => {

        if (action.type.match(/fetch-/i)) {

            if (action.type.match(/fetch-multiple/i)) {
            
                const resultsObj = action.payload.url.map((url) => {
                    fetch(url)
                        .then(response => response.json())
                        .then(response => {
                            return response.data;
                        })
                });

                return dispatch({type: action.type, payload: resultsObj })
                
            }

            fetch(action.payload.url)
                .then(response => response.json())
                .then(response => {
                    return dispatch({type: action.type, payload: response.data })
                })

        }

        console.log(`pass throuh async: ${action.type}`)
        return dispatch(action);
        
    }

    
};
