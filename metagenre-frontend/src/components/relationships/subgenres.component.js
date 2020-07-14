import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
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
    const [id, title] = getWindowParam();
    const [subgenres, setSubgenres] = useState([]);
    

    useEffect(() => {
        getGenres();
    }, [])

    const getGenres = (stringParam) => {
        fetch(`http://18.225.9.206:4000/subgenres`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    setSubgenres(response.data)
                }
            
            });
    }


    const voteSubgenreIntoGenre = (genreId, subgenreId) => {
        console.log(`${genreId}, ${subgenreId}`)
        fetch(`http://18.225.9.206:4000/relationships?genreId=${genreId}&subgenreId=${subgenreId}`)
            .then(response => response.json())
            .then(response => {
                 if (response.data.length > 0) {
                     console.log(response.data[0].genresId)
                 } else {
                     console.log('doesn\'t exist');
                 }
            })
            .catch(err => console.error(err))

    }

    return (
        <div className="bodyContentStyling">
            <h3><b>{title}</b></h3>
            <ul className="listGenreStyling">
            {
                subgenres.map(subgenre => {
                    return (
                        <li>
                            <a href="#" onClick={() => voteSubgenreIntoGenre(id, subgenre.id)}><b>{subgenre.name}</b></a>{" "}
                        </li>
                    );
                })
            }
            </ul>
        </div>
    );
}