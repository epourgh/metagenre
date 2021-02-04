import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext, DispatchContext } from '../context/GlobalState';
import Gallery from './home/gallery.component';
import About from './home/about.component';
import Relationships from './home/relationships.component';
import Releases from './home/releases/releases.component';
import { actionHome } from '../context/actions/index';

export default function RelationshipsIndex() {
    
    const { dispatchMiddleware, dispatch } = useContext(DispatchContext);
    const {backendUrl, reducers} = useContext(GlobalContext) || 'localhost:3000';
    const [frontPageMediums, setFrontPageMediums] = useState([]);
    const [mediumsReleases, setMediumsReleases] = useState({books: [], films: [], games: []});

    useEffect(() => {
        dispatchRequestsCallback();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        setFrontPageMediums((typeof reducers.home.frontPageMediums !== "undefined")?reducers.home.frontPageMediums:[]);
        setMediumsReleases((typeof reducers.home.mediumsReleases !== "undefined")?reducers.home.mediumsReleases:{books: [], films: [], games: []});
    }, [reducers]) // eslint-disable-line react-hooks/exhaustive-deps

    const dispatchRequestsCallback = () => {
        dispatchRequests.homeFront();
        dispatchRequests.releases();
    }

    const dispatchRequests = {
        homeFront: () => {
            dispatchMiddleware(dispatch)(actionHome.actionHomeFront({url: `${backendUrl}/mediumsFrontPage`}));
        },
        releases: () => {
            dispatchMiddleware(dispatch)(actionHome.actionHomeReleases({url: [`${backendUrl}/mediums/recent?mediumType=book`, `${backendUrl}/mediums/recent?mediumType=film`, `${backendUrl}/mediums/recent?mediumType=game`]}));
        }
    }

    return (
        <div className="bodyContentStyling styleCenter desktopBodyContentStyling">
            <Gallery frontPageMediums={frontPageMediums} mediumsReleases={mediumsReleases} /><br />
            <hr className='hr-mobile-display' />
            <div className="grid-container-2-cl desktop-home-custom-2-cl">
                <About />
                <hr className='hr-mobile-display' />
                <Relationships />
            </div>
            <Releases releases={mediumsReleases} />
        </div>
    );
}