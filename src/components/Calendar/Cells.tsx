import React, { FC, useMemo } from 'react';
import Loading from '../Loading/Loading';
import {IDays} from './Calendar';

interface IProps {
  rows: IDays[];
}

const Cells: FC<IProps> = ({rows}) => {

  const render = useMemo(() => {
    if (rows.length > 0) {
      return (
        <div className="body">
          {rows.map((row, index) => (
            <div className="row" key={index}>
              {row.map(({isDisabled, day, formattedDate, data, isLoading}) => (
                <div
                  className={`col cell ${
                    isDisabled
                      ? "disabled"
                      : ""
                  }`}
                  key={String(day)}
                  onClick={async () => {              
                    // this.getDayData(dateFns.format(day, RAWG_DATE_FORMAT));
                    // const res = await API.requestDayGames(day);
                    // console.log(res);
                    
                  }}
                >
                  <span className="number">{formattedDate}</span>
                  <span className="bg">{formattedDate}</span>
                  {isLoading && <Loading />}
                  {data && data.map((item: any) => (
                    <div key={item.name}>
                      <span className={`game-title ${item.isInteresting && 'game-title-heavy'}`}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }
    return <Loading />
  }, [rows])
  return render;
}

export default Cells;