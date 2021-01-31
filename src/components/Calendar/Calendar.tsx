import React from "react";
import * as dateFns from "date-fns";
import { uk } from 'date-fns/locale';
import API from '../../api/api';
import { bindActionCreators, Dispatch } from "redux";
import { gamesDataSelector } from "../../selectors";
import { connect } from "react-redux";
import {recordData} from '../../store/initStore';
import Header from "./Header";
import Cells from "./Cells";

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
interface IState {
  currentMonth: Date,
  selectedDate: Date,
  currentLocale: Locale,
  days: any,
  rows: IDays[],
  arr: boolean[],
  isStartLoading: boolean;
  isFreezing: boolean;
}
class Calendar extends React.Component<IProps, IState> {
  state: IState = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    currentLocale: uk,
    days: [],
    rows: [],
    arr: [false, false, false, false, false],
    isStartLoading: false,
    isFreezing: false,
  };

  componentDidMount() {
    this.fillDays();
    this.fillRows();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {currentMonth, rows, isStartLoading} = this.state;
    
    if (!isStartLoading && rows.length > 0) {
      // this.getMonthData();
      this.getMonthData();
    }
    
    if (currentMonth !== prevState.currentMonth) {
      this.fillDays();
      this.fillRows();
    }
  }

  fillDays = () => {
    const {currentLocale} = this.state;
    const dateFormat = "iiii";
    const currentDays = [];
  
    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      currentDays.push(
        dateFns.format(dateFns.addDays(startDate, i), dateFormat, {locale: currentLocale})
      );
    }

    this.setState({days: currentDays});
  }

  renderDays() {
    const {days} = this.state;

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

  fillRows = () => {
    const { currentMonth } = this.state;
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
    this.setState({rows});
  };

  getMonthData = async () => {
    const {rows} = this.state;
    this.setState({isStartLoading: true, isFreezing: true});

    for (let findex = 0; findex < rows.length; findex++) {
      const days = rows[findex];
      for (let sindex = 0; sindex < days.length; sindex++) {
        const currentDay = {...days[sindex]};
        if (!currentDay.isDisabled) {
            const gameData = await API.requestDayGames(currentDay.day);
            if (gameData !== 'ERROR') {
              currentDay.isLoading = false;
              currentDay.data = gameData?.data.results.slice(0,5).map((item: any) => (
                {name: item.name, isInteresting: item.added > 5})
              );
              const tempRows = [...rows];
              tempRows[findex][sindex] = currentDay;
              this.setState({rows: tempRows});
  
            } else {
              currentDay.isLoading = false;
              currentDay.data = [{name: 'ERROR', isInteresting: true}];
              const tempRows = [...rows];
              tempRows[findex][sindex] = currentDay;
              this.setState({rows: tempRows});
            }
        }
      }
    }
    this.setState({isFreezing: false})
  }

  onDateClick = (day: Date) => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    const {isFreezing} = this.state;
    if (!isFreezing) {
      this.setState({
        currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
        rows: [],
        isStartLoading: false,
        isFreezing: false,
      });
    }
  };

  prevMonth = () => {
    const {isFreezing} = this.state;
    if (!isFreezing) {
      this.setState({
        currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
        rows: [],
        isStartLoading: false,
        isFreezing: false,
      });
    }
  };



  test = async () => {

  }

  render() {
    const {currentLocale, currentMonth, rows} = this.state;
    return (
      <div className="calendar">
        <button
          style={{height: '20px'}}
          onClick={this.test}
        >
          <span>TEST</span>
        </button>
        <Header
          currentLocale={currentLocale}
          currentMonth={currentMonth}
          nextMonthCallback={this.nextMonth}
          prevMonthCallback={this.prevMonth}
        />
        {this.renderDays()}
        <Cells rows={rows} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  gamesData: gamesDataSelector(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  recordData,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);