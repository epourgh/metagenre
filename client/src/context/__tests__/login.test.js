import React from 'react';
import { render } from '@testing-library/react';

test('renders files', () => {});

/*
import { reducer } from "../reducers/users";
import { actionSignIn, actionSignOut } from '../actions/index';
import { ACTIONS } from '../actions/types';

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


it('handles actions with unknown type', () => {
    const newState = reducer([], {type: 'something'})

    expect(newState).toEqual([]);
});

describe('signing in', () => {

    it('has correct type', () => {
        const action = actionSignIn({
            id: 11,
            username: 'something',
            display: 'Emerson Pourghaed'
        });

        expect(action.type).toEqual(ACTIONS.SIGN_IN);
    })

    it('has correct payload', () => {
        const action = actionSignIn({
            id: 11,
            username: 'something',
            display: 'Emerson Pourghaed'
        });

        expect(action.payload.id).toEqual(11); 
    })

});
*/