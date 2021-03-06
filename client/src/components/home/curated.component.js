import React from 'react';

export default function Curated({frontPageMediums, clickedLink}) {
    return (
        <ul>
            {
                frontPageMediums.map(frontPageMedium => {
                    return(
                        <li className="item gallery" key={frontPageMedium.id}>
                            <div className="imageContainer">
                                {/* target="_blank"  */}
                                <a href={`/medium?id=${frontPageMedium.id}`} onMouseDown={(e) => clickedLink(e, frontPageMedium.id)}>
                                    <img src={`./images/medium/${frontPageMedium.id}/frontPageThumbnail.png`} alt="front page thumbnail" />
                                </a>
                                <div className={`imageContainerTopLeft ${frontPageMedium.mediumType}ImageContainerTopLeft`}><b>{frontPageMedium.mediumType}</b></div>
                            </div>
                            <br />
                            <h2 className="front-link" onMouseDown={(e) => clickedLink(e, frontPageMedium.id)}>
                                {frontPageMedium.title}
                            </h2>
                            <br />
                            <ul className="listGenreStyling">
                                {
                                    frontPageMedium.genres.map(genre => {
                                    return (<li key={genre.mediumGenreId}><p><b>{genre.name}</b> | {genre.votes}</p>{" "}</li>)
                                    })
                                }
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )
} 