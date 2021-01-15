import { mount } from 'enzyme';
import React from 'react';

import FrontPageMediumsDisplay from '../frontPageMediums.component';
let wrapped;

beforeEach(() => {

    const initialState = [
        {
            id: 1, 
            title: 'tentative_1',
            shortDesc: 'short description',
            mediumType: 'film',
            genres: [
                {
                    mediumGenreId: 1,
                    name: 'film_genre_1',
                    votes: 1
                },
                {
                    mediumGenreId: 2,
                    name: 'film_genre_2',
                    votes: 1
                }
            ]
        },
        {
            id: 2, 
            title: 'tentative_2',
            shortDesc: 'short description',
            mediumType: 'game',
            genres: [
                {
                    mediumGenreId: 1,
                    name: 'game_genre_1',
                    votes: 1
                },
                {
                    mediumGenreId: 2,
                    name: 'game_genre_2',
                    votes: 1
                },
                {
                    mediumGenreId: 3,
                    name: 'game_genre_3',
                    votes: 1
                }
            ]
        }
    ]

    wrapped = mount(<FrontPageMediumsDisplay frontPageMediums={initialState} />);

});


it('creates right amountof LI tags', () => {
    console.log(wrapped.find('li').length);
    expect(wrapped.find('li').length).toEqual(7)
});

it('shows text for each LI tag', () => {
    expect(wrapped.render().text()).toContain('game')
    expect(wrapped.render().text()).toContain('film')
});