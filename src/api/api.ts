import axios from 'axios';
import {API_KEY, RAWG_DATE_FORMAT} from '../constants/config';
import * as dateFns from "date-fns";
class API {
  async requestMonthGames(month: Date) {
    // const monthStart = dateFns.format(dateFns.startOfMonth(month), RAWG_DATE_FORMAT);
    // const monthEnd = dateFns.format(dateFns.endOfMonth(month), RAWG_DATE_FORMAT);
    // console.log('start', monthStart);
    // console.log('end', monthEnd);
    

    // const result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   params: {
    //     platforms: '4',
    //     dates: '2020-12-10,2020-12-10',
    //     // ordering: '-released',
    //     ordering: '-added',
    //   }
    // });
    // return result;
  }

  async test() {
    const result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        platforms: '4',
        dates: '2020-12-10,2020-12-10',
        // ordering: '-released',
        ordering: '-added',
      }
    });
    return result;
  }
}

export default new API();