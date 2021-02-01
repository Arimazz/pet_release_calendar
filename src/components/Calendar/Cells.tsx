import React, { FC, useMemo } from 'react';
import Loading from '../Loading/Loading';
import {IDays} from './Calendar';
import * as dateFns from 'date-fns';
import { RAWG_DATE_FORMAT } from '../../constants/config';

interface IProps {
  rows: IDays[];
  onDateClick: (day: string) => void;
}

const Cells: FC<IProps> = ({rows, onDateClick}) => {

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
                  onClick={() => {              
                    onDateClick(dateFns.format(day, RAWG_DATE_FORMAT));
                  }}
                >
                  <span className="number">{formattedDate}</span>
                  {/* <span className="bg">{formattedDate}</span> */}
                  {isLoading && <Loading />}
                  {data && data.map((item: any) => (
                    <div key={item.name}>
                      <span className={`game-title ${item.added >= 5 && 'game-title-heavy'}`}>
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows])
  return render;
}

export default Cells;