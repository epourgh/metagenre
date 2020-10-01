import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();
    const windowsParams = [id];
    
    return windowsParams;
}

export default function Genre() {
    
    const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [id] = getWindowParam();
    const [mediumsGenres, setMediumsGenres] = useState([{name: ''}]);
    const [genreSubgenres, setGenreSubgenres] =  useState([{subgenreName: ''}]);

    console.log(id)

    useEffect(() => {
        getMediumsGenres();
        getGenreSubgenres();
    }, [])

    const getMediumsGenres = () => {
        fetch(`${backendUrl}/genresMediums?genreId=${id}`)
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


    const RenderCreator = () => {

        if (mediumsGenres.length > 1) {
            return (
                <div>
                    <ul>
                        {
                            mediumsGenres.map(mediumGenre => {
                                return(<li>{mediumGenre.title}</li>);
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (<p>Nothing</p>)
        }
    }

        const RenderCreator2 = () => {

        if (genreSubgenres.length > 1) {
            return (
                <div>
                    <ul>
                        {
                            genreSubgenres.map(mediumGenre => {
                                return(<li>{mediumGenre.subgenreName}</li>);
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
               <Link to={`/relationships/subgenres?id=${id}&title=${mediumsGenres[0].name}`}>Vote for Subgenres</Link>
                <br />
                <hr />
                <br />
                <h3>Medium(s):</h3>
                <RenderCreator />
                <br />
                <hr />
                <br />
                <h3>Subgenre(s):</h3>
                <RenderCreator2 />
            </div>
        </div>
    );
}