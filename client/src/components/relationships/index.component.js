import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RelationshipsIndex() {
    
    const [genres, setGenres] = useState([]);
    const [genresFiltered, setGenresFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [message, setMessage] = useState('Currently nothing to show.');

    useEffect(() => {
        getGenres();
    }, [])

    const searchHandler = () => {
        console.log(searchValue)
        let [tempGenres, j] = [[], 0];

        if (searchValue !== '' && searchValue !== undefined) {
            for (let i = 0; i < genres.length; i++) {
                if (genres[i].name.includes(searchValue)) {
                    j++;
                    tempGenres.push({
                        name: genres[i].name,
                        id: genres[i].id
                    })
                }
            }
        }
        setGenresFiltered(tempGenres)
        setMessage((j === 0) ? 'Currently nothing to show.' : '')
    }


    const getGenres = (stringParam) => {
        fetch(`http://localhost:4000/genres`)
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
            <div className="single-content-container">
                <h3>Choose a Genre:</h3>
                <form onKeyUp={e => searchHandler()} onSubmit={searchHandler}>
                    <input
                    placeholder={"search by name"}
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value.toLocaleLowerCase())}
                    className="banner-search-input"
                    />
                </form>
                <br />
                <hr />
                <ul className="listGenreStyling">
                    {message}
                    {
                        genresFiltered.map(genre => {
                            return (
                                <li key={genre.id}>
                                    <Link to={`/relationships/subgenres?id=${genre.id}&title=${genre.name}`}><b>{genre.name}</b></Link>{" "}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}