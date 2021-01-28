import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';

export default function Relationships() {
    const [tree, setTree] = useState('0');
    const [renderTreeRow, setRenderTreeRow] = useState(<></>);


    useEffect(() => {
        let genreTotal = (window.screen.width > 1000)?'30':'20';
        let renderRow = (window.screen.width > 1000)?<li><b><p>SUBGENRE</p><hr className="genre-line"/><p>votes: 10</p> </b></li>:<></>;
        setTree(genreTotal);
        setRenderTreeRow(renderRow);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
