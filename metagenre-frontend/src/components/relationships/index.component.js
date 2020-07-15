import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom';

export default function RelationshipsIndex() {
    
    const {loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres();
    }, [])

    const getGenres = (stringParam) => {
        fetch(`./api/genres`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    setGenres(response.data)
                }
            
            });
    }

    return (
        <div className="bodyContentStyling">
            <ul className="listGenreStyling">
                {
                    genres.map(genre => {
                        return (
                            <li>
                                <Link to={`/relationships/subgenres?id=${genre.id}&title=${genre.name}`}><b>{genre.name}</b></Link>{" "}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}