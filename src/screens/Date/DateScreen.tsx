import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/api';

import '../App/App.css';
import './styles.css';


const DateScreen = () => {
  const [games, setGames] = useState<any>([]);

  const {currentDate} = useParams<any>();

  useEffect(() => {
    getCurrentDateData(currentDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const getCurrentDateData = async (date: string) => {
    const res = await API.requestDayGames(date.slice(1));
    
    if (res !== 'ERROR') {
      setGames(res.data.results);
    }
  }

  const getGameDataById = async (id: number, slug: string) => {
    const res = await API.requestGameInfo(id);
    const res1 = await API.requestStoresInfo(slug);

    const {description_raw, stores} = res.data;

    const storesWithLinks = res1.data.results.map((item2: any) => {
      const findData = stores.find((item: any) => item.store.id === item2.store_id);

      if (findData) {
        return {
          ...findData,
          ...item2,
        }
      }
      return item2;
    })

    const newList = games.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          description: description_raw,
          stores: storesWithLinks,
          withDetails: true,
        }
      }
      return item;
    });
    setGames(newList);
  }

  const deleteExtraData = (id: number) => {
    const newList = games.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          description: null,
          stores: null,
          trailers: null,
          withDetails: false,
        }
      }
      return item;
    });
    setGames(newList);
  }

  return (
    <div className="App">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            Release <b>calendar</b>
          </span>
        </div>
      </header>
      <div className="calendar-wrap">
        <div className="heading-wrap">
          <h2 className="game-title-date">
            {currentDate.slice(1)}
          </h2>
        </div>
        <div className="games-list-wrap">
          {games.map(({
            name,
            id,
            background_image,
            added,
            genres,
            metacritic,
            stores,
            description,
            slug,
            trailers,
            storeLinks,
            withDetails,
          }: any) => (
            <div key={id}>
              <div className="game-item">
                {/* <button
                  className="button-load"
                  onClick={() => {
                    !withDetails ? getGameDataById(id, slug) : deleteExtraData(id);
                  }}
                >
                  {!withDetails ? 'Більше інформації': 'приховати інформацію'}
                </button> */}
                <img className="game-image" src={background_image} alt='gameimage' />
                <div className="game-info">
                  <p className="game-title">{name}</p>
                  <p className="game-extra-text">{`Зацікавилось: `}<span className="game-title">{added}</span></p>
                  {genres && (
                    <p>Жанри: {genres.map((item: any) => <span key={item.id}>{item.name} </span>)}</p>
                  )}
                  {metacritic && (
                    <p>Metacritic: {metacritic}</p>
                  )}
                  {stores && (
                    <p>Магазини: {stores.map((item: any) => {
                      if (item.name) {
                        return <span key={item.name}>{`${item?.name} `} </span>
                      } else {
                        return (
                          <a key={item.store.name} rel="noreferrer" target="_blank" href={item.url}>
                            {`${item.store.name} `}
                          </a>
                        )
                      }
                    })}</p>
                  )}
                  <button
                    className="button-load"
                    onClick={() => {
                      !withDetails ? getGameDataById(id, slug) : deleteExtraData(id);
                    }}
                  >
                    {!withDetails ? 'Більше інформації': 'приховати інформацію'}
                  </button>
                </div>
              </div>
              {description && (
                <>
                  <p>Опис</p>
                  <p>{description}</p>
                </>
              )}
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default DateScreen;
