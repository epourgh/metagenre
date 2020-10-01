import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function RelationshipsIndex() {
    
    const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [frontPageMediums, setFrontPageMediums] = useState([]);
    const [tree, setTree] = useState('0');

    useEffect(() => {
        getGenres();
    }, [])

    const getGenres = (stringParam) => {
        const container = {};
        fetch(`${backendUrl}/mediumsFrontPage`)
            .then(response => response.json())
            .then(response => {
                if (response.data.length > 0) {
                    response.data.forEach(frontPageMediumContent => {

                        let mediumsIdToString = frontPageMediumContent.id;

                        if (container[mediumsIdToString] === undefined) {
                            container[mediumsIdToString] = {
                                genres: [],
                            };
                            container[mediumsIdToString].id = frontPageMediumContent.id;
                            container[mediumsIdToString].title = frontPageMediumContent.title;
                            container[mediumsIdToString].mediumType = frontPageMediumContent.mediumType.toUpperCase();
                            container[mediumsIdToString].shortDesc = frontPageMediumContent.shortDesc;
                        }

                        let holder = {}
                        holder.mediumGenreId = frontPageMediumContent.mediumGenreId;
                        holder.name = frontPageMediumContent.name;
                        holder.votes = frontPageMediumContent.votes;
                        container[mediumsIdToString].genres.unshift(holder);
                    })

                    let container2 = [];

                    for (var key in container) {
                        console.log(container[key])
                        container2.push(container[key])
                    }
                    setFrontPageMediums(container2)
                }
            


            });

    }

    const RenderThirdTreeRow = () => {

        const genreTotal = (window.screen.width > 1000)?'30':'20';

        setTree(genreTotal);

        if (window.screen.width > 1000) {
            return (
                <li>
                    <b>
                        <p>SUBGENRE</p>
                        <hr className="genre-line"/>
                        <p>votes: 10</p>
                    </b>
                </li>
            )
        } else {
            return (
                <></>
            )
        }
    }


    return (
        <div className="bodyContentStyling styleCenter">
            < div className = "individualStyling individualHomePageStyling" >
                Help tie genres and subgnenres together through the <Link to="/relationships">Relationship</Link> section. When a subgenre is associated with a genre, subgenre votes will be applied to the genre as well.
                <div className="tree">
                    <ul>
                        <li>    
                            <b>
                                <p>GENRE</p>
                                <hr className="genre-line"/>
                                <p>votes: 20 (+{tree} subgenre votes)</p>
                            </b>
                            <ul>
                                <li>
                                    <b>
                                        <p>SUBGENRE</p>
                                        <hr className="genre-line"/>
                                        <p>votes: 10</p>
                                        
                                    </b>
                                </li>
                                <li>
                                    <b>
                                        <p>SUBGENRE</p>
                                        <hr className="genre-line"/>
                                        <p>votes: 10</p>
                                    </b>
                                </li>
                                <RenderThirdTreeRow />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="frontPageBodyContentStyling">
                {
                    frontPageMediums.map(frontPageMedium => {
                        return (                
                            <div className="gallery">
                                <div className="imageContainer">
                                    {/* target="_blank"  */}
                                    <a href={`/medium?id=${frontPageMedium.id}`}>
                                        <img src={`./images/medium/${frontPageMedium.id}/frontPageThumbnail.png`} />
                                    </a>
                                    <div className={`imageContainerTopLeft ${frontPageMedium.mediumType}ImageContainerTopLeft`}><b>{frontPageMedium.mediumType}</b></div>
                                </div>
                                <div className="desc">
                                    <h2><a href={`/medium?id=${frontPageMedium.id}`}>{frontPageMedium.title}</a></h2>
                                    <p>{frontPageMedium.shortDesc}</p>
                                    <br />
                                    <ul className="listGenreStyling">
                                        {
                                            frontPageMedium.genres.map(genre => {
                                            return (<li><p><b>{genre.name}</b> | {genre.votes}</p>{" "}</li>)
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}