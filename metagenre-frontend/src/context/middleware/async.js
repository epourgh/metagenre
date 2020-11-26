export default function dispatchMiddleware(dispatch) {
  return (action) => {

    if (action.type.match(/fetch-/i)) {

        fetch(action.payload.url)
            .then(response => response.json())
            .then(response => {
                dispatch({type: action.type, payload: { section: action.payload.section, data: response.data } })
            })
            
    } 

    console.log(`pass throuh async: ${action.type}`)
    return dispatch(action);
    
  };
}
