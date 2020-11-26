import { ACTIONS } from '../actions/types';

export default function user(state, action) {
  switch (action.type) {
    case ACTIONS.MEDIUM.FETCH:
      let fetchedContent = action.payload;
      return {...state, fetchedContent};
    case ACTIONS.MEDIUM.INIT:
      return action.payload
    default:
      return state;
  }
}
