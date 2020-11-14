import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export default function RelationshipsIndex() {
    
    const {backendUrl} = useContext(GlobalContext)
    const [frontPageMediums, setFrontPageMediums] = useState([]);
    const [tree, setTree] = useState('0');
    const [curatedGalleryClass, setCuratedGalleryClass] = useState('items');
    const [isDown, setIsDown] = useState('items');
    const [scrollLeft, setScrollLeft] = useState(0);
    const [startX, setStartX] = useState(0);
    const [snapshot, setSnapshot] = useState(1000);
    const [renderTreeRow, setRenderTreeRow] = useState(<></>);


    useEffect(() => {
        getGenres();
        let genreTotal = (window.screen.width > 1000)?'30':'20';
        let renderRow = (window.screen.width > 1000)?<li><b><p>SUBGENRE</p><hr className="genre-line"/><p>votes: 10</p> </b></li>:<></>;
        setTree(genreTotal);
        setRenderTreeRow(renderRow);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        document.getElementById('items').scrollLeft = (snapshot === null )?0:snapshot;
    }) // eslint-disable-line react-hooks/exhaustive-deps

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
                        container2.push(container[key])
                    }
                    setFrontPageMediums(container2)
                }
            


            });

    }
    /*
    const FrontPageGalleryGrid = () => {
        return (
            <>
                <div className = "individualStyling individualHomePageStyling grid-cell">
                    <h1>Curated Gallery</h1>
                </div>                
                <div className="frontPageBodyContentStyling">
                    {
                        frontPageMediums.map(frontPageMedium => {
                            return (                
                                <div className="gallery">
                                    <div className="imageContainer">
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
                                                return (<li key={genre.name}><p><b>{genre.name}</b> | {genre.votes}</p>{" "}</li>)
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
    }*/

    const clickedLink = (e, id) => {
        e.stopPropagation()
        window.location = `/medium?id=${id}`;
    }


    const mouseDownFunction = (e) => {
        e.preventDefault();
        setIsDown(true);
        setCuratedGalleryClass('items active')
        setStartX(e.pageX - document.getElementById('items').offsetLeft);
        setScrollLeft(document.getElementById('items').scrollLeft)
    }
    
    const mouseLeaveFunction = (e) => {
        e.preventDefault();
        setIsDown(false);
        setCuratedGalleryClass('items active')
    }
    
    const mouseUpFunction = (e) => {
        e.preventDefault();
        setIsDown(false)
        setCuratedGalleryClass('items')
        setSnapshot(document.getElementById('items').scrollLeft);
        document.getElementById('items').pageXOffset = document.getElementById('items').scrollLeft;
    }

    const mouseMoveFunction = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const slider = document.getElementById('items');
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        const location = scrollLeft - walk;
        slider.scrollLeft = location;
        
    }

    const FrontPageGalleryScroll = () => { 
        
        return (
            <>
                <div className = "individualStyling individualHomePageStyling">
                    <h1>Curated Gallery</h1>
                </div>           
                <main className="main">
                    <div className={curatedGalleryClass} id="items"
                        onMouseDown={(e) => mouseDownFunction(e)} 
                        onMouseLeave={(e) => mouseLeaveFunction(e)} 
                        onMouseUp={(e) => mouseUpFunction(e)}
                        onMouseMove={(e) => mouseMoveFunction(e)}>
                        {
                            frontPageMediums.map(frontPageMedium => {
                                return(
                                    <div className="item gallery" key={frontPageMedium.id}>
                                        <div className="imageContainer">
                                            {/* target="_blank"  */}
                                            <a href={`/medium?id=${frontPageMedium.id}`}>
                                                <img src={`./images/medium/${frontPageMedium.id}/frontPageThumbnail.png`} alt="front page thumbnail" />
                                            </a>
                                            <div className={`imageContainerTopLeft ${frontPageMedium.mediumType}ImageContainerTopLeft`}><b>{frontPageMedium.mediumType}</b></div>
                                        </div>
                                        <h2 className="front-link" onMouseDown={(e) => clickedLink(e, frontPageMedium.id)}>
                                            {frontPageMedium.title}
                                        </h2>
                                        <p>{frontPageMedium.shortDesc}</p>
                                        <br />
                                        <ul className="listGenreStyling">
                                            {
                                                frontPageMedium.genres.map(genre => {
                                                return (<li key={genre.mediumGenreId}><p><b>{genre.name}</b> | {genre.votes}</p>{" "}</li>)
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </main>
            </>
        )

    }

    const AboutMetagenre = () => {
        return (
            <div className = "individualStyling individualHomePageStyling grid-cell">
                <h1>About Metagenre</h1>
                <br/><hr/>
                <div className="paragraph-crunch">
                    <img src={`./images/logo/nodes.svg`} width="100" className="paragraph-icon" alt="metagenre symbolism"/>
                    <p>Vote on the genres for your favorite entertainment mediums. Users can vote for either pre-existing genres or create genres of their own to vote on. Currently mediums can only be voted on through their pages, with the most popular being shown on the curated gallery of this page (right below) and within the medium category on the navbar (i.e., Games).</p> 
                </div>
            </div>
        )
    }

    const RenderRelationships = () => {
        return (
            <div className = "individualStyling individualHomePageStyling grid-cell">
                
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
                                        {renderTreeRow}
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
            <FrontPageGalleryScroll /><br />
            {/* <FrontPageGalleryGrid /><br /> */}
            <div className="grid-container">
                <AboutMetagenre />
                <RenderRelationships />
            </div>
        </div>
    );
}