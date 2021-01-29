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
    
    const {backendUrl} = useContext(GlobalContext)
    const [id, type] = getWindowParam();
    const [mediumsGenres, setMediumsGenres] = useState([{name: ''}]);
    const [genreSubgenres, setGenreSubgenres] =  useState([{subgenreName: ''}]);

    console.log(id)

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
                console.log(`getGenreSubgenres`)
                console.log(response.data)
                if (response.data.length > 0) {
                    setGenreSubgenres(response.data)
                }
            });
    }

    const getSubgenreGenres = () => {
        fetch(`${backendUrl}/subgenreGenres?subgenreId=${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(`getSubgenreGenres`)
                console.log(response.data)
                if (response.data.length > 0) {
                    setGenreSubgenres(response.data)
                }
            });
    }

    useEffect(() => {
        getMediumsGenres();
        (type === 'genre')?getGenreSubgenres():getSubgenreGenres();
    }, [id, type]) // eslint-disable-line react-hooks/exhaustive-deps


    const RenderMediums = () => {

        if (mediumsGenres.length > 1) {
            return (
                <div>
                    <ul>
                        {
                            mediumsGenres.map(mediumGenre => {
                                return(
                                    <li key={mediumGenre.mediumId}>
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

        if (genreSubgenres.length >= 1) {
            return (
                <div>
                    <Link to={`/relationships/subgenres?id=${id}&title=${mediumsGenres[0].name}`}>Vote for Subgenres</Link>
                    <ul>
                        {
                            genreSubgenres.map(mediumGenre => {
                                return(
                                    <li key={mediumGenre.subgenreId}>
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

    const RenderGenres = () => {

        if (genreSubgenres.length >= 1) {
            return (
                <div>
                    <ul>
                        {
                            genreSubgenres.map(mediumGenre => {
                                return(
                                    <li key={mediumGenre.genreId}>
                                        <Link to={`/genre?type=genre&id=${mediumGenre.genreId}`}>{mediumGenre.genreName}</Link>
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

    const RenderType = () => {
        
        if (type === 'genre') {
            return (
                <>
                    <h3>Subgenre(s):</h3>
                    <RenderSubgenres />
                </>
            ) 
        }
        return (
            <>
                <h3>Genre(s):</h3>
                <RenderGenres />
            </>
        ) 
    
    }


    return (
        <div className="bodyContentStyling">
           < div className = "individualStyling" >
               <h2>{mediumsGenres[0].name}</h2>
                <br /><hr /><br />
                <RenderType />
                <br /><hr /><br />
                <h3>Medium(s):</h3>
                <RenderMediums />
            </div>
        </div>
    );
}