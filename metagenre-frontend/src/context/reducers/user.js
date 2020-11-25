import { ACTIONS } from '../actions/types';


function signIn(userState, payload) {
  return {
    ... userState,
    id: payload.id,
    username: payload.username,
    display: payload.display,
    time: Date.now()
  }
}

export default function user(userState, action) {
  switch (action.type) {
    case ACTIONS.USER.SIGN_IN:
      return signIn(userState, action.payload);
    case ACTIONS.USER.SIGN_OUT:
      return {
        ... userState,
        id: 0,
        username: 'Currently not logged in.',
        display: '-',
        time: Date.now()
      };
    default:
      return userState;
  }
}
