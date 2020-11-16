import { signIn } from "./GlobalState";
import { ACTIONS } from './actions/types';

export function reducer(userCredentials, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return signIn(action.payload);
    case ACTIONS.SIGN_OUT:
      return {
        id: 0,
        username: 'Currently not logged in.',
        display: '-',
        time: Date.now()
      };
    default:
      return userCredentials;
  }
}
