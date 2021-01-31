import axios from 'axios';
import {API_KEY, RAWG_DATE_FORMAT} from '../constants/config';
import * as dateFns from 'date-fns';
class API {
  async requestMonthGames (day: Date) {
    const monthStart = dateFns.format(dateFns.startOfMonth(day), RAWG_DATE_FORMAT);
    const monthEnd = dateFns.format(dateFns.endOfMonth(day), RAWG_DATE_FORMAT);

    const makeRequestWithPage = (page: number) => {
      return axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          platforms: '4',
          dates: `${monthStart},${monthEnd}`,
          ordering: '-added',
          page_size: 40, // max page size
          page,
        },
        timeout: 3000,
      });
    }
    
    try {
      let data: any = [];

      const loadResultToData = (res: any) =>  {
        data = [...data, ...res.data.results];
      }

      const res1 = await makeRequestWithPage(1);
      loadResultToData(res1);
      const count = res1.data.count;
      if (count >= 80) {
        const res2 = await makeRequestWithPage(2);
        loadResultToData(res2);
      }
      if (count >= 120) {
        const res3 = await makeRequestWithPage(3);
        loadResultToData(res3);
      }

      return data;
    } catch (error) {
      return 'ERROR'
    }
  }

  async requestDayGames(day: string) {
    try {
      const result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          platforms: '4',
          dates: `${day},${day}`,
          ordering: '-added',
          page_size: 40,
        },
        timeout: 3000,
      });
    return result;
    } catch (error) {
      // console.log('ERROR', error);
      
      return 'ERROR'
    }
  }

  async requestStoresInfo (slug: string) {
    const result = await axios.get(`https://api.rawg.io/api/games/${slug}/stores?key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  }

  async requestGameInfo (id: number) {
    const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  }

  async requestGameTrailers (id: number) {
    const result = await axios.get(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  }

  // async test() {
  //   const result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     params: {
  //       platforms: '4',
  //       dates: `2020-12-10,2020-12-10`,
  //       // ordering: '-released',
  //       ordering: '-added',
  //     }
  //   });
  //   return result;
  // }
}

export default new API();