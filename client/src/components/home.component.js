import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Gallery from './home/gallery.component';
import About from './home/about.component';
import Relationships from './home/relationships.component';
import Releases from './home/releases/releases.component';

export default function RelationshipsIndex() {
    
    const {backendUrl} = useContext(GlobalContext) || 'localhost:3000';
    const [frontPageMediums, setFrontPageMediums] = useState([]);
    const [mediumsReleases, setMediumsReleases] = useState({books: [], films: [], games: []});


    useEffect(() => {
        getFrontPageMediums();
        getMediumsByTypeAndRelease();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <div className="bodyContentStyling styleCenter">
            <Gallery frontPageMediums={frontPageMediums} mediumsReleases={mediumsReleases} /><br />
            <hr className='hr-mobile-display' />
            <div className="grid-container-2-cl">
                <About />
                <hr className='hr-mobile-display' />
                <Relationships />
            </div>
            <Releases releases={mediumsReleases} />
        </div>
    );
}