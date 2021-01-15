import React, { useState, useContext } from 'react';
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
  const [greyBGBoolean, setGreyBGBoolean] = useState('')
  const [activeSearchRows, setActiveSearchRows] = useState(0)
  

  const changeNavStyling = (argu) => {
    if (searchValue !== '' && argu === 'hamburger') {
      setSearchValue('')
      nameHandler('remove');
      setShowNavStyle('navbarShow')
    } else if(searchValue !== '') {
      setSearchValue('')
      nameHandler('remove');
      setShowNavStyle('navbar')
    } else if(showNavStyle === 'navbar') {
      setShowNavStyle('navbarShow')
    } else {
      setShowNavStyle('navbar')
    }
  }

  const nameHandler = (searchArg) => {

    
    let searchTerm = (searchArg === 'remove') ? '' : searchValue;

    let tempMedium = [];
    let i = 0;

    mediums.forEach(medium => {

      let row = {
        id: medium.id,
        tag: medium.tag,
        title: medium.title,
        active: 0
      }

      if (medium.tag.includes(searchTerm) 
          && searchTerm !== ''
          && i < 5) {
        row.active = 1;
        i++;
      } 

      tempMedium.push(row)
    })

    setActiveSearchRows(i)

    if (i >= 1) {
      setGreyBGBoolean('greyBackrgound');
      setShowNavStyle('navbar')
    } else {
      setGreyBGBoolean('');
    }

    setMediums(tempMedium);

  }

  const RenderSearchResult = (medium) => {

    let num = Math.floor(Math.random() * 6);

    let med = medium.medium;
    
    return ( 
        <li className={`navbar-item search-item search-item-${num}`}>
          <Link to={`/medium?id=${med.id}&title=${med.title}`}><b>{med.title}</b></Link>{" "}
        </li>

    )
  }

    const GreyBackdrop = () => {
        if (greyBGBoolean === 'greyBackrgound' || showNavStyle === 'navbarShow') {
            return (
              <span className="below">
                <div className='grey' onClick={() => changeNavStyling('grey')}></div>
              </span>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

  return (
    <div className='headerBannerStyling'>
      <div className="row">
        <div className="column-header-1">
            <h1>
              <Link to="/" className="navbar-brand">
                 _Metagenre
                </Link>
            </h1>
        </div>
        <div className="column-header-2">
          <hr className="banner-hr" />
          <div className="row">
            <div className="column-header-mobile">
              <span onClick={() => changeNavStyling('hamburger')}>
                <FontAwesomeIcon className="navbar-hamburger" icon={faBars}/>
              </span>
            </div>
            <div className = "column-header-mobile">
              <form onKeyUp={e => nameHandler('search')} onSubmit={nameHandler}>
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
      
      <nav className={`row`}>
        <ul className={`column ${(activeSearchRows !== 0 || searchValue !== '')?'search-container':''}`}>
          {
            mediums.filter(medium => medium.active === 1).map(medium => <RenderSearchResult medium={medium} />)
          }
          <li className={`${(activeSearchRows === 0 && searchValue !== '')?'nav-item':''}`}>
            <p className="font-on-dark-bg">{
              `${(activeSearchRows === 0 && searchValue !== '')?'no results':''}`
            }</p>
          </li>
        </ul>
      </nav>
      
      <GreyBackdrop />
    </div>
  );
}