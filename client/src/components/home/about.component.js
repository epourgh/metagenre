import React from 'react';  

export default function About() {
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