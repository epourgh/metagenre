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
    
    const { backendUrl, loggedIn} = useContext(GlobalContext)
    const [id, title] = getWindowParam();
    const [genre] =  useState({
        id: id,
        title: title
    });
    const [subgenresFiltered, setSubgenresFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [message, setMessage] = useState('Currently nothing to show.');
    const [genresSubgenres, setGenresSubgenres] = useState([]);
    const [userPickedSubgenresLength, setUserPickedSubgenresLength] = useState(3);
    const [votedSubgenres, setVotedSubgenres] = useState([]);
    

    useEffect(() => {
        getGenreSubgenres();
    }, [])

    useEffect(() => {
        getGenreSubgenres();
        searchHandler();
    }, [userPickedSubgenresLength])

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

                    setVotedSubgenres(response.data);
                }
            });

        const mediumsGenresContainer = [];

        fetch(`${backendUrl}/genreSubgenresDesc?genreId=${genre.id}`)
            .then(response => response.json())
            .then(response => {
                if (userPickedContainer.length > 0) {

                    let found;
                    let userVoted;

                    response.data.forEach(item => {

                        found = userPickedContainer.find(element => element === item.subgenreId);

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


    const voteSubgenreIntoGenre = (e, genreId, subgenreId, symbol) => {
        e.preventDefault();

        let userPickLength = userPickedSubgenresLength;

        if (symbol === '+') {
            userPickLength += 1;
        } else if (symbol === '-') {
            userPickLength -= 1;
        }
        console.log(`user pick length: ${userPickLength}`)

        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        fetch(`${backendUrl}/relationships?date=${date}&genreId=${genreId}&subgenreId=${subgenreId}&userId=${loggedIn.id}&symbol=${symbol.toString()}`)
            .then(response => response.json())
            .then(response => {
                 if (response.data.length > 0) {
                     console.log(response.data[0])
                 } else {
                     console.log('doesn\'t exist');
                 }
            })
            .catch(err => console.error(err))
        setSearchValue('');
        setUserPickedSubgenresLength(userPickLength);

    }

    const RenderSubgenre = () => {
        return subgenresFiltered.map(subgenre => {
                if(subgenre.voted === 1) {
                    return (
                        <li className="userVotedForThis">
                            <p onClick={(e) => voteSubgenreIntoGenre(e, genre.id, subgenre.id, '-')}><b>{subgenre.name}</b> | {subgenre.votes}/{subgenre.total}</p>{" "}
                        </li>
                    );
                } else {
                    if (userPickedSubgenresLength === 3) {
                        return <li><p><b>{subgenre.name}</b> | {subgenre.votes}/{subgenre.total}</p></li>;
                    } else {
                        return (
                            <li>
                                <p onClick={(e) => voteSubgenreIntoGenre(e, genre.id, subgenre.id, '+')}><b>{subgenre.name}</b> | {subgenre.votes}/{subgenre.total}</p>{" "}
                            </li>
                        );
                    }
                }
            })
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
                <p><b>Number of genres voted:</b> {userPickedSubgenresLength}/3</p>
                <p>
                    <ul>
                        <li><b>Voted Subgenres:</b></li>
                        {
                            votedSubgenres.map(subgenre => {
                                return (
                                    <li className="userVotedForThis">
                                        <p onClick={(e) => voteSubgenreIntoGenre(e, subgenre.genreId, subgenre.subgenreId, '-')}><b>{subgenre.name}</b></p>{" "}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </p>
                <b>Search Results:</b>{" "}
                {message}
                <RenderSubgenre />
                </ul>

            </div>
        </div>
    );
}