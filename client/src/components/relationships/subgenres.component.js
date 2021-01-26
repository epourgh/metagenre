import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext, DispatchContext } from '../../context/GlobalState';
import { actionRelationship } from '../../context/actions/index';

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
    
    const [userId, setUserId] = useState(0);

    const { dispatchMiddleware, dispatch } = useContext(DispatchContext);
    const { backendUrl, reducers} = useContext(GlobalContext);

    const [id, title] = getWindowParam();
    const [genre] =  useState({
        id: id,
        title: title
    });
    const [subgenresFiltered, setSubgenresFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [fetchGenreSubgenres, setFetchGenreSubgenres] = useState([]);
    const [message, setMessage] = useState('Currently nothing to show.');
    const [genresSubgenres, setGenresSubgenres] = useState([]);
    const [userPickedSubgenresLength, setUserPickedSubgenresLength] = useState(3);

    useEffect(() => {
        dispatchRequestsCallback();
    }, [])

    useEffect(() => {

        if (userId === 0 && typeof reducers.user.id !== "undefined") {
            setUserId(reducers.user.id)
        }

        setGenresSubgenres((typeof reducers.relationship.genresSubgenres !== "undefined")?reducers.relationship.genresSubgenres:[]);
        setUserPickedSubgenresLength((typeof reducers.relationship.userPickedSubgenresLength !== "undefined")?reducers.relationship.userPickedSubgenresLength:7);
        setFetchGenreSubgenres((typeof reducers.relationship.fetchedSubgenresPicks !== "undefined")?reducers.relationship.fetchedSubgenresPicks:[]);
        // console.log('---- INIT ---')
        // getGenreSubgenres()
    }, [reducers]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log('---- VOTED ---')
        // getGenreSubgenres();
        dispatchRequestsCallback();
        searchHandler();
    }, [userPickedSubgenresLength]) // eslint-disable-line react-hooks/exhaustive-deps


    const dispatchRequestsCallback = () => {
        dispatchRequests.pickedSubgenres();
    }

    const dispatchRequests = {
        pickedSubgenres: () => {
            dispatchMiddleware(dispatch)(actionRelationship.actionPickedSubgenres({url: [`${backendUrl}/userBooleanRelationships?userId=${userId}&genreId=${genre.id}`, `${backendUrl}/genreSubgenresDesc?genreId=${genre.id}`]}));
        }
    }

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

        let jsonifiedParams = {
            date: date,
            genreId: genreId,
            subgenreId: subgenreId,
            userId: userId,
            symbol: symbol
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(jsonifiedParams)
        }

        fetch(`${backendUrl}/relationships`, options)
            .then(response => response.json())
            .then(response => {
                console.log(` RESPONSE: ${response.data}`)
            })
            .catch(err => console.error(err))

        // getGenreSubgenres();
        dispatchRequestsCallback();
        setSearchValue('');
        setUserPickedSubgenresLength(userPickLength);

    }

    const RenderVotedSubgenre = () => {
        return fetchGenreSubgenres.map(subgenre => {
            return (
                <li key={subgenre.subgenreId} className="userVotedForThis">
                    <p onClick={(e) => voteSubgenreIntoGenre(e, subgenre.genreId, subgenre.subgenreId, '-')}><b>{subgenre.name}</b></p>{" "}
                </li>
            )
        })
    }

    const RenderSearchedSubgenre = () => {
        return subgenresFiltered.map(subgenre => {
            if(subgenre.voted === 1) {
                return (
                    <li className="userVotedForThis" key={subgenre.id}>
                        <p onClick={(e) => voteSubgenreIntoGenre(e, genre.id, subgenre.id, '-')}><b>{subgenre.name}</b> | {subgenre.votes}</p>{" "}
                    </li>
                );
            } else {
                if (userPickedSubgenresLength === 3) {
                    return <li key={subgenre.id}><p><b>{subgenre.name}</b> | {subgenre.votes}</p></li>;
                } else {
                    return (
                        <li key={subgenre.id}>
                            <p onClick={(e) => voteSubgenreIntoGenre(e, genre.id, subgenre.id, '+')}><b>{subgenre.name}</b>| {subgenre.votes}</p>{" "}
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
                    <ul>
                        <li><b>Voted Subgenres:</b></li>
                        <RenderVotedSubgenre />
                    </ul>
                    <b>Search Results:</b>{" "}
                    {message}
                    <RenderSearchedSubgenre />
                </ul>

            </div>
        </div>
    );
}