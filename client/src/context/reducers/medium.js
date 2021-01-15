import { ACTIONS } from '../actions/types';

function initMedium(state, payload) {
  return {
    ... state,
    mediumsGenres: [],
    userpickedGenresLength: 0,
    mediumsSubgenres: [],
    mediumsCreatorsSeries: [],
    similarTitle: [],
    extLinks: [], 
    similar: {title: '', mediums: [[{id: 1, title: '', percentage: 0}], [{id: 2, title: '', percentage: 0}], [{id: 3, title: '', percentage: 0}]]}, 
    details: [{title: ''}], 
    platforms: [], 
    regions: [], 
    pictureCount: [0, 0, 0, '', ''], 
    medium: {
      genreName: '',
      genreType: 'genre'
    },
    mediumsGenresMultiple: {
      items: [], 
      mediumsGenresView: []
    },
    mediumsSubgenresMultiple: {
            items: [], 
            mediumsGenresView: []
    }
  }
}

export default function medium(state, action) {
  switch (action.type) {
    case ACTIONS.MEDIUM.INIT:
      return initMedium(state, action.payload);
    case ACTIONS.MEDIUM.SET.MEDIUM.GENRE_NAME:
      let name = action.payload;
      return {...state, name: name}; 
    case ACTIONS.MEDIUM.SET.PICTURE_COUNT:
      let pictureCount = action.payload;
      return {...state, pictureCount: pictureCount}; 
    case ACTIONS.MEDIUM.SET.MEDIUM.GENRE_TYPE:
      let type = action.payload;
      return {...state, type: type}; 
    case ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_CREATORS_SERIES:
      let mediumsCreatorsSeries = action.payload;
      return {...state, mediumsCreatorsSeries}; 
    case ACTIONS.MEDIUM.FETCH.SINGLE.SIMILAR:

      let similar = action.payload;
      let subjectTitle;
      
      if (similar[0].length === 1) {
        if (parseInt(similar[0][0].percentage) > 0) {
          subjectTitle = 'Similar Voted Mediums:';                  
        }
      }

      if (similar[0].length < 1) {
        subjectTitle = undefined;
        similar[0].push({id: 1, title: '', percentage: 0});
      }  

      if (similar[1].length < 1) {
        similar[1].push({id: 2, title: '', percentage: 0});
      }

      if (similar[2].length < 1) {
        similar[2].push({id: 3, title: '', percentage: 0});
      }  
      
      return {...state, similar: { title: subjectTitle, mediums: similar}}; 

    case ACTIONS.MEDIUM.FETCH.SINGLE.EXT_LINKS:
      let extLinks = action.payload;
      return {...state, extLinks}; 
    case ACTIONS.MEDIUM.FETCH.SINGLE.MEDIUMS_DETAILS:
      let details = action.payload;
      return {...state, details: details, pictureCount: (details[0].numberOfGalleryPics > 3) ? [3, details[0].numberOfGalleryPics, 1, 'more photos', ''] : [details[0].numberOfGalleryPics, details[0].numberOfGalleryPics, 0, '', '']}; 
    case ACTIONS.MEDIUM.FETCH.SINGLE.PLATFORMS:
      let platforms = action.payload;
      return {...state, platforms: platforms}; 
    case ACTIONS.MEDIUM.FETCH.SINGLE.REGIONS:
      let regions = action.payload;
      return {...state, regions: regions}; 
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
          return {... state, mediumsGenres: action.payload[1], userPickedGenresLength: 3 }
        } else {
          return {... state, mediumsSubgenres: action.payload[1], userPickedGenresLength: 3 }
        }

      }
    default:
      return state;
  }
}
