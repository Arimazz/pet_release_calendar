import React, { FC, useEffect, useState } from "react";
import * as dateFns from "date-fns";
import { uk } from 'date-fns/locale';
import API from '../../api/api';
import { bindActionCreators, Dispatch } from "redux";
import { gamesDataSelector } from "../../selectors";
import { connect } from "react-redux";
import {recordData} from '../../store/initStore';
import Header from "./Header";
import Cells from "./Cells";
import { RAWG_DATE_FORMAT } from "../../constants/config";
import usePrevious from "../../hooks/usePrev";
import { useHistory } from "react-router-dom";

interface IProps {
  recordData: any;
  gamesData: any;
}

 export interface IDay {
  day: Date;
  formattedDate: string;
  isDisabled: boolean;
  data: any;
  isLoading: boolean;
}

export type IDays = IDay[];

const Calendar: FC<IProps> = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentLocale] = useState<Locale>(uk);
  const [days, setDays] = useState<any>([]);
  const [rows, setRows] = useState<IDays[]>([]);
  const [isStartLoading, setIsStartLoading] = useState<boolean>(false);
  const [isFreezing, setIsFreezing] = useState<boolean>(false);
  const history = useHistory();

  const previousMonth = usePrevious(currentMonth);


  useEffect(() => {
    fillDays();
    fillRows();  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isStartLoading && rows.length > 0) {
      getMonthData()
    }
    
    if (currentMonth !== previousMonth) {
      fillDays();
      fillRows();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, rows])

  const fillDays = () => {
    const dateFormat = "iiii";
    const currentDays = [];
  
    let startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      currentDays.push(
        dateFns.format(dateFns.addDays(startDate, i), dateFormat, {locale: currentLocale})
      );
    }

    setDays(currentDays);
  }

  const renderDays = () => {

    return (
    <div className="days row">
      {days.length > 0 && days.map((item: any) => (
        <div className="col col-center" key={String(item)}>
          {item}
        </div>
      ))}
    </div>
    );
  }

  const fillRows = () => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push({
          day: cloneDay,
          formattedDate,
          isDisabled: !dateFns.isSameMonth(day, monthStart),
          data: null,
          isLoading: dateFns.isSameMonth(day, monthStart),
        });
        day = dateFns.addDays(day, 1);
      }
      rows.push(days);
      days = [];
    }
    setRows(rows)
  };

  const getMonthData = async () => {
    setIsStartLoading(true);
    setIsFreezing(true);
    
    const res = await API.requestMonthGames(currentMonth);
    
    if (res === 'ERROR') {
      setIsFreezing(false);
      return new Error('LOADING FAILED')
    }

    for (let findex = 0; findex < rows.length; findex++) {
      const days = rows[findex];
      for (let sindex = 0; sindex < days.length; sindex++) {
        const currentDay = {...days[sindex]};
        if (!currentDay.isDisabled) {
            currentDay.isLoading = false;
            currentDay.data = res.filter((item: any) => (
                dateFns.format(currentDay.day, RAWG_DATE_FORMAT) === item.released
              )).slice(0,5);

            const tempRows = [...rows];
            tempRows[findex][sindex] = currentDay;
            setRows(tempRows);
        }
      }
    }
    setIsFreezing(false);
  }

  const onDateClick = (day: string) => {
    history.push(`/day/:${day}`);
  };

  const nextMonth = () => {
    if (!isFreezing) {
      setCurrentMonth(dateFns.addMonths(currentMonth, 1));
      setRows([]);
      setIsStartLoading(false);
      setIsFreezing(false);
    }
  };

  const prevMonth = () => {
    if (!isFreezing) {
      setCurrentMonth(dateFns.subMonths(currentMonth, 1));
      setRows([]);
      setIsStartLoading(false);
      setIsFreezing(false);
    }
  };



  // test = async () => {
    // const {currentMonth} = this.state;
    // const res = await API.requestMonthGames(currentMonth);
    // console.log(res);
    // this.getMonthData()
  // }

    return (
      <div className="calendar">
        {/* <button
          style={{height: '20px'}}
          onClick={this.test}
        >
          <span>TEST</span>
        </button> */}
        <Header
          currentLocale={currentLocale}
          currentMonth={currentMonth}
          nextMonthCallback={nextMonth}
          prevMonthCallback={prevMonth}
        />
        {renderDays()}
        <Cells rows={rows} onDateClick={onDateClick} />
      </div>
    );
}

const mapStateToProps = (state: any) => ({
  gamesData: gamesDataSelector(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  recordData,
}, dispatch)


// const connected = withRouter(<Calendar />);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)