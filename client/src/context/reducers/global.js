import { ACTIONS } from '../actions/types';

function init(state, payload) {
  return {
    ... state,
    mediums: [{
        id: 0,
        tag: 0,
        title: '',
        active: 0
    }],
    genres: [{id: 0, name: ''}],
    subgenres: [{id: 0, name: ''}]
  }
}

export default function user(state, action) {
  switch (action.type) {
    case ACTIONS.GLOBAL.INIT:
        return init(state, action.payload);
    case ACTIONS.GLOBAL.MEDIUMS:
        
        let mediums = action.payload.map(medium => {
            return {
                id: medium.id,
                tag: medium.title.toLowerCase(),
                title: medium.title,
                active: 0
            };
        })

        return {... state, mediums: mediums }
    case ACTIONS.GLOBAL.GENRES:
         return {... state, genres: action.payload }
    case ACTIONS.GLOBAL.SUBGENRES:
         return {... state, subgenres: action.payload }
    default:
      return state;
  }
}
