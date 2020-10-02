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

    const FrontPageGallery = () => {
        return (
            <>
                <div className = "individualStyling individualHomePageStyling">
                    <h1>Curated Gallery</h1>
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
            </>
        )
    }

    const AboutMetagenre = () => {
        return (
            <div className = "individualStyling individualHomePageStyling">
                <h1>About Metagenre</h1>
                <br/><hr/>
                <div className="paragraph-crunch">
                    <img src={`./images/logo/nodes.svg`} width="100" className="paragraph-icon"/>
                    <p>Vote on the genres for your favorite entertainment mediums. Users can vote for either pre-existing genres or create genres of their own to vote on. Currently mediums can only be voted on through their pages, with the most popular being shown on the curated gallery of this page (right below) and within the medium category on the navbar (i.e., Games).</p> 
                </div>
            </div>
        )
    }

    const RenderRelationships = () => {
        return (
            <div className = "individualStyling individualHomePageStyling">
                
                <h1> Genre to Subgenre Relationships</h1>

                <br/><hr/>
                
                <div className="paragraph-crunch">
                    <p>Help tie genres and subgnenres together through the <Link to = "/relationships"> Relationship </Link> section. When a subgenre is associated with a genre, subgenre votes will be applied to the genre as well.</p>
                </div>
                <div className="tree">
                    <ul>
                        <li>
                            <b>
                                <p>MEDIUM</p>
                            </b>
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
                        </li>
                    </ul>
                </div>
                <br />
            </div>
        )
    }


    return (
        <div className="bodyContentStyling styleCenter">
            <AboutMetagenre /><br />
            <FrontPageGallery /><br />
            <RenderRelationships />
        </div>
    );
}