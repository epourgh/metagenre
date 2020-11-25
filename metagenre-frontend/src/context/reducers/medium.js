import { ACTIONS } from '../actions/types';

export default function user(mediumState, action) {
  switch (action.type) {
    case ACTIONS.MEDIUM.FETCH:
      return [action.payload];
    default:
      return mediumState;
  }
}
