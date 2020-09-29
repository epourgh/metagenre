import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    console.log(`id: ${url.searchParams.get("id")}`)
    const id = url.searchParams.get("id").toString();
    const title = capitalizeFirstLetter(url.searchParams.get("title").toString());
    const windowsParams = [id, title];
    return windowsParams;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function RelationshipsSubgenres() {
    
    const {loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [genre, setGenre] =  useState({
        id: 0,
        title: 'none'
    });
    const [subgenres, setSubgenres] = useState([]);
    const [subgenresFiltered, setSubgenresFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    

    useEffect(() => {
        const [id, title] = getWindowParam();
        setGenre({
            id: id,
            title: title
        })
        getSubgenres();
    }, [])

    const getSubgenres = (stringParam) => {
        fetch(`http://localhost:4000/subgenres`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    setSubgenres(response.data)
                }
            
            });
    }

    const searchHandler = () => {
        console.log(searchValue)
        let tempSubgenres = []

        if (searchValue !== '' && searchValue !== undefined) {
            for (let i = 0; i < subgenres.length; i++) {
                if (subgenres[i].name.includes(searchValue)) {
                    tempSubgenres.push({
                        name: subgenres[i].name,
                        id: subgenres[i].id
                    })
                }
            }
        }
         setSubgenresFiltered(tempSubgenres)
    }


    const voteSubgenreIntoGenre = (genreId, subgenreId) => {
        console.log(`${genreId}, ${subgenreId}`)
        fetch(`http://localhost:4000/relationships?genreId=${genreId}&subgenreId=${subgenreId}`)
            .then(response => response.json())
            .then(response => {
                 if (response.data.length > 0) {
                     console.log(response.data[0])
                 } else {
                     console.log('doesn\'t exist');
                 }
            })
            .catch(err => console.error(err))

    }

    return (
        <div className="bodyContentStyling">
            <h2><b>Genre:</b> {genre.title}</h2>
            <h3>Vote on a Subgenre:</h3>
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
                subgenresFiltered.map(subgenre => {
                    return (
                        <li>
                            <a href="#" onClick={() => voteSubgenreIntoGenre(genre.id, subgenre.id)}><b>{subgenre.name}</b></a>{" "}
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
}