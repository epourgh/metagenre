import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext, DispatchContext } from '../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { actionMedium } from '../context/actions/index';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();    
    return id;
}

export default function Medium() {

    const { dispatchMiddleware, dispatch } = useContext(DispatchContext);
    const { backendUrl, reducers } = useContext(GlobalContext);

    const id = getWindowParam();

    // STATES
    const [userId, setUserId] = useState(0);
    const [mediumsGenres, setMediumsGenres] = useState([]);
    const [userpickedGenresLength, setUserPickedGenresLength] = useState(0);
    const [mediumsSubgenres, setMediumsSubgenres] = useState([]);
    const [mediumsCreatorsSeries, setMediumsCreatorsSeries] = useState([]);
    const [similar, setSimilar] = useState({title: '', mediums: []});
    const [extLinks, setExtLinks] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [regions, setRegions] = useState([]);
    const [noGenres, setNoGenres] = useState('');
    const [mediumDetails, setMediumDetails] = useState([{title: ''}]);
    const [mediumPictureCount, setMediumPictureCount] = useState([0, 0, 0, '', '']);
    const [noGenresOrSubgenresNotification, setNoGenresOrSubgenresNotification] = useState('');
    const [medium, setMedium] = useState({
        genreName: '',
        genreType: 'genre'
    });

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    useEffect(() => {
        dispatchRequests.mediumsDetails();
        dispatchRequests.platforms();
        dispatchRequests.regions();
        dispatchRequests.similarMediums();
        dispatchRequests.extLinks();
        dispatchRequests.creatorSeries();
    }, [])

    useEffect(() => {
        if (typeof userId !== "undefined") {
            dispatchRequests.mediumsGenresMultiple('mediumsGenres', 'userBooleanMediumsGenres');
            dispatchRequests.mediumsSubgenresMultiple('mediumsSubgenres','userBooleanMediumsSubgenres');
        }
    }, [userId])

    useEffect(() => {
        
        if (userId === 0 && typeof reducers.user.id !== "undefined") {
            setUserId(reducers.user.id)
        }

        setMediumDetails((typeof reducers.medium.details !== "undefined")?reducers.medium.details:[{title: ''}]);
        setMediumPictureCount((typeof reducers.medium.pictureCount !== "undefined")?reducers.medium.pictureCount:[0, 0, 0, '', '']);
        setPlatforms((typeof reducers.medium.platforms !== "undefined")?reducers.medium.platforms:[]);
        setRegions((typeof reducers.medium.regions !== "undefined")?reducers.medium.regions:[]);
        setSimilar((typeof reducers.medium.similar !== "undefined")?reducers.medium.similar:{title: '', mediums: []});
        setExtLinks((typeof reducers.medium.extLinks !== "undefined")?reducers.medium.extLinks:[]);
        setMediumsCreatorsSeries((typeof reducers.medium.mediumsCreatorsSeries !== "undefined")?reducers.medium.mediumsCreatorsSeries:[]);
        setMediumsGenres((typeof reducers.medium.mediumsGenres !== "undefined")?reducers.medium.mediumsGenres:[]);
        setMediumsSubgenres((typeof reducers.medium.mediumsSubgenres !== "undefined")?reducers.medium.mediumsSubgenres:[]);
        setUserPickedGenresLength((typeof reducers.medium.userPickedGenresLength !== "undefined")?reducers.medium.userPickedGenresLength:0);
    }, [reducers]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {  
        checkMediumsGenres();
    })

    const dispatchRequests = {
        mediumsDetails: () => dispatchMiddleware(dispatch)(actionMedium.actionMediumDetails({url: `${backendUrl}/mediumsDetails/${id}`})),
        platforms: () => dispatchMiddleware(dispatch)(actionMedium.actionMediumDetails({url: `${backendUrl}/mediumsDetails/${id}`})),
        regions: () => dispatchMiddleware(dispatch)(actionMedium.actionRegions({url: `${backendUrl}/regions`})),
        similarMediums: () => dispatchMiddleware(dispatch)(actionMedium.actionSimilar({url: `${backendUrl}/similar/${id}`})),
        extLinks: () => dispatchMiddleware(dispatch)(actionMedium.actionExternalLinks({url: `${backendUrl}/mediumExternalLinks/${id}`})),
        creatorSeries: () => dispatchMiddleware(dispatch)(actionMedium.actionCreatorsSeries({url: `${backendUrl}/mediumsCreatorsSeries/view/${id}`})),
        mediumsGenresMultiple: (mediumsGenres, userBooleanMediumsGenres) => {
            dispatchMiddleware(dispatch)(actionMedium.actionGenresMultiple({url: [`${backendUrl}/${userBooleanMediumsGenres}?userId=${userId}&mediumId=${id}`, `${backendUrl}/${mediumsGenres}/view/${id}`]}));
        },
        mediumsSubgenresMultiple: (mediumsSubenres, userBooleanMediumsGenres) => {
            dispatchMiddleware(dispatch)(actionMedium.actionSubgenresMultiple({url: [`${backendUrl}/${userBooleanMediumsGenres}?userId=${userId}&mediumId=${id}`, `${backendUrl}/${mediumsSubenres}/view/${id}`]}))
        }
    }


    const checkMediumsGenres = () => {
        if (mediumsGenres.length === 0 && mediumsSubgenres.length === 0) {
            setNoGenresOrSubgenresNotification('No one has voted on genres or subgneres yet ')
            setNoGenres('None');
        } else {
            setNoGenresOrSubgenresNotification('Vote on genres and subgenres ')
            setNoGenres('');
        }
    }
 
    const voteMediumGenre = (mediumGenresId, routeString, routeString2, mediumGenreVotes, genreId, symbol) => {

        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let jsonifiedParams = {
            date: date,
            votes: mediumGenreVotes,
            symbol: symbol,
            userId: reducers.user.id,
            mediumId: id,
            genreId: genreId,
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(jsonifiedParams)
        }

        fetch(`${backendUrl}/${routeString}/update/${mediumGenresId}`, options).then(response => {
            dispatchRequests.mediumsGenresMultiple(routeString, routeString2);
            // getMediumsGenres(routeString);
        })
        .catch(err => console.log(err))

    }

 
    const voteMediumSubgenre = (mediumGenresId, routeString, routeString2, mediumGenreVotes, genreId, symbol) => {

        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        let jsonifiedParams = {
            date: date,
            votes: mediumGenreVotes,
            symbol: symbol,
            userId: reducers.user.id,
            mediumId: id,
            genreId: genreId,
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(jsonifiedParams)
        }

        fetch(`${backendUrl}/${routeString}/update/${mediumGenresId}`, options).then(response => {
            dispatchRequests.mediumsSubgenresMultiple(routeString, routeString2);
            // getMediumsGenres(routeString);
        }).catch(err => console.log(err))

    }


    const addGenreToMedium = () => {
 
        if (typeof medium.genreName != undefined 
            && medium.genreName !== ''
            && typeof id != undefined) {

            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            let jsonifiedParams = {
                date: date,
                genreName: medium.genreName,
                userId: reducers.user.id,
                mediumId: id,
                mediumType: medium.genreType
            }

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(jsonifiedParams)
            }

            fetch(`${backendUrl}/mediumsGenresChecker`, options).then(update => {
                if (medium.genreType === 'genre') {
                    dispatchRequests.mediumsGenresMultiple('mediumsGenres', 'userBooleanMediumsGenres');
                    // getMediumsGenres('mediumsGenres');
                } else if (medium.genreType === 'subgenre') {
                    dispatchRequests.mediumsSubgenresMultiple('mediumsSubgenres', 'userBooleanMediumsSubgenres');
                }
            }).catch(err => console.log(err))
        }
    }

    const RenderSeries = () => {

        if (mediumsCreatorsSeries.length > 1) {
            return (
                <div>
                    <hr />
                    <br />
                    <h3>Content in the <Link to={`series?id=${mediumsCreatorsSeries[0].seriesId}`}>{mediumsCreatorsSeries[0].seriesName}</Link> series:</h3>
                    <br />
                    <ul>
                        {
                            mediumsCreatorsSeries.map(mediumCreatorsSeries => {
                                return(<li key={mediumCreatorsSeries.mediumId}><b><Link to={`medium?id=${mediumCreatorsSeries.mediumId}&title=${mediumCreatorsSeries.title}`}>{mediumCreatorsSeries.title}</Link></b> ({mediumCreatorsSeries.year}) by <Link to={`creator?id=${mediumCreatorsSeries.creatorId}`}>{mediumCreatorsSeries.creatorName}</Link> </li>);
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (<p></p>)
        }
    }

    const RenderSimilar = () => {

        if (similar.title !== '') {
            return (
                <>
                    <br/><hr/><br/>
                    <div>
                        <h3>{similar.title}</h3>
                        {
                            similar.mediums.filter(content => content !== undefined).map(content => {
                                return(<p key={content[0].id}><Link to={`./medium?id=${content[0].id}&title=${content[0].title}`}>{content[0].title}</Link>: {content[0].percentage}%</p>);
                            })
                        }
                    </div>
                    <br />
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const RenderUserInputRecommendGenre = () => {

        if(reducers.user.id !== 0) {
            return (
                <div>
                    <b className="smallFont">Suggest: </b>
                    <select useref="userInput"
                            required
                            value={medium.genreType}
                            onChange={e => setMedium({  ...medium, genreType: e.target.value })}>
                        <option 
                            key='genre'
                            value='genre'>
                            genre
                        </option>
                        <option 
                            key='subgenre'
                            value='subgenre'>
                            subgenre
                        </option>
                    </select>
                    {" "}
                    <input value={medium.genreName} 
                            onChange={e => setMedium({ ...medium, genreName: e.target.value })} />
                    {" "}
                    <button onClick={() => addGenreToMedium()}>Submit</button>
                </div>
            ) 
        } else {
            return (<></>);
        }
    }

    const RenderMediumsGenre = () => {
        return mediumsGenres.map(mediumGenre => {
            if ((mediumGenre.voted === 0 || reducers.user.id === 0) && userpickedGenresLength === 3) {
                return (
                    <li key={mediumGenre.id}>
                        <p><b>{mediumGenre.name }</b> | {mediumGenre.votes} {" "}</p>
                    </li>
                )
            } else if (mediumGenre.voted === 1) {
                return (
                    <li  key={mediumGenre.id} className="userVotedForThis">
                        <p onClick={() => voteMediumGenre(mediumGenre.id, 'mediumsGenres', 'userBooleanMediumsGenres', mediumGenre.votes, mediumGenre.genreId, '-')}><b>{mediumGenre.name }</b> | {mediumGenre.votes}</p> {" "}
                    </li>
                )
            } else if (mediumGenre.voted === undefined || userpickedGenresLength < 3) {
                return (
                    <li key={mediumGenre.id}>
                        <p onClick={() => voteMediumGenre(mediumGenre.id, 'mediumsGenres', 'userBooleanMediumsGenres', mediumGenre.votes, mediumGenre.genreId, '+')}><b> {mediumGenre.name}</b> | {mediumGenre.votes}</p> {" "}
                    </li>
                )
            }
            return null;
        })
    }

    const RenderMediumsSubgenre = () => {
        return mediumsSubgenres.map(mediumGenre => {
            if ((mediumGenre.voted === 0 || reducers.user.id === 0) && userpickedGenresLength === 3) {
                return (
                    <li key={mediumGenre.subgenreId}>
                        <p><b>{mediumGenre.name }</b> | {mediumGenre.votes} {" "}</p>
                    </li>
                )
            } else if (mediumGenre.voted === 1) {
                return (
                    <li key={mediumGenre.subgenreId} className="userVotedForThis">
                        <p onClick={() => voteMediumSubgenre(mediumGenre.id, 'mediumsSubgenres', 'userBooleanMediumsSubgenres', mediumGenre.votes, mediumGenre.subgenreId, '-')}><b>{mediumGenre.name}</b> | {mediumGenre.votes}</p> {" "}
                    </li>
                )
            } else if (mediumGenre.voted === undefined || userpickedGenresLength < 3) {
                return (
                    <li key={mediumGenre.subgenreId}>
                        <p onClick={() => voteMediumSubgenre(mediumGenre.id, 'mediumsSubgenres', 'userBooleanMediumsSubgenres', mediumGenre.votes, mediumGenre.subgenreId, '+')}><b> {mediumGenre.name}</b> | {mediumGenre.votes}</p> {" "}
                    </li>
                )
            }
            return null;
        })
    }


    const enlargePicture = (i) => {
        setMediumPictureCount([mediumPictureCount[0], mediumPictureCount[1], 1, mediumPictureCount[3], i])
    }

    const seePictures = () => {
        mediumPictureCount[3] = (mediumPictureCount[3] === 'more photos') ? 'collapse photos' : 'more photos';
        setMediumPictureCount([mediumPictureCount[1], mediumPictureCount[0], 1, mediumPictureCount[3], mediumPictureCount[4]])
    }

    return (
        <div className="bodyContentStyling">
           <div className="individualStyling">
               <div className="row">
                        <div className="column-body">
                            <div className="row">
                                <div className="column-medium-1">
                                    <img src={`./images/medium/${id}/frontPageThumbnail.png`} alt="Main Thumnail" width="150" />
                                </div>
                                <div className="column-medium-2">
                                    <h1><b>{mediumDetails[0] ? <>{mediumDetails[0].title}</>:null}</b></h1>
                                    {
                                        mediumDetails.map(mediumsDetail => {
                                            return(
                                                <p key={mediumsDetail.id} className="smallFont">
                                                    {
                                                        mediumsDetail.regionId1 && regions.length >= 1 ? <span key={1}>{`${regions[mediumsDetail.regionId1 - 1].acronym}`}</span>:null
                                                    }
                                                    {
                                                        mediumsDetail.regionId2 && regions.length >= 1 ? <span key={2}>{`/${regions[mediumsDetail.regionId2 - 1].acronym}`}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.regionId3 && regions.length >= 1 ? <span key={3}>{`/${regions[mediumsDetail.regionId3 - 1].acronym}`}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.regionId4 && regions.length >= 1 ? <span key={4}>{`/${regions[mediumsDetail.regionId4 - 1].acronym}`}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.regionId5 && regions.length >= 1 ? <span key={5}>{`/${regions[mediumsDetail.regionId5 - 1].acronym}`}{" "}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId1 && platforms.length >= 1 ? <span key={6}>{`${platforms[mediumsDetail.platformId1 - 1].name}`}</span>:null
                                                    }
                                                    {
                                                        mediumsDetail.platformId2 && platforms.length >= 1 ? <span key={7}>{`/${platforms[mediumsDetail.platformId2 - 1].name}`}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId3 && platforms.length >= 1 ? <span key={8}>{`/${platforms[mediumsDetail.platformId3 - 1].name}`}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId4 && platforms.length >= 1 ? <span key={9}>{`/${platforms[mediumsDetail.platformId4 - 1].name}`}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId5 && platforms.length >= 1 ? <span key={10}>{`/${platforms[mediumsDetail.platformId5 - 1].name}`}{" "}</span> :null
                                                    }
                                                    {
                                                        mediumsDetail.year ? <span key={11}> {
                                                            `(${months[mediumsDetail.month]} ${mediumsDetail.day}, ${mediumsDetail.year})`
                                                        } </span> : null 
                                                    }
                                                </p>
                                            )
                                        })

                                    }
            
                                    <p className="smallFont">{mediumDetails.shortDesc}</p>

                                    <br />

                                    <p className="smallFont">
                                        { extLinks.metacritic ? <a href={`https://www.metacritic.com/${extLinks.metacritic}`} target="_blank" rel="noopener noreferrer">Metacritic</a> : null }{" "} {/*eslint-disable-line*/} 
                                        { extLinks.imdb ? <a href={`https://www.imdb.com/title/${extLinks.imdb}`} target="_blank" rel="noopener noreferrer">IMDB</a> : null }{" "} {/*eslint-disable-line*/} 
                                        { extLinks.opencritic ? <a href={`https://www.opencritic.com/game/${extLinks.opencritic}`} target="_blank" rel="noopener noreferrer">Opencritic</a> : null }{" "} {/*eslint-disable-line*/} 
                                        { extLinks.rateyourmusic ? <a href={`https://rateyourmusic.com/artist/${extLinks.rateyourmusic}`} target="_blank" rel="noopener noreferrer">RateYourMusic</a> : null }{" "} {/*eslint-disable-line*/} 
                                        <a href={`https://www.amazon.com/s?k=${ extLinks.amazon ? extLinks.amazon : mediumDetails[0] ? mediumDetails[0].title : null }`} target="_blank" rel="noopener noreferrer">Amazon</a>{" "} {/*eslint-disable-line*/} 
                                        <a href={`https://www.ebay.com/sch/i.html?_nkw=${ extLinks.ebay ? extLinks.ebay : mediumDetails[0] ? mediumDetails[0].title : null }`} target="_blank" rel="noopener noreferrer">eBay</a>{" "} {/*eslint-disable-line*/} 
                                        { extLinks.goodreads ? <a href={`https://www.goodreads.com/book/show/${extLinks.goodreads}`} target="_blank" rel="noopener noreferrer">Goodreads</a> : null }{" "} {/*eslint-disable-line*/} 
                                        <a href={`https://www.youtube.com/results?search_query=${ extLinks.youtube ? extLinks.youtube : mediumDetails[0] ? mediumDetails[0].title : null }`} target="_blank" rel="noopener noreferrer">YouTube</a>{" "} {/*eslint-disable-line*/} 
                                        { extLinks.wiki ? <a href={`https://en.wikipedia.org/wiki/${extLinks.wiki}`} target="_blank" rel="noopener noreferrer">Wikipedia</a> : null }{" "} {/*eslint-disable-line*/} 
                                        { extLinks.howlongtobeat ? <a href={`https://howlongtobeat.com/game?id=${extLinks.howlongtobeat}`} target="_blank" rel="noopener noreferrer">HowLongToBeat</a> : null }{" "} {/*eslint-disable-line*/} 
                                        { extLinks.fandomPrefix ? <a href={`https://${extLinks.fandomPrefix}.fandom.com/wiki/${extLinks.fandomSuffix}`} target="_blank" rel="noopener noreferrer">Fandom</a> : null }{" "} {/*eslint-disable-line*/} 
                                    </p>
                            <br />

                            </div>
                            </div>

                            <div className="genreVoteBody">
                                <br />
                                <p className="smallFont">
                                    <b>{noGenresOrSubgenresNotification} for {mediumDetails[0] ? <>{mediumDetails[0].title}:</>:<>medium:</>}</b>
                                    </p> 
                                <ul className="listGenreStyling">
                                    <li key={0} className="genreCategory"><b>genres:</b></li>
                                    <RenderMediumsGenre />
                                </ul>
                                
                                
                                <ul className="listGenreStyling">
                                    <li key={0} className="genreCategory"><b>subgenres:</b></li>

                                    <RenderMediumsSubgenre />
                                </ul>

                                <br />

                                <RenderUserInputRecommendGenre />

                                <br />

                            
                                {
                                    mediumPictureCount[4]?<div className="selectedImage"><div className="imageContainer"><span onClick={() => enlargePicture('')}><img src={`./images/medium/${id}/${mediumPictureCount[4]}`} width="400" alt="enlarged gallery" /></span><div className="imageContainerTopRight imageContainerTopClose"><b><span onClick={() => enlargePicture('')}><FontAwesomeIcon icon={faTimes}/></span></b></div></div></div>:null
                                }
                                


                                <ul className="imageGallery">
                                    { 
                                        [...Array(mediumPictureCount[0])].map((e, i) => {
                                            return <li key={i}><span onClick={() => enlargePicture(`galleryPic_${i}.png`)}><img src={`./images/medium/${id}/galleryPic_${i}.png`} width="100" alt="gallery selection" /></span>{' '}</li>
                                        })
                                    }
                                    {
                                        mediumPictureCount[2] === 1 ? (
                                            <li key={0}>
                                                <div className="morePictures">
                                                    <span onClick={() => seePictures()} className="smallFont">{mediumPictureCount[3]}</span>
                                                </div>
                                            </li>
                                        ) : null
                                    }
                                </ul>

                                <br />

                                <RenderSimilar />
                                
                                <RenderSeries />
                    
                            </div>
                        </div>
                        <div className="column-sidebar">

                            <h5><b>Read More on Medium's genres:</b></h5>
                            <br />
                            <p className="smallFont">Genres:</p>
                            <p className="smallFont">{noGenres}</p>
                            {
                                mediumsGenres.map(mediumGenre => {
                                    return (<li key={mediumGenre.genreId} className="smallFont"><a href={`./genre?type=genre&id=${mediumGenre.genreId}`}>{mediumGenre.name}</a> {" "}</li>);
                                })
                            }
                            <br />
                            <p className="smallFont">Subgenres:</p>
                            <p className="smallFont">{noGenres}</p>
                            {
                                mediumsSubgenres.map(mediumSubgenre => {
                                    return (<li key={mediumSubgenre.subgenreId} className="smallFont"><a href={`./genre?type=subgenre&id=${mediumSubgenre.subgenreId}`}>{mediumSubgenre.name }</a> {" "}</li>);
                                })
                            }
                        </div>
                
                </div>               
            </div>
        </div>
    );
}