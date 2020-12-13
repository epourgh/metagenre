import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Require as RequireAuthentication} from './auth/require.component'

export default function Profile() {
    
    const {backendUrl, reducers, mediums, genres, subgenres} = useContext(GlobalContext);
    const [userMediumsGenres, setUserMediumsGenres] = useState([]);

    useEffect(() => {
        getUserMediumsGenresVotes()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    const getUserMediumsGenresVotes = () => {
        
        fetch(`${backendUrl}/userBooleanMediums/${reducers.user.id}`)
        .then(response => response.json())
        .then(response => {
            console.log('response.data')
            console.log(response.data);
            if (response.data !== undefined) {
                setUserMediumsGenres(response.data);
                console.log(userMediumsGenres);
            }
        });
    }

    function timeDifference(previous) {

        previous = new Date(previous);

        let current = new Date().toISOString().slice(0, 19).replace('T', ' ');
        current = new Date(current);

        console.log(`curr: ${current}`)
        console.log(`prev: ${previous}`)

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        } else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
        } else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    const RenderUserDisplay = () => {
        if (reducers.user.display !== '-') {
            return (
                <>
                    <h1><b>{reducers.user.display}'s Profile</b></h1>
                    <p className="smallFont greyFont"><i>@{reducers.user.username}</i></p> 
                    <p className="smallFont greyFont"><i>USER #{reducers.user.id}</i></p> 
                </>
            )
        } else {
            return (
                <>
                    <h1><b>@{reducers.user.username}'s Profile</b></h1>
                    <p className="smallFont greyFont"><i>USER #{reducers.user.id}</i></p>
                </>
            )
        }
    }

    const RenderUserMediumsGenres = () => {
        if (mediums[0].id !== 0 && genres[0].id !== 0 && subgenres[0].id !== 0) {

            return (
                <>
                    {
                        userMediumsGenres.map(userMediumsGenre => {
                            if (userMediumsGenre.category === 'genres') {
                                return (<span key={userMediumsGenre.id}><hr className="greyLine"/><p className="smallFont"><a href={`/medium?id=${userMediumsGenre.mediumId}`}><b>{mediums[userMediumsGenre.mediumId].title}</b></a>: {genres[userMediumsGenre.genreId].name}(genre) {" "} <i className="greyFont">{timeDifference(userMediumsGenre.date)}</i></p></span>);
                            } else if (userMediumsGenre.category === 'subgenres') {
                                return (<span key={userMediumsGenre.id}><hr className="greyLine" /><p className="smallFont"><a href={`/medium?id=${userMediumsGenre.mediumId}`}><b>{mediums[userMediumsGenre.mediumId].title}</b></a>: {subgenres[userMediumsGenre.subgenreId].name}(subgenre) <i className="greyFont">{timeDifference(userMediumsGenre.date)}</i>{" "}</p></span>);
                            } else if (userMediumsGenre.category === 'relationships') {
                                return (<span key={userMediumsGenre.id}><hr className="greyLine" /><p className="smallFont"><b><a href={`/genre?type=genre&id=${userMediumsGenre.genreId}`}>{genres[userMediumsGenre.genreId].name} (genre)</a> x <a href={`/genre?type=subgenre&id=${userMediumsGenre.subgenreId}`}>{subgenres[userMediumsGenre.subgenreId].name} (subgenre)</a></b><i className="greyFont"> {timeDifference(userMediumsGenre.date)}</i>{" "}</p></span>);
                            }

                            return null;

                        })
                    }
                </>
            )
        } else {
            return <></>;
        }
    }


    return (
        <div className="userBodyContentStyling">
            <div className="profile-container">
                <RequireAuthentication />
                <div className="bodyContentStyling">
                <div className="individualMediumStyling">
                    <div className="row">
                            <RenderUserDisplay />
                            <br /> 
                            <div className="profile-div">
                                <label>Recent genre tags: </label>
                            </div>
                            <div className="profile-recent-styling">
                                <RenderUserMediumsGenres />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

