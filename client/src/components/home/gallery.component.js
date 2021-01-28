import React, { useState, useEffect } from 'react';  
import Curated from './curated.component';

export default function Gallery({frontPageMediums, mediumsReleases}) { 

    const [curatedGalleryClass, setCuratedGalleryClass] = useState('items');
    const [isDown, setIsDown] = useState('items');
    const [scrollLeft, setScrollLeft] = useState(0);
    const [startX, setStartX] = useState(0);
    const [snapshot, setSnapshot] = useState(1000);

    useEffect(() => {
        document.getElementById('items').scrollLeft = snapshot || 0;
        console.log(mediumsReleases)
    }) // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <>

            <main className="main">
                <div className={curatedGalleryClass} id="items"
                    onMouseDown={(e) => mouseDownFunction(e)} 
                    onMouseLeave={(e) => mouseLeaveFunction(e)} 
                    onMouseUp={(e) => mouseUpFunction(e)}
                    onMouseMove={(e) => mouseMoveFunction(e)}>
                    <Curated frontPageMediums={frontPageMediums} clickedLink={clickedLink} />
                </div>
            </main>
        </>
    )

}