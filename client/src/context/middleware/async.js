export default function dispatchMiddleware(dispatch) {
  return (action) => {

        if (action.type.match(/fetch-/i)) {

            if (action.type.match(/fetch-multiple/i)) {

                const urls = action.payload.url;
                
                Promise.all(urls.map(url =>
                    fetch(url).then(response => response.json()).then(response => response.data)
                )).then(results => {
                    return dispatch({ type: action.type, payload: results})
                });
                
            } else {
                fetch(action.payload.url)
                    .then(response => response.json())
                    .then(response => {
                        return dispatch({ type: action.type, payload: response.data })
                    })
            }


        } else {
            return dispatch(action);
        }

        
    }

    
};
