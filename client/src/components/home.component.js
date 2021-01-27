import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import FrontPageMediumsDisplay from './frontPageMediums.component';
import RenderMediumReleaseTitle from './renderMediumReleaseTitle.component';

export default function RelationshipsIndex() {
    
    const {backendUrl} = useContext(GlobalContext) || 'localhost:3000';
    const [frontPageMediums, setFrontPageMediums] = useState([]);
    const [tree, setTree] = useState('0');
    const [curatedGalleryClass, setCuratedGalleryClass] = useState('items');
    const [isDown, setIsDown] = useState('items');
    const [scrollLeft, setScrollLeft] = useState(0);
    const [startX, setStartX] = useState(0);
    const [snapshot, setSnapshot] = useState(1000);
    const [renderTreeRow, setRenderTreeRow] = useState(<></>);
    const [mediumsReleases, setMediumsReleases] = useState({books: [], films: [], games: []});


    useEffect(() => {
        getFrontPageMediums();
        getMediumsByTypeAndRelease();
        let genreTotal = (window.screen.width > 1000)?'30':'20';
        let renderRow = (window.screen.width > 1000)?<li><b><p>SUBGENRE</p><hr className="genre-line"/><p>votes: 10</p> </b></li>:<></>;
        setTree(genreTotal);
        setRenderTreeRow(renderRow);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        document.getElementById('items').scrollLeft = snapshot || 0;
        console.log(mediumsReleases)
    }) // eslint-disable-line react-hooks/exhaustive-deps

    const getMediumsByTypeAndRelease = () => {

        Promise.all([
            fetch(`${backendUrl}/mediums/recent?mediumType=book`),
            fetch(`${backendUrl}/mediums/recent?mediumType=film`),
            fetch(`${backendUrl}/mediums/recent?mediumType=game`)
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([data1, data2, data3]) => {
            setMediumsReleases({
                books: data1.data, 
                films: data2.data, 
                games: data3.data
            })
        });
    
    }

    const getFrontPageMediums = (stringParam) => {
        const container = {};
        fetch(`${backendUrl}/mediumsFrontPage`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
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
                        container[mediumsIdToString].genres.push(holder);
                    })

                    let container2 = [];

                    for (var key in container) {
                        container2.push(container[key])
                    }
                    setFrontPageMediums(container2)
                }
            


            });

    }

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

                <main className="main">
                    <div className={curatedGalleryClass} id="items"
                        onMouseDown={(e) => mouseDownFunction(e)} 
                        onMouseLeave={(e) => mouseLeaveFunction(e)} 
                        onMouseUp={(e) => mouseUpFunction(e)}
                        onMouseMove={(e) => mouseMoveFunction(e)}>
                        <FrontPageMediumsDisplay frontPageMediums={frontPageMediums} clickedLink={clickedLink} />
                    </div>
                </main>
            </>
        )

    }

    const AboutMetagenre = () => {
        return (
            <div className = "individualStyling individualHomePageStyling grid-cell">
                <h1>About Metagenre</h1>
                <br/><hr className='inner-card-hr-mobile-display'/>
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

                <br/><hr className='inner-card-hr-mobile-display'/>
                
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

    const MediumsReleases = () => {
        return (
            <div className="grid-container-3-cl">
                <div className = "individualStyling individualHomePageStyling grid-cell">
                    <h1 className="jumbo-h1">Books</h1>
                    <br/><hr className='inner-card-hr-mobile-display'/>
                    <ul className="releases">
                        { mediumsReleases.books.map(book => <RenderMediumReleaseTitle id={book.id} mediumObject={book} />) }
                    </ul>
                </div>
                <div className = "individualStyling individualHomePageStyling grid-cell">
                    <h1 className="jumbo-h1">Films</h1>
                    <br/><hr className='inner-card-hr-mobile-display'/>
                    <ul className="releases">
                        { mediumsReleases.films.map(film => <RenderMediumReleaseTitle id={film.id} mediumObject={film} />) }
                    </ul>
                </div>
                <div className = "individualStyling individualHomePageStyling grid-cell">
                    <h1 className="jumbo-h1">Games</h1>
                    <br/><hr className='inner-card-hr-mobile-display'/>
                    <ul className="releases">
                        { mediumsReleases.games.map(game => <RenderMediumReleaseTitle id={game.id} mediumObject={game} />) }
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className="bodyContentStyling styleCenter">
            <FrontPageGalleryScroll /><br />
            <hr className='hr-mobile-display' />
            <div className="grid-container-2-cl">
                <AboutMetagenre />
                <hr className='hr-mobile-display' />
                <RenderRelationships />
            </div>
            <MediumsReleases />
        </div>
    );
}