import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Require as RequireAuthentication} from './auth/require.component';
import timeDifference from '../../utility/time-difference.utility';

export default function Profile() {
    
    const [userId, setUserId] = useState(0);
    const {backendUrl, reducers, mediums, genres, subgenres} = useContext(GlobalContext);
    const [userMediumsGenres, setUserMediumsGenres] = useState([]);

    useEffect(() => {
        getUserMediumsGenresVotes()
    }, [])

    useEffect(() => {
        if (userId === 0 && typeof reducers.user.id !== "undefined") {
            setUserId(reducers.user.id)
        }
        getUserMediumsGenresVotes()
    }, [reducers]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const getUserMediumsGenresVotes = () => {
        fetch(`${backendUrl}/userBooleanMediums/${userId}`)
        .then(response => response.json())
        .then(response => {
            if (response.data !== undefined) {
                setUserMediumsGenres(response.data);
            }
        });
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

            // ids need to be subtracted as mediums/genres/subgenres containers index at 0
            
            return (
                <>
                    {
                        userMediumsGenres.map(userMediumsGenre => {
                            if (userMediumsGenre.category === 'genres') {
                                return (<span key={userMediumsGenre.id}><hr className="greyLine"/><p className="smallFont"><a href={`/medium?id=${userMediumsGenre.mediumId}`}><b>{mediums[userMediumsGenre.mediumId-1].title}</b></a>: {genres[userMediumsGenre.genreId-1].name}(genre) {" "} <i className="greyFont">{timeDifference(userMediumsGenre.date)}</i></p></span>);
                            } else if (userMediumsGenre.category === 'subgenres') {
                                return (<span key={userMediumsGenre.id}><hr className="greyLine" /><p className="smallFont"><a href={`/medium?id=${userMediumsGenre.mediumId}`}><b>{mediums[userMediumsGenre.mediumId-1].title}</b></a>: {subgenres[userMediumsGenre.subgenreId-1].name}(subgenre) <i className="greyFont">{timeDifference(userMediumsGenre.date)}</i>{" "}</p></span>);
                            } else if (userMediumsGenre.category === 'relationships') {
                                return (<span key={userMediumsGenre.id}><hr className="greyLine" /><p className="smallFont"><b><a href={`/genre?type=genre&id=${userMediumsGenre.genreId}`}>{genres[userMediumsGenre.genreId-1].name} (genre)</a> x <a href={`/genre?type=subgenre&id=${userMediumsGenre.subgenreId}`}>{subgenres[userMediumsGenre.subgenreId-1].name} (subgenre)</a></b><i className="greyFont"> {timeDifference(userMediumsGenre.date)}</i>{" "}</p></span>);
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

