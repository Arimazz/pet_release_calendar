import axios from 'axios';
import {API_KEY, RAWG_DATE_FORMAT} from '../constants/config';
import * as dateFns from 'date-fns';
class API {
  async requestDayGames(day: Date) {
    const validDate = dateFns.format(day, RAWG_DATE_FORMAT);

    try {
      const result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
      },
      params: {
        platforms: '4',
        dates: `${validDate},${validDate}`,
        ordering: '-added',
      },
      timeout: 3000,
    });
    return result;
    } catch (error) {
      console.log('ERROR', error);
      
      return 'ERROR'
    }
  }

  async test() {
    const result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        platforms: '4',
        dates: `2020-12-10,2020-12-10`,
        // ordering: '-released',
        ordering: '-added',
      }
    });
    return result;
  }
}

export default new API();