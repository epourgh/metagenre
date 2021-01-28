import { ACTIONS } from '../actions/types';


function initHome(state, payload) {
  return {
    ... state,
    frontPageMediums: [],
    mediumsReleases: {books: [], films: [], games: []}
  }
}

export default function home(state, action) {
  switch (action.type) {
    case ACTIONS.HOME.INIT:
      return initHome(state, action.payload);
    case ACTIONS.HOME.FRONT:
        const container = {};
        if (action.payload.length > 0) {
            action.payload.forEach(frontPageMediumContent => {

                let mediumsIdToString = frontPageMediumContent.id;

                if (container[mediumsIdToString] === undefined) {
                    container[mediumsIdToString] = {
                        genres: [],
                    };
                    container[mediumsIdToString].id = frontPageMediumContent.id;
                    container[mediumsIdToString].title = frontPageMediumContent.title;
                    container[mediumsIdToString].mediumType = frontPageMediumContent.mediumType.toUpperCase();
                    container[mediumsIdToString].shortDesc = frontPageMediumContent.shortDesc;
                }

                let holder = {}
                holder.mediumGenreId = frontPageMediumContent.mediumGenreId;
                holder.name = frontPageMediumContent.name;
                holder.votes = frontPageMediumContent.votes;
                container[mediumsIdToString].genres.push(holder);
            })

            let container2 = [];

            for (var key in container) {
                container2.push(container[key])
            }

            return {... state, frontPageMediums: container2 };
        }
    case ACTIONS.HOME.RELEASES:
        return {... state, mediumsReleases: {books: action.payload[0], films: action.payload[1], games: action.payload[2]}};
    default:
      return state;
  }
}
