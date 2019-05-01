import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignUpPage from "./Signup";
import SignInPage from "./SignIn";
import MoviesPage from "./Movies";
import * as ROUTES from "../constants/routes";

/**
 * Main entrypoint for the client-side applicaiton.
 */
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation />
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGNIN} component={SignInPage} />
            <Route exact path={ROUTES.SIGNUP} component={SignUpPage} />
            <Route exact path={ROUTES.MOVIES} component={MoviesPage} />
          </div>
        </Router>
      </div>
    );
  }
}
