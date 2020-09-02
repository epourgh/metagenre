import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Banner() {

  const {
    mediums,
    setMediums,
    showNavStyle,
    setShowNavStyle
  } = useContext(GlobalContext)
  const [searchValue, setSearchValue] = useState('');

  const changeNavStyling = () => {
    console.log(showNavStyle)
    if(showNavStyle=='navbar') {
      setShowNavStyle('navbarShow')
    } else {
      setShowNavStyle('navbar')
    }
  }

  const nameHandler = (e) => {
    e.preventDefault();

    let tempMedium = [];
    let i = 0;

    mediums.forEach(medium => {

      let row = {
        id: medium.id,
        tag: medium.tag,
        title: medium.title,
        active: 0
      }

      if (medium.tag.includes(searchValue) 
          && searchValue !== ''
          && i < 5) {
        row.active = 1;
        i++;
      } 

      tempMedium.push(row)
      console.log(tempMedium)
    })

    setMediums(tempMedium);

  }

  const RenderSearchResult = (medium) => {

    let num = Math.floor(Math.random() * 6);

    let med = medium.medium;
    
    return (
        <div className={`search-item-${num}`}>
          <hr className="hr-banner-styling" />
          <p>
            <Link to={`/medium?id=${med.id}&title=${med.title}`}><b>{med.title}</b></Link>{" "}
          </p>
        </div>
    )
  }

  return (
    <div className='headerBannerStyling'>
      <div className="row">
        <div className="column-header-1">
            <h1>
              <Link to="/" className="navbar-brand"><heavy>{"{o}"}</heavy> Metagenre</Link>
            </h1>
        </div>
        <div className="column-header-2">
          <hr className="banner-hr" />
          <div className="row">
            <div className="column-header-mobile">
              <a onClick={() => changeNavStyling()} >
                <FontAwesomeIcon className="navbar-hamburger" icon={faBars}/>
              </a>
            </div>
            < div className = "column-header-mobile" >
              <form onKeyUp={nameHandler} onSubmit={nameHandler}>
                <input
                  placeholder={"search by name"}
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value.toLocaleLowerCase())}
                  className="banner-search-input"
                  />
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        {
          mediums.filter(medium => medium.active == 1).map(medium => <RenderSearchResult medium={medium} />)
        }
      </div>


    </div>
  );
}