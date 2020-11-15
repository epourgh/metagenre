import { reducer } from "../reducer";
import { ACTIONS } from '../GlobalState';

it('handles SIGN_IN actions', () => {
    const action = {
        type: ACTIONS.SIGN_IN,
        payload: {
            id: 11,
            username: 'something',
            display: 'Emerson Pourghaed'
        }
    }

    const newState = reducer([], action);
    const dateSnapshot = Date.now();

    expect(newState).toEqual({
        display: 'Emerson Pourghaed',
        id: 11,
        time: dateSnapshot,
        username: 'something',
    });
}) 