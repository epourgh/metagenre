import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {

  const [mediums, setMediums] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getMediums();
  }, [])

  const getMediums = () => {
    fetch(`/api/mediumsForSearch`)
      .then(response => response.json())
      .then(response => {
        console.log('fetching mediums')
        console.log(response.data);
        setMediums(response.data.map(medium => {
          return {
            id: medium.id,
            tag: medium.title.toLowerCase(),
            title: medium.title,
            active: 0
          };
        }))
      });
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
              <Link to="/" className="navbar-brand">{"{o}"} Metagenre</Link>
            </h1>
        </div>
        <div className="column-header-2">
          <form onKeyUp={nameHandler} onSubmit={nameHandler}>
            <input
              placeholder={"search by name"}
              value={searchValue}
              onChange={e => setSearchValue(e.target.value.toLocaleLowerCase())}
              />
          </form>
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