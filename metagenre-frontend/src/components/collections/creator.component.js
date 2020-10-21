import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

function getWindowParam() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const id = url.searchParams.get("id").toString();
    const windowsParams = [id];
    
    return windowsParams;
}

export default function Series() {
    
    const {backendUrl} = useContext(GlobalContext)
    const [id] = getWindowParam();
    const [mediumsCreatorsSeries, setMediumsCreatorsSeries] = useState([]);
    console.log(id)

    useEffect(() => {
        getCreatorsSeries()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getCreatorsSeries = () => {
        fetch(`${backendUrl}/creators/${id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response.data.length)
            if (response.data.length > 0) {
                setMediumsCreatorsSeries(response.data)
            }
        });
    }

    
    const RenderCreator = () => {
        
        if (mediumsCreatorsSeries.length > 1) {
            return (
                <div>
                    <h3>Content by <Link to={`series?id=${mediumsCreatorsSeries[0].seriesId}`}>{mediumsCreatorsSeries[0].creatorName}</Link>:</h3>
                    <br />
                    <ul>
                        {
                            mediumsCreatorsSeries.map(mediumCreatorsSeries => {
                                return(<li key={mediumCreatorsSeries.mediumId}><b><Link to={`./medium?id=${mediumCreatorsSeries.mediumId}&title=${mediumCreatorsSeries.title}`}>{mediumCreatorsSeries.title}</Link></b> ({mediumCreatorsSeries.year}) by <Link to={`creator?id=${mediumCreatorsSeries.creatorId}`}>{mediumCreatorsSeries.creatorName}</Link> </li>);
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (<p>Nothing</p>)
        }
    }


    return (
        <div className="bodyContentStyling">
           <div className="individualMediumStyling">
                
                <RenderCreator />

            </div>
        </div>
    );
}