import { signIn } from "../GlobalState";
import { ACTIONS } from '../actions/types';

export default function user(userState, action) {
  switch (action.type) {
    case ACTIONS.USER.SIGN_IN:
      return signIn(action.payload);
    case ACTIONS.USER.SIGN_OUT:
      return {
        id: 0,
        username: 'Currently not logged in.',
        display: '-',
        time: Date.now()
      };
    default:
      return userState;
  }
}
