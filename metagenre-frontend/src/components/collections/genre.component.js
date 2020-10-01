import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();
    const type = url.searchParams.get("type").toString();
    const windowsParams = [id, type];
    
    return windowsParams;
}

export default function Genre() {
    
    const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [id, type] = getWindowParam();
    const [mediumsGenres, setMediumsGenres] = useState([{name: ''}]);
    const [genreSubgenres, setGenreSubgenres] =  useState([{subgenreName: ''}]);

    console.log(id)

    useEffect(() => {
        getMediumsGenres();
        if (type == 'genre') {
            getGenreSubgenres();
        }
    }, [id, type])

    const getMediumsGenres = () => {
        fetch(`${backendUrl}/${type}sMediums?${type}Id=${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    setMediumsGenres(response.data)
            }
        });
    }

    const getGenreSubgenres = () => {
        fetch(`${backendUrl}/genreSubgenres?genreId=${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    setGenreSubgenres(response.data)
                }
            });
    }

    const RenderMediums = () => {

        if (mediumsGenres.length > 1) {
            return (
                <div>
                    <ul>
                        {
                            mediumsGenres.map(mediumGenre => {
                                return(
                                    <li>
                                        <Link to={`/medium?id=${mediumGenre.mediumId}`}>{mediumGenre.title}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (<p>Nothing</p>)
        }
    }

    const RenderSubgenres = () => {

        if (genreSubgenres.length > 1) {
            return (
                <div>
                    <Link to={`/relationships/subgenres?id=${id}&title=${mediumsGenres[0].name}`}>Vote for Subgenres</Link>
                    <ul>
                        {
                            genreSubgenres.map(mediumGenre => {
                                return(
                                    <li>
                                        <Link to={`/genre?type=subgenre&id=${mediumGenre.subgenreId}`}>{mediumGenre.subgenreName}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (<p>Nothing</p>)
        }
    }




    return (
        <div className="bodyContentStyling">
           < div className = "individualStyling" >
               <h2>{mediumsGenres[0].name}</h2>
                <br />
                <hr />
                <br />
                <h3>Subgenre(s):</h3>
                <RenderSubgenres />
                <br />
                <hr />
                <br />
                <h3>Medium(s):</h3>
                <RenderMediums />
            </div>
        </div>
    );
}