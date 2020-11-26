import { ACTIONS } from '../actions/types';


function signIn(state, payload) {
  return {
    ... state,
    id: payload.id,
    username: payload.username,
    display: payload.display,
    time: Date.now()
  }
}

export default function user(state, action) {
  switch (action.type) {
    case ACTIONS.USER.SIGN_IN:
      return signIn(state, action.payload);
    case ACTIONS.USER.SIGN_OUT:
      return {
        ... state,
        id: 0,
        username: 'Currently not logged in.',
        display: '-',
        time: Date.now()
      };
    default:
      return state;
  }
}
