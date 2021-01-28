import React from 'react';
import Release from './release.component';

export default function Releases({releases}) {
    return (
        <div className="grid-container-3-cl">
            <div className = "individualStyling individualHomePageStyling grid-cell">
                <h1 className="jumbo-h1">Books</h1>
                <br/><hr className='inner-card-hr-mobile-display'/>
                <ul className="releases">
                    { releases.books.map(book => <Release id={book.id} mediumObject={book} />) }
                </ul>
            </div>
            <div className = "individualStyling individualHomePageStyling grid-cell">
                <h1 className="jumbo-h1">Films</h1>
                <br/><hr className='inner-card-hr-mobile-display'/>
                <ul className="releases">
                    { releases.films.map(film => <Release id={film.id} mediumObject={film} />) }
                </ul>
            </div>
            <div className = "individualStyling individualHomePageStyling grid-cell">
                <h1 className="jumbo-h1">Games</h1>
                <br/><hr className='inner-card-hr-mobile-display'/>
                <ul className="releases">
                    { releases.games.map(game => <Release id={game.id} mediumObject={game} />) }
                </ul>
            </div>
        </div>
    )
}