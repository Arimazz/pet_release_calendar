import React, { FC } from 'react';
import * as dateFns from "date-fns";

const dateFormat = "LLLL yyyy";

interface IProps {
  prevMonthCallback: any;
  nextMonthCallback: any;
  currentLocale: Locale;
  currentMonth: Date;
}

const Header: FC<IProps> = ({
  prevMonthCallback,
  nextMonthCallback,
  currentLocale,
  currentMonth,
}) => {
  return (
    <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonthCallback}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(currentMonth, dateFormat, {locale: currentLocale})}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={nextMonthCallback}>chevron_right</div>
        </div>
      </div>
  )
}

export default Header;