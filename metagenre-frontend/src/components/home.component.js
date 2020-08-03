import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function RelationshipsIndex() {
    
    const {backendUrl, loggedIn, setLoggedIn} = useContext(GlobalContext)
    const [frontPageMediums, setFrontPageMediums] = useState([]);

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


    return (
        <div className="bodyContentStyling frontPageBodyContentStyling">
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
    );
}