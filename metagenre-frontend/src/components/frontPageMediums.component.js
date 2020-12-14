import React from 'react';

export default function FrontPageMediumsDisplay({frontPageMediums, clickedLink}) {
    return (
        <div>
            {
                frontPageMediums.map(frontPageMedium => {
                    return(
                        <div className="item gallery" key={frontPageMedium.id}>
                            <div className="imageContainer">
                                {/* target="_blank"  */}
                                <a href={`/medium?id=${frontPageMedium.id}`} onMouseDown={(e) => clickedLink(e, frontPageMedium.id)}>
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
    )
} 