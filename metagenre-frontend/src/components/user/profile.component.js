import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export default function Profile() {
    
    const {backendUrl, loggedIn, mediums, genres, subgenres} = useContext(GlobalContext)
    const [userMediumsGenres, setUserMediumsGenres] = useState([]);
    
    useEffect(() => {
        getUserMediumsGenresVotes();
    }, []);
    console.log('mediums')
    console.log(mediums)

    const getUserMediumsGenresVotes = () => {

        fetch(`${backendUrl}/userBooleanMediums/${loggedIn.id}`)
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
        if (loggedIn.display !== '-') {
            return (
                <>
                    <h1><b>{loggedIn.display}'s Profile</b></h1>
                    <p className="smallFont greyFont"><i>@{loggedIn.username}</i></p> 
                    <p className="smallFont greyFont"><i>USER #{loggedIn.id}</i></p> 
                </>
            )
        } else {
            return (
                <>
                    <h1><b>@{loggedIn.username}'s Profile</b></h1>
                    <p className="smallFont greyFont"><i>USER #{loggedIn.id}</i></p>
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
                                return (<><hr class="greyLine"/><p className="smallFont"><a href={`./medium?id=${userMediumsGenre.mediumId}`}><b>{mediums[userMediumsGenre.mediumId].title}</b></a>: {genres[userMediumsGenre.genreId].name}(genre) {" "} <i class="greyFont">{timeDifference(userMediumsGenre.date)}</i></p></>);
                            } else if (userMediumsGenre.category === 'subgenres') {
                                return (<><hr class="greyLine" /><p className="smallFont"><a href={`./medium?id=${userMediumsGenre.mediumId}`}><b>{mediums[userMediumsGenre.mediumId].title}</b></a>: {subgenres[userMediumsGenre.subgenreId].name}(subgenre) <i class="greyFont">{timeDifference(userMediumsGenre.date)}</i>{" "}</p></>);
                            } else if (userMediumsGenre.category === 'relationships') {
                                return (<><hr class="greyLine" /><p className="smallFont"><b><a href={`./genre?type=genre&id=${userMediumsGenre.genreId}`}>{genres[userMediumsGenre.genreId].name} (genre)</a> x <a href={`./genre?type=subgenre&id=${userMediumsGenre.subgenreId}`}>{subgenres[userMediumsGenre.subgenreId].name} (subgenre)</a></b><i class="greyFont"> {timeDifference(userMediumsGenre.date)}</i>{" "}</p></>);
                            }

                        })
                    }
                </>
            )
        } else {
            return <></>;
        }
    }


    return (
        <div className="bodyContentStyling">
           <div className="individualMediumStyling">
               <div className="row">
                    <RenderUserDisplay />
                    <br /> 
                    <h3>Recent genre tags:</h3>
                    <RenderUserMediumsGenres />
                </div>
            </div>
        </div>
    )
}

