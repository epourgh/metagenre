import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function getWindowParam() {
  var url_string = window.location.href;
  var url = new URL(url_string);

  
  // if (url.searchParams.get("mediums") == undefined) {
  //   window.location.href = '/';
  // }
  
  const mediumType = url.searchParams.get("medium").toString();
  
  return mediumType;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Medium() {
  
  const {backendUrl, reducers} = useContext(GlobalContext)
  const [mediums, setMediums] = useState([]);
  const [mediumsGenres, setMediumsGenres] = useState({genres: [], subgenres: []});
  const [mediumsGenresObject, setMediumsGenresObject] = useState([]);
  const paramsMediumType = getWindowParam();


  useEffect(() => {
      getMediums()
  }, [paramsMediumType]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    organizeMediumsGenres()
  }, [mediumsGenres]) // eslint-disable-line react-hooks/exhaustive-deps  

  const getMediums = () => {
    Promise.all([
      fetch(`${backendUrl}/mediums/genreless?mediumType=${paramsMediumType}`),
      fetch(`${backendUrl}/mediumsGenresView?mediumType=${paramsMediumType}`),
      fetch(`${backendUrl}/mediumsSubgenresView?mediumType=${paramsMediumType}`)
    ])
    .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    .then(([data1, data2, data3]) => {
      setMediums(data1.data)
      setMediumsGenres({
          genres: data2.data, 
          subgenres: data3.data
      })
    });
  }

  const organizeMediumsGenres = () => {
    const container = {};
    if(mediumsGenres.genres.length > 0 && mediumsGenres.subgenres.length > 0) {

      const orgFunction = (mediumGenre, contentType) => {
        let mediumsIdToString = mediumGenre.mediumsId;
        
        if (container[mediumsIdToString] === undefined) {
            
            container[mediumsIdToString] = {
                genresVoted: [],
                subgenresVoted: [],
            };
            container[mediumsIdToString].title = capitalizeFirstLetter(mediumGenre.title);
            container[mediumsIdToString].id = mediumGenre.mediumsId;
  
        }
  
        let holder = {}
        holder.id = mediumGenre.id;
        holder.name = mediumGenre.name;
        holder.votes = mediumGenre.votes;
        if (contentType === 'genres') {
          container[mediumsIdToString].genresVoted.push(holder);
        } else {
          container[mediumsIdToString].subgenresVoted.push(holder);
        }

        return container;
      } 

      mediumsGenres.genres.forEach(mediumGenre => {
        return orgFunction(mediumGenre, 'genres')        
      });

      mediumsGenres.subgenres.map(mediumSubgenre => {
        return orgFunction(mediumSubgenre, 'subgenres')
      });

      console.log(container)
    }

    let container2 = [];

    for (var key in container) {
      container2.push(container[key])
    }

    setMediumsGenresObject(container2);
  }


    // const addMedium = () => {
      

    //   if (typeof medium.title != undefined && typeof medium.mediumType != undefined) {
    //     fetch(`${backendUrl}/mediums/add?title=${medium.title}&mediumType=${medium.mediumType}`)
    //       .then(update => {
    //           getMediums();
    //           getMediumsGenres();
    //       })
    //   }
    // }


    /*

    // Vote Medium Genre and Subgenre

    <a href="#" onClick={() => voteMediumGenre(medium.id, genre.id, 'mediumsGenres', genre.votes)}></a>
    <a href="#" onClick={() => voteMediumSubgenre(medium.id, subgenre.id, 'mediumsSubgenres', subgenre.votes, subgenre.subgenreId)}></a>

    

    const voteMediumGenre = (mediumId, mediumGenresId, routeString, mediumGenreVotes) => {

        let votedMediumGenre = mediumGenreVotes + 1;

        fetch(`${backendUrl}/${routeString}/update/${mediumGenresId}?mediumId=${mediumId}&votes=${votedMediumGenre}`)
            .then(response => {
              getMediums();
              getMediumsGenres();
            })

    }

    const voteMediumSubgenre = (mediumId, mediumGenresId, routeString, mediumGenreVotes, subgenreId) => {

      let votedMediumGenre = mediumGenreVotes + 1;

      fetch(`${backendUrl}/${routeString}/update/${mediumGenresId}?mediumId=${mediumId}&votes=${votedMediumGenre}&subgenreId=${subgenreId}`)
        .then(response => {
          getMediums();
          getMediumsGenres();
        })

    }
    */


  const renderMediumGenre = (medium) => {

      if (medium !== undefined) {
          return (
              <div key={medium.id} className="individualStyling row medium-individual-styling">

                <div className="column1">
                  <img src={`./images/medium/${medium.id}/frontPageThumbnail.png`} alt="front page thumbnail" className="mediums-image" width="150"/>
                </div>
                <div className="column2">

                  <h3><b><Link to={`/medium?id=${medium.id}`}>{medium.title}</Link>:</b></h3>{" "}

                  <br />

                  <ul className="listGenreStyling">
                    <li className="genreCategory"><b>genres:</b></li>
                    {medium.genresVoted.map(genre => <li key={genre.id}><p><b>{genre.name}</b> | {genre.votes}</p> {" "}</li>)}
                  </ul>

                  <hr className="hr-mobile-display-sm"/>

                  
                  <ul className="listGenreStyling">
                    <li className="genreCategory"><b>subgenres:</b></li>
                    {medium.subgenresVoted.map(subgenre => <li key={subgenre.id}><p><b>{subgenre.name}</b> | {subgenre.votes}</p> {" "}</li>)}
                  </ul>
                  
                </div>

              </div>
          )
      }
  };

  const LoggedInNotification = () => {

    if(reducers.user.id === 0) {
      return (
        <div className="individualStyling individualMediumStyling row warning-alert">
          <div className="padding-mobile">
            <div className="icon-centered-mobile">
              <FontAwesomeIcon className="fontawesome-exclamation-circle" icon={faExclamationCircle}/> 
            </div>
            You'll need to <a href="./user/login">sign in</a> to vote for medium genres and subgenres.
          </div>
        </div>
      )
    } else {
      return (
        <div className="individualStyling individualMediumStyling row nuetral-alert">
          <div className="padding-mobile">
            Check out individual medium pages to vote for the medium.
          </div>
        </div>
      )
    }
  }

  return (
    <div className="bodyContentStyling">
      <LoggedInNotification />

      <div>
        {
          mediumsGenresObject.map((medium) => {
              return renderMediumGenre(medium);
          })
        }
      </div>
      <div>
        {
          mediums.map((medium) => {

            return (
              <div key={medium.id} className="individualStyling row medium-individual-styling">
                <div className="column1">
                  <img src={`./images/medium/${medium.id}/frontPageThumbnail.png`} alt="Front Page Thumbnail" className="mediums-image" width="150"/>
                </div>
                <div className="column2">
                  <h3><b><Link to={`/medium?id=${medium.id}`}>{capitalizeFirstLetter(medium.title)}</Link></b></h3>                
                </div>
              </div>
            );

          })
        }
      </div>
    </div>
  )
}