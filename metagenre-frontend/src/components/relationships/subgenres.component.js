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
    
    const { backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [genre, setGenre] =  useState({
        id: 0,
        title: 'none'
    });
    const [subgenresFiltered, setSubgenresFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [message, setMessage] = useState('Currently nothing to show.');
    const [genresSubgenres, setGenresSubgenres] = useState([]);
    const [userPickedSubgenresLength, setUserPickedSubgenresLength] = useState([]);
    

    useEffect(() => {
        const [id, title] = getWindowParam();
        setGenre({
            id: id,
            title: title
        })
    }, [])

    useEffect(() => {
        getGenreSubgenres();
    }, [genre])

    const getGenreSubgenres = (() => {

        const userPickedContainer = [];

        fetch(`${backendUrl}/userBooleanRelationships?userId=${loggedIn.id}&genreId=${genre.id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                if (response.data !== undefined) {
                    response.data.forEach(item => {
                        userPickedContainer.push(item.subgenreId);
                    })
                }
            });

        const mediumsGenresContainer = [];

        fetch(`${backendUrl}/genreSubgenresDesc?genreId=${genre.id}`)
            .then(response => response.json())
            .then(response => {
                if (userPickedContainer.length > 0) {

                    let i = 0;
                    let found;
                    let userVoted;

                    response.data.forEach(item => {

                        found = userPickedContainer.find(element => element == item.subgenreId);

                        console.log('FOUND')
                        console.log(found)
                        userVoted = (found !== undefined) ? 1 : 0;

                        let content = {
                            id: item.subgenreId, 
                            name: item.name,
                            votes: item.votes,
                            voted: userVoted,
                            total: item.totalVotes
                        }

                        content.subgenreId = item.subgenreId;

                        mediumsGenresContainer.push(content);
                    })

                    setGenresSubgenres(mediumsGenresContainer)

                    setUserPickedSubgenresLength(userPickedContainer.length);

                } else {

                    setGenresSubgenres(response.data)

                    setUserPickedSubgenresLength(3);

                }
            });

        console.log('/////////////')
        console.log(mediumsGenresContainer)

    });

    const searchHandler = () => {
        console.log(searchValue)
        let [tempSubgenres, j] = [[], 0];


        if (searchValue !== '' && searchValue !== undefined) {
            for (let i = 0; i < genresSubgenres.length; i++) {
                if (genresSubgenres[i].name.includes(searchValue)) {
                    j++;
                    tempSubgenres.push({
                        id: genresSubgenres[i].id,
                        name: genresSubgenres[i].name,
                        votes: genresSubgenres[i].votes,
                        voted: genresSubgenres[i].voted,
                        total: genresSubgenres[i].total
                    })
                }
            }
        }
         setSubgenresFiltered(tempSubgenres)
         setMessage((j === 0)?'Currently nothing to show.':'')
    }


    const voteSubgenreIntoGenre = (genreId, subgenreId, symbol) => {
        console.log(`${genreId}, ${subgenreId}`)
        fetch(`${backendUrl}/relationships?genreId=${genreId}&subgenreId=${subgenreId}&symbol=${symbol.toString()}`)
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

    const RenderSubgenre = () => {
        { 
            return subgenresFiltered.map(subgenre => {
                    if(subgenre.voted === 1) {
                        return (
                            <li className="userVotedForThis">
                                <a href="#" onClick={() => voteSubgenreIntoGenre(genre.id, subgenre.id, '-')}><b>{subgenre.name}</b> | {subgenre.votes}/{subgenre.total}</a>{" "}
                            </li>
                        );
                    } else {
                        return (
                            <li>
                                <a href="#" onClick={() => voteSubgenreIntoGenre(genre.id, subgenre.id, '+')}><b>{subgenre.name}</b> | {subgenre.votes}/{subgenre.total}</a>{" "}
                            </li>
                        )
                    }
                })
        }
    }

    return (
        <div className="bodyContentStyling">
            <div className="single-content-container">
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
                <br />
                <b>Search Results:</b>{" "}
                {message}
                <RenderSubgenre />
                </ul>

            </div>
        </div>
    );
}