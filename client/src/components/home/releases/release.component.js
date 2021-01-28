import React from 'react';
import { Link } from 'react-router-dom';

export default function Release({id, mediumObject}) {

    if (typeof mediumObject === "undefined") {
        return <></>;
    }

    function shortenTitle(mediumObjectTitle) {
        if (mediumObjectTitle.length > 30) {
            mediumObjectTitle = mediumObjectTitle.split('').splice(0, 30).join('');
            return `${mediumObjectTitle}...`
        } 

        return mediumObjectTitle;
    }

    let mediumObjTitle = shortenTitle(mediumObject.title);

    return (
        <li key={id}>
            <div className="grid-releases-container-2-cl">
                <div className="grid-cell">
                    <p>{`${mediumObject.month}/${mediumObject.day}/${mediumObject.year}`}</p>
                </div>
                <div className="grid-cell">
                    <b><Link to={`medium?id=${id}`}>{mediumObjTitle}</Link></b>
                </div>
            </div>
            <hr className="greyLine"/>
        </li>
    )

}