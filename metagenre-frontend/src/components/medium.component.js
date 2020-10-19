import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();    
    return id;
}

export default function Medium() {
    
    const { backendUrl, loggedIn} = useContext(GlobalContext)
    const id = getWindowParam();
    const [mediumsGenres, setMediumsGenres] = useState([]);
    const [userpickedGenresLength, setUserPickedGenresLength] = useState(0);
    const [mediumsSubgenres, setMediumsSubgenres] = useState([]);
    const [mediumsCreatorsSeries, setMediumsCreatorsSeries] = useState([]);
    const [similarTitle, setSimilarTitle] = useState([]);
    const [extLinks, setExtLinks] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [mediumsDetails, setMediumsDetails] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [regions, setRegions] = useState([]);
    const [noGenres, setNoGenres] = useState('');
    const [pictureCount, setPictureCount] = useState([0, 0, 0, '', '']);
    const [noGenresOrSubgenresNotification, setNoGenresOrSubgenresNotification] = useState('')
    const [medium, setMedium] = useState({
        genreName: '',
        genreType: 'genre'
    });
    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
    console.log(id)

    useEffect(() => {
        getMediumsDetails();
        getPlatforms();
        getRegions();
        console.log('-----mediumsgenres')
        getMediumsGenresMultiple('mediumsGenres', 'userBooleanMediumsGenres');
        console.log('-----mediumssubgenres')
        getMediumsGenresMultiple('mediumsSubgenres', 'userBooleanMediumsSubgenres');
        // getMediumsGenres('mediumsGenres');
        // getMediumsGenres('mediumsSubgenres');
        getSimilarMediums();
        getExternalLinks();
        getCreatorsSeries();
    }, [id])

    useEffect((event) => {
        checkMediumsGenres();
    })

    const getMediumsDetails = () => {
        fetch(`${backendUrl}/mediumsDetails/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                setMediumsDetails(response.data);
                setPictureCount((response.data[0].numberOfGalleryPics > 3) ? [3, response.data[0].numberOfGalleryPics, 1, 'more photos', ''] : [response.data[0].numberOfGalleryPics, response.data[0].numberOfGalleryPics, 0, '', '']);
            });
    }

    const getPlatforms = () => {
        fetch(`${backendUrl}/platforms`)
            .then(response => response.json())
            .then(response => {
                setPlatforms(response.data);
            });
    }

    const getRegions = () => {
    fetch(`${backendUrl}/regions`)
        .then(response => response.json())
        .then(response => {
            setRegions(response.data);
        });
    }

    const getSimilarMediums = () => {
        fetch(`${backendUrl}/similar/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data);
                if (response.data[0][0] !== undefined) {
                    setSimilarTitle('Similar Voted Mediums:');
                    setSimilar(response.data.map(content => {
                        return content[0];
                    }))
                }
            });
    }

    const getExternalLinks = () => {
        fetch(`${backendUrl}/mediumExternalLinks/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log('response.data')
                console.log(response.data);
                if (response.data !== undefined) {
                    setExtLinks(response.data[0])
                }
            });
    }


    const getCreatorsSeries = () => {
        fetch(`${backendUrl}/mediumsCreatorsSeries/view/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    setMediumsCreatorsSeries(response.data)
            }
        });
    }

    const getMediumsGenresMultiple = (mediumsGenres, userBooleanMediumsGenres) => {

        const userPickedContainer = [];

        fetch(`${backendUrl}/${userBooleanMediumsGenres}?userId=${loggedIn.id}&mediumId=${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                if (response.data !== undefined) {
                    if (mediumsGenres === 'mediumsGenres') {
                        response.data.forEach(item => {
                            userPickedContainer.push(item.genreId);
                        })
                    } else {
                        response.data.forEach(item => {
                            userPickedContainer.push(item.subgenreId);
                        })
                    }
                    console.log(userPickedContainer)
                }
            });

        const mediumsGenresContainer = [];

        fetch(`${backendUrl}/${mediumsGenres}/view/${id}`)
            .then(response => response.json())
            .then(response => {
                if (userPickedContainer.length > 0) {

                    let i = 0;
                    let found;
                    let userVoted;

                    console.log(mediumsGenres);

                    response.data.forEach(item => {
                        
                        if (mediumsGenres === 'mediumsGenres') {
                            found = userPickedContainer.find(element => element == item.genreId);
                        } else {
                            found = userPickedContainer.find(element => element == item.subgenreId);
                        }

                        console.log('FOUND')
                        console.log(found)
                        userVoted = (found !== undefined)? 1:0;

                        let content = {
                            id: item.id,
                            title: item.title,
                            name: item.name,
                            votes: item.votes,
                            voted: userVoted
                        }

                        if (mediumsGenres === 'mediumsGenres') {
                            content.genreId = item.genreId;
                        } else {
                            content.subgenreId = item.subgenreId;
                        }

                        mediumsGenresContainer.push(content);
                    })

                    if (mediumsGenres === 'mediumsGenres') {
                        setMediumsGenres(mediumsGenresContainer)
                    } else {
                        setMediumsSubgenres(mediumsGenresContainer)
                    }

                    setUserPickedGenresLength(userPickedContainer.length);

                } else {

                    if (mediumsGenres === 'mediumsGenres') {
                        setMediumsGenres(response.data)
                    } else {
                        setMediumsSubgenres(response.data)
                    }

                    setUserPickedGenresLength(3);
                    
                }
            });

        console.log('/////////////')
        console.log(mediumsGenresContainer)

    }


    const getMediumsGenres = (stringParam) => {

        fetch(`${backendUrl}/${stringParam}/view/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.length)
                if (response.data.length > 0) {
                    if (stringParam === 'mediumsGenres') {
                        setMediumsGenres(response.data)
                    } else {
                        setMediumsSubgenres(response.data)
                    }
                }
            
            });
    }

    const checkMediumsGenres = () => {
        console.log(`${mediumsGenres.length} && ${mediumsSubgenres.length}`)
        if (mediumsGenres.length == 0 && mediumsSubgenres.length == 0) {
            setNoGenresOrSubgenresNotification('No one has voted on genres or subgneres yet ')
            setNoGenres('None');
        } else {
            setNoGenresOrSubgenresNotification('Vote on genres and subgenres ')
            setNoGenres('');
        }
    }
 
    const voteMediumGenre = (mediumGenresId, routeString, routeString2, mediumGenreVotes, genreId, symbol) => {

        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        fetch(`${backendUrl}/${routeString}/update/${mediumGenresId}?date=${date}&votes=${mediumGenreVotes}&symbol=${symbol.toString()}&userId=${loggedIn.id}&mediumId=${id}&genreId=${genreId}`)
            .then(response => {
                console.log(response)
                getMediumsGenresMultiple(routeString, routeString2);
                // getMediumsGenres(routeString);
            })
            .catch(err => console.log(err))

    }


    const addGenreToMedium = () => {
 
        if (typeof medium.genreName != undefined 
            && medium.genreName !== ''
            && typeof id != undefined) {

            console.log(`name=${medium.genreName}&mediumId=${id}&genreType=${medium.genreType}`);

            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            fetch(`${backendUrl}/mediumsGenresChecker?date=${date}&genreName=${medium.genreName}&userId=${loggedIn.id}&mediumId=${id}&mediumType=${medium.genreType}`)
                .then(update => {
                    console.log(update.url)

                    if (medium.genreType === 'genre') {
                        getMediumsGenresMultiple('mediumsGenres', 'userBooleanMediumsGenres');
                        // getMediumsGenres('mediumsGenres');
                    } else if (medium.genreType === 'subgenre') {
                        getMediumsGenresMultiple('mediumsSubgenres', 'userBooleanMediumsSubgenres');
                    }

                })
                .catch(err => console.log(err))
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
                                return(<li><b><Link to={`medium?id=${mediumCreatorsSeries.mediumId}&title=${mediumCreatorsSeries.title}`}>{mediumCreatorsSeries.title}</Link></b> ({mediumCreatorsSeries.year}) by <Link to={`creator?id=${mediumCreatorsSeries.creatorId}`}>{mediumCreatorsSeries.creatorName}</Link> </li>);
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

        if (similarTitle !== '') {
            return (
                <>
                    <br/><hr/><br/>
                    <div>
                        <h3>{similarTitle}</h3>
                        {
                            similar.filter(content => content !== undefined).map(content => {
                                return(<p><Link to={`./medium?id=${content.id}&title=${content.title}`}>{content.title}</Link>: {content.percentage}%</p>);
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

        if(loggedIn.id !== 0) {
            return (
                <div>
                    <b className="smallFont">Suggest: </b>
                    <select useRef="userInput"
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

        {
            return mediumsGenres.map(mediumGenre => {
                if ((mediumGenre.voted === 0 || loggedIn.id === 0) && userpickedGenresLength === 3) {
                    return (
                        <li>
                            <p><b>{mediumGenre.name }</b> | {mediumGenre.votes} {" "}</p>
                        </li>
                    )
                } else if (mediumGenre.voted === 1) {
                    return (
                        <li className="userVotedForThis">
                            <a onClick={() => voteMediumGenre(mediumGenre.id, 'mediumsGenres', 'userBooleanMediumsGenres', mediumGenre.votes, mediumGenre.genreId, '-')}><b>{mediumGenre.name }</b> | {mediumGenre.votes}</a> {" "}
                        </li>
                    )
                } else if (mediumGenre.voted === undefined || userpickedGenresLength < 3) {
                    return (
                        <li>
                            <a onClick={() => voteMediumGenre(mediumGenre.id, 'mediumsGenres', 'userBooleanMediumsGenres', mediumGenre.votes, mediumGenre.genreId, '+')}><b> {mediumGenre.name}</b> | {mediumGenre.votes}</a > {" "}
                        </li>
                    )
                }
            })
        }
    }

    const RenderMediumsSubgenre = () => {

        {
            return mediumsSubgenres.map(mediumGenre => {
                if ((mediumGenre.voted === 0 || loggedIn.id === 0) && userpickedGenresLength === 3) {
                    return (
                        <li>
                            <p><b>{mediumGenre.name }</b> | {mediumGenre.votes} {" "}</p>
                        </li>
                    )
                } else if (mediumGenre.voted === 1) {
                    return (
                        <li className="userVotedForThis">
                            <a onClick={() => voteMediumGenre(mediumGenre.id, 'mediumsSubgenres', 'userBooleanMediumsSubgenres', mediumGenre.votes, mediumGenre.subgenreId, '-')}><b>{mediumGenre.name}</b> | {mediumGenre.votes}</a> {" "}
                        </li>
                    )
                } else if (mediumGenre.voted === undefined || userpickedGenresLength < 3) {
                    return (
                        <li>
                            <a onClick={() => voteMediumGenre(mediumGenre.id, 'mediumsSubgenres', 'userBooleanMediumsSubgenres', mediumGenre.votes, mediumGenre.subgenreId, '+')}><b> {mediumGenre.name}</b> | {mediumGenre.votes}</a > {" "}
                        </li>
                    )
                }
            })
        }
    }


    const enlargePicture = (i) => {
        setPictureCount([pictureCount[0], pictureCount[1], 1, pictureCount[3], i])
    }

    const seePictures = () => {
        console.log(mediumsGenres)
        pictureCount[3] = (pictureCount[3] === 'more photos') ? 'collapse photos' : 'more photos';
        setPictureCount([pictureCount[1], pictureCount[0], 1, pictureCount[3], pictureCount[4]])
    }

    return (
        <div className="bodyContentStyling">
           <div className="individualStyling">
               <div className="row">
                        <div className="column-body">
                            <div className="row">
                                <div className="column-medium-1">
                                    <img src={`./images/medium/${id}/frontPageThumbnail.png`} width="150" />
                                </div>
                                <div className="column-medium-2">
                                    <h1><b>{mediumsDetails[0] ? <>{mediumsDetails[0].title}</>:null}</b></h1>
                                    {
                                        mediumsDetails.map(mediumsDetail => {
                                            return(
                                                <p className="smallFont">
                                                    {
                                                        mediumsDetail.regionId1 && regions.length >= 1 ? <>{`${regions[mediumsDetail.regionId1 - 1].acronym}`}</>:null
                                                    }
                                                    {
                                                        mediumsDetail.regionId2 && regions.length >= 1 ? <>{`/${regions[mediumsDetail.regionId2 - 1].acronym}`}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.regionId3 && regions.length >= 1 ? <>{`/${regions[mediumsDetail.regionId3 - 1].acronym}`}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.regionId4 && regions.length >= 1 ? <>{`/${regions[mediumsDetail.regionId4 - 1].acronym}`}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.regionId5 && regions.length >= 1 ? <>{`/${regions[mediumsDetail.regionId5 - 1].acronym}`}{" "}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId1 && platforms.length >= 1 ? <>{`${platforms[mediumsDetail.platformId1 - 1].name}`}</>:null
                                                    }
                                                    {
                                                        mediumsDetail.platformId2 && platforms.length >= 1 ? <>{`/${platforms[mediumsDetail.platformId2 - 1].name}`}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId3 && platforms.length >= 1 ? <>{`/${platforms[mediumsDetail.platformId3 - 1].name}`}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId4 && platforms.length >= 1 ? <>{`/${platforms[mediumsDetail.platformId4 - 1].name}`}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.platformId5 && platforms.length >= 1 ? <>{`/${platforms[mediumsDetail.platformId5 - 1].name}`}{" "}</> :null
                                                    }
                                                    {
                                                        mediumsDetail.year ? <> {
                                                            `(${months[mediumsDetail.month]} ${mediumsDetail.day}, ${mediumsDetail.year})`
                                                        } </> : null 
                                                    }
                                                </p>
                                            )
                                        })

                                    }
            
                                    <p className="smallFont">{mediumsDetails.shortDesc}</p>

                                    <br />

                                    <p className="smallFont">
                                        { extLinks.metacritic ? <a target="_blank" href={`https://www.metacritic.com/${extLinks.metacritic}`}>Metacritic</a> : null }{" "}
                                        { extLinks.imdb ? <a target="_blank" href={`https://www.imdb.com/title/${extLinks.imdb}`}>IMDB</a> : null }{" "}
                                        { extLinks.opencritic ? <a target="_blank" href={`https://www.opencritic.com/game/${extLinks.opencritic}`}>Opencritic</a> : null }{" "}
                                        { extLinks.rateyourmusic ? <a target="_blank" href={`https://rateyourmusic.com/artist/${extLinks.rateyourmusic}`}>RateYourMusic</a> : null }{" "}
                                        <a target="_blank" href={`https://www.amazon.com/s?k=${ extLinks.amazon ? extLinks.amazon : mediumsDetails[0] ? mediumsDetails[0].title : null }`}>Amazon</a>{" "}
                                        <a target="_blank" href={`https://www.ebay.com/sch/i.html?_nkw=${ extLinks.ebay ? extLinks.ebay : mediumsDetails[0] ? mediumsDetails[0].title : null }`}>eBay</a>{" "}
                                        { extLinks.goodreads ? <a target="_blank" href={`https://www.goodreads.com/book/show/${extLinks.goodreads}`}>Goodreads</a> : null }{" "}
                                        <a target="_blank" href={`https://www.youtube.com/results?search_query=${ extLinks.youtube ? extLinks.youtube : mediumsDetails[0] ? mediumsDetails[0].title : null }`}>YouTube</a>{" "}
                                        { extLinks.wiki ? <a target="_blank" href={`https://en.wikipedia.org/wiki/${extLinks.wiki}`}>Wikipedia</a> : null }{" "}
                                        { extLinks.howlongtobeat ? <a target="_blank" href={`https://howlongtobeat.com/game?id=${extLinks.howlongtobeat}`}>HowLongToBeat</a> : null }{" "}
                                        { extLinks.fandomPrefix ? <a target="_blank" href={`https://${extLinks.fandomPrefix}.fandom.com/wiki/${extLinks.fandomSuffix}`}>Fandom</a> : null }{" "}
                                    </p>
                            <br />

                            </div>
                            </div>

                            <div className="genreVoteBody">
                                <br />
                                <p className="smallFont">
                                    <b>{noGenresOrSubgenresNotification} for {mediumsDetails[0] ? <>{mediumsDetails[0].title}:</>:<>medium:</>}</b>
                                    </p> 
                                <ul className="listGenreStyling">
                                    <li className="genreCategory"><b>genres:</b></li>
                                    <RenderMediumsGenre />
                                </ul>
                                
                                
                                <ul className="listGenreStyling">
                                    <li className="genreCategory"><b>subgenres:</b></li>

                                    <RenderMediumsSubgenre />
                                </ul>

                                <br />

                                <RenderUserInputRecommendGenre />

                                <br />

                            
                                {
                                    pictureCount[4]?<div className="selectedImage"><div className="imageContainer"><a onClick={() => enlargePicture('')}><img src={`./images/medium/${id}/${pictureCount[4]}`} width="400" /></a><div className="imageContainerTopRight imageContainerTopClose"><b><a onClick={() => enlargePicture('')}><FontAwesomeIcon icon={faTimes}/></a></b></div></div></div>:null
                                }
                                


                                <ul className="imageGallery">
                                    { 
                                        [...Array(pictureCount[0])].map((e, i) => {
                                            return <li><a onClick={() => enlargePicture(`galleryPic_${i}.png`)}><img src={`./images/medium/${id}/galleryPic_${i}.png`} width="100" /></a>{' '}</li>
                                        })
                                    }
                                    {
                                        pictureCount[2] === 1 ? (
                                            <li>
                                                <div className="morePictures">
                                                    <a onClick={() => seePictures()} className="smallFont">{pictureCount[3]}</a>
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
                                    return (<li className="smallFont"><a href={`./genre?type=genre&id=${mediumGenre.genreId}`}>{mediumGenre.name}</a> {" "}</li>);
                                })
                            }
                            <br />
                            <p className="smallFont">Subgenres:</p>
                            <p className="smallFont">{noGenres}</p>
                            {
                                mediumsSubgenres.map(mediumSubgenre => {
                                    return (<li className="smallFont"><a href={`./genre?type=subgenre&id=${mediumSubgenre.subgenreId}`}>{mediumSubgenre.name }</a> {" "}</li>);
                                })
                            }
                        </div>
                
                </div>               
            </div>
        </div>
    );
}