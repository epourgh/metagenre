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

                return dispatch({ type: action.type, payload: resultsObj })
                
            } else {
                console.log(`fetch through async: ${action.type}`);
                console.log(`fetch through async: ${action.payload.url}`);
                fetch(action.payload.url)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response.data);
                        return dispatch({ type: action.type, payload: response.data })
                    })
            }


        } else {
            console.log(`pass through async: ${action.type}`)
            return dispatch(action);
        }

        
    }

    
};
