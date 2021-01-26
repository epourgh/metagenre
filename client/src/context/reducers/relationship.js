import { ACTIONS } from '../actions/types';


function initRelationship(state, payload) {
  return {
    ... state,
    fetchedSubgenresPicks: [],
    genresSubgenres: [],
    userPickedSubgenresLength: 3
  }
}

export default function relationship(state, action) {
  switch (action.type) {
    case ACTIONS.RELATIONSHIP.INIT:
      return initRelationship(state, action.payload);
    case ACTIONS.RELATIONSHIP.PICKS:

        let fetchGenreSubgenres = action.payload;

        const userPickedContainer = [];

        if (fetchGenreSubgenres[0].length > 0) {
            fetchGenreSubgenres[0].forEach(item => {
                userPickedContainer.push(item.subgenreId);
            })
        }

        const mediumsGenresContainer = [];

        let found;
        let userVoted;

        fetchGenreSubgenres[1].forEach(item => {

            found = userPickedContainer.find(element => element === item.subgenreId);

            userVoted = (found !== undefined) ? 1 : 0;

            let content = {
                id: item.subgenreId, 
                name: item.name,
                votes: item.votes,
                voted: userVoted,
                total: item.totalVotes
            }

            content.subgenreId = item.subgenreId;

            mediumsGenresContainer.push(content);
        })

        console.log('--Reducers Relationship--')

        return {... state, fetchedSubgenresPicks: fetchGenreSubgenres[0], genresSubgenres: mediumsGenresContainer, userPickedSubgenresLength: userPickedContainer.length }
        
    default:
      return state;
  }
}
