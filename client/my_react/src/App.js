import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Auth from './hoc/auth'

import RecipePage from './components/_views/RecipePage/RecipePage'

function App() {
  return (
    <Router>
      <div>

        <Switch>

          <Route exact path="/" component={Auth(RecipePage, null)}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;