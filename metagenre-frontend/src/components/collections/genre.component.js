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
    console.log(id)

    useEffect(() => {
        getMediumsGenres();
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

    const RenderCreator = () => {

        if (mediumsGenres.length > 1) {
            return (
                <div>
                    <h2>{mediumsGenres[0].name}</h2>
                    <ul>
                        {
                            mediumsGenres.map(mediumGenre => {
                                return(<li><b>{mediumGenre.title}</b></li>);
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
           <div className="individualMediumStyling">
                <RenderCreator />
            </div>
        </div>
    );
}