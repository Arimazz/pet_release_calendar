import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from '../App/App';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <Main />
        </Route>

        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;