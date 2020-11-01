import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Auth from './hoc/auth'
import LoginPage from './components/_views/LoginPage/LoginPage'
import RecipePage from './components/_views/RecipePage/RecipePage'

function App() {
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/" component={Auth(RecipePage, true)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;