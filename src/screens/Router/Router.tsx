import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from '../App/App';
import DateScreen from "../Date/DateScreen";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/day/:currentDate'>
          <DateScreen />
        </Route>

        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;