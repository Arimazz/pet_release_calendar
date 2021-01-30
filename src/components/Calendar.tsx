import React from "react";
import * as dateFns from "date-fns";
import { uk } from 'date-fns/locale';
import API from '../api/api';
import { bindActionCreators, Dispatch } from "redux";
import { gamesDataSelector } from "../selectors";
import { connect } from "react-redux";
import {recordData} from '../store/initStore';

interface IProps {
  recordData: any;
  gamesData: any;
}
interface IState {
  currentMonth: Date,
  selectedDate: Date,
  currentLocale: any,
  days: any[],
  rows: any[],
}
class Calendar  extends React.Component<IProps, IState> {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    currentLocale: uk,
    days: [],
    rows: [],
  };

  componentDidMount() {
    this.fillDays();
    console.log('mount');
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {currentMonth} = this.state;
    console.log('state', this.state);

    if (currentMonth !== prevState.currentMonth) {
      API.requestMonthGames(currentMonth);
    }
  }

  renderHeader() {
    const dateFormat = "LLLL yyyy";
    const {currentLocale} = this.state;

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat, {locale: currentLocale})}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
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
      {days.length > 0 && days.map(item => (
        <div className="col col-center" key={String(item)}>
          {item}
        </div>
      ))}
    </div>
    );
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    const daysLog = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        daysLog.push(formattedDate);
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={String(day)}
            onClick={() => {
              console.log(cloneDay);
              
              this.onDateClick(cloneDay);

            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={String(day)}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day: Date) => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  test = async () => {
    // const {currentMonth} = this.state;
    const res = await API.test();
    console.log(res);
    
    
  }

  render() {
    return (
      <div className="calendar">
        <button
          style={{height: '20px'}}
          onClick={this.test}
        >
          <span>TEST</span>
        </button>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
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