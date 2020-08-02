import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Auth from './hoc/auth'

import LandingPage from './components/views/LandingPage/LangingPage'

function App() {
  return (
    <Router>
      <div>

        <Switch>

          <Route exact path="/" component={Auth(LandingPage, null)}/>

        </Switch>
      </div>
    </Router>
  );
}

export default App;