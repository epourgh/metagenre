import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

function getWindowParam() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  const mediumType = url.searchParams.get("medium").toString();
  
  console.log(mediumType)
  
  return mediumType;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Medium() {
  
  const {loggedIn, setLoggedIn} = useContext(GlobalContext)
  const [mediums, setMediums] = useState([]);
  const [medium, setMedium] = useState({
    title: '',
    mediumType: ''
  });
  const [mediumsGenresObject, setMediumsGenresObject] = useState([]);
  const paramsMediumType = getWindowParam();


  useEffect(() => {
    getMediums();
    getMediumsGenres();
  }, [paramsMediumType]);

  const getMediums = () => {
    fetch(`http://18.225.9.206:4000/mediums/genreless?mediumType=${paramsMediumType}`)
      .then(response => response.json())
      .then(response => setMediums(response.data))
      .catch(err => console.error(err))
  }

  const getMediumsGenres = () => {
    const container = {};
    fetch(`http://18.225.9.206:4000/mediumsGenresView?mediumType=${paramsMediumType}`)
        .then(response => response.json())
        .then(response => {
        if (response.data.length > 0) {
            response.data.map(mediumGenre => {

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
              container[mediumsIdToString].genresVoted.push(holder);
              
            });
        }
        })
        .catch(err => console.error(err))
    

    fetch(`http://18.225.9.206:4000/mediumsSubgenresView?mediumType=${paramsMediumType}`)
        .then(response => response.json())
        .then(response => {
            if (response.data.length > 0) {
                response.data.map(mediumSubgenre => {

                    let mediumsIdToString = mediumSubgenre.mediumsId;

                    if (container[mediumsIdToString] === undefined) {
                        container[mediumsIdToString] = {
                            genresVoted: [],
                            subgenresVoted: [],
                        };
                        container[mediumsIdToString].title = capitalizeFirstLetter(mediumSubgenre.title);
                        container[mediumsIdToString].id = mediumSubgenre.mediumsId;
                    }

                    let holder = {}
                    holder.id = mediumSubgenre.id;
                    holder.name = mediumSubgenre.name;
                    holder.votes = mediumSubgenre.votes;
                    holder.subgenreId = mediumSubgenre.subgenreId;
                    container[mediumsIdToString].subgenresVoted.push(holder);
                    return container;
                })

              }

              console.log(container);

              let container2 = [];

              for (var key in container) {
                console.log(container[key])
                container2.push(container[key])
              }

              setMediumsGenresObject(container2);

        })
        .catch(err => console.error(err))

  }


    // const addMedium = () => {
      

    //   if (typeof medium.title != undefined && typeof medium.mediumType != undefined) {
    //     fetch(`http://18.225.9.206:4000/mediums/add?title=${medium.title}&mediumType=${medium.mediumType}`)
    //       .then(update => {
    //           getMediums();
    //           getMediumsGenres();
    //       })
    //   }
    // }

    const voteMediumGenre = (mediumId, mediumGenresId, routeString, mediumGenreVotes) => {

        let votedMediumGenre = mediumGenreVotes + 1;

        fetch(`http://18.225.9.206:4000/${routeString}/update/${mediumGenresId}?mediumId=${mediumId}&votes=${votedMediumGenre}`)
            .then(response => {
              getMediums();
              getMediumsGenres();
            })

    }

    const voteMediumSubgenre = (mediumId, mediumGenresId, routeString, mediumGenreVotes, subgenreId) => {

      let votedMediumGenre = mediumGenreVotes + 1;

      fetch(`http://18.225.9.206:4000/${routeString}/update/${mediumGenresId}?mediumId=${mediumId}&votes=${votedMediumGenre}&subgenreId=${subgenreId}`)
        .then(response => {
          getMediums();
          getMediumsGenres();
        })

    }


  const renderMediumGenre = (medium) => {

      if (medium !== undefined) {
          return (
              <div key={medium.id} className="individualMediumStyling row">

                <div className="column1">
                  <img src={`./images/medium/${medium.id}/frontPageThumbnail.png`} width="150"/>
                </div>
                <div className="column2">

                  <h3><b><Link to={`/medium?id=${medium.id}`}>{medium.title}</Link>:</b></h3>{" "}

                  <br />

                  <ul className="listGenreStyling">
                    <li className="genreCategory"><b>genres:</b></li>
                    {medium.genresVoted.map(genre => <li key={genre.id}><a href="#" onClick={() => voteMediumGenre(medium.id, genre.id, 'mediumsGenres', genre.votes)}><b>{genre.name}</b> | {genre.votes}</a> {" "}</li>)}
                  </ul>

                  
                  <ul className="listGenreStyling">
                    <li className="genreCategory"><b>subgenres:</b></li>
                    {medium.subgenresVoted.map(subgenre => <li key={subgenre.id}><a href="#" onClick={() => voteMediumSubgenre(medium.id, subgenre.id, 'mediumsSubgenres', subgenre.votes, subgenre.subgenreId)}><b>{subgenre.name}</b> | {subgenre.votes}</a> {" "}</li>)}
                  </ul>
                  
                </div>

              </div>
          )
      }
  };
  

  return (
    <div className="bodyContentStyling">

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
              <div key={medium.id} className="individualMediumStyling row">
                <div className="column1">
                  <img src={`./images/medium/${medium.id}/frontPageThumbnail.png`} width="150"/>
                </div>
                <div className="column2">
                  <h3><b><Link to={`/medium?id=${medium.id}`}>{capitalizeFirstLetter(medium.title)}</Link></b></h3>                
                </div>
              </div>
            );

          })
        }
      </div>
      {/* <div>
        <input value={medium.title} 
                onChange={e => setMedium({ ...medium, title: e.target.value })} />
        <input value={medium.mediumType} 
                onChange={e => setMedium({ ...medium, mediumType: e.target.value })} />
        <button onClick={() => addMedium()}>Add Medium</button>
      </div> */}
    </div>
  )
}