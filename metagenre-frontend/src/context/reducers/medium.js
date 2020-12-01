import { ACTIONS } from '../actions/types';

export default function user(state, action) {
  switch (action.type) {
    case ACTIONS.MEDIUM.INIT:
      return action.payload;
    case ACTIONS.MEDIUM.SET.MEDIUM.GENRE_NAME:
      let fetchedContent = action.payload;
      return {...state, fetchedContent}; 
    case ACTIONS.MEDIUM.SET.MEDIUM.GENRE_TYPE:
      let fetchedContent = action.payload;
      return {...state, fetchedContent}; 
    case ACTIONS.MEDIUM.SET.PICTURE_COUNT:
    case ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_CREATORS_SERIES:
      let fetchedContent = action.payload;
      return {...state, fetchedContent}; 
    case ACTIONS.MEDIUM.FETCH.SINGLE.SIMILAR_TITLE:
    case ACTIONS.MEDIUM.FETCH.SINGLE.EXT_LINKS:
    case ACTIONS.MEDIUM.FETCH.SINGLE.SIMILAR:
    case ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_DETAILS:
    case ACTIONS.MEDIUM.FETCH.SINGLE.PLATFORMS:
    case ACTIONS.MEDIUM.FETCH.SINGLE.REGIONS:
      let fetchedContent = action.payload;
      return {...state, fetchedContent}; 
    case ACTIONS.MEDIUM.FETCH.MULTIPLE.MEDIUMS_GENRES:
    case ACTIONS.MEDIUM.FETCH.MULTIPLE.MEDIUMS_SUBGENRES:
      const userPickedContainer = [];

      if (action.payload[0].length > 0) {
        
        if (action.type.match(/-mediums-genres/i)) {
          action.payload[0].forEach(item => {
            userPickedContainer.push(item.genreId);
          })
        } else {
          action.payload[0].forEach(item => {
            userPickedContainer.push(item.subgenreId);
          })
        }
      }

      const mediumsGenresContainer = [];


      if (userPickedContainer.length > 0) {

        let found;
        let userVoted;

        action.payload[1].forEach(item => {

          if (action.type.match(/-mediums-genres/i)) {
            found = userPickedContainer.find(element => element === item.genreId);
          } else {
            found = userPickedContainer.find(element => element === item.subgenreId);
          }

          userVoted = (found !== undefined) ? 1 : 0;

          let content = {
            id: item.id,
            title: item.title,
            name: item.name,
            votes: item.votes,
            voted: userVoted
          }

          if (action.type.match(/-mediums-genres/i)) {
            content.genreId = item.genreId;
          } else {
            content.subgenreId = item.subgenreId;
          }

          mediumsGenresContainer.push(content);
        })

        if (action.type.match(/-mediums-genres/i)) {
          return {... state, mediumsGenres: mediumsGenresContainer, userPickedGenresLength: userPickedContainer.length }
        } else {
          return {... state, mediumsSubgenres: mediumsGenresContainer, userPickedGenresLength: userPickedContainer.length }
        }

      } else {

        if (action.type.match(/-mediums-genres/i)) {
          return {... state, mediumsGenres: mediumsGenresContainer, userPickedGenresLength: 3 }
        } else {
          return {... state, mediumsGenres: mediumsGenresContainer, userPickedGenresLength: 3 }
        }

      }
    default:
      return state;
  }
}
