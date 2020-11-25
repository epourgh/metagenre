import { ACTIONS } from '../actions/types';

export default function dispatchMiddleware(dispatch) {
  return (action) => {
    switch (action.type) {
      case ACTIONS.MEDIUM.FETCH:
        fetch(action.payload.url)
        .then(response => response.json())
        .then(response => {
            dispatch({type: action.type, payload: response.data})
        })
        break;
      default:
        console.log(`pass throuh async: ${action.type}`)
        return dispatch(action);
    }
  };
}
