import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom';

export default function RelationshipsIndex() {
    
    const {loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [genres, setGenres] = useState([]);
    const [genresFiltered, setGenresFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getGenres();
    }, [])

    const searchHandler = () => {
        console.log(searchValue)
        let tempGenres = []

        if (searchValue !== '' && searchValue !== undefined) {
            for (let i = 0; i < genres.length; i++) {
                if (genres[i].name.includes(searchValue)) {
                    tempGenres.push({
                        name: genres[i].name,
                        id: genres[i].id
                    })
                }
            }
        }
        setGenresFiltered(tempGenres)
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
                {
                    genresFiltered.map(genre => {
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