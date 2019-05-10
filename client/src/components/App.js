import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignupPage from "./Signup";
import SignInPage from "./SignIn";
import MovieList from "./MovieList";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from "../Session";
import PasswordChange from "./PasswordChange";
import PasswordForgetPage from "./ForgetPassword";
/**
 * Main entrypoint for the client-side applicaiton.
 */

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
      <Route exact path={ROUTES.MOVIES} component={MovieList} />
      <Route exact path={ROUTES.SIGNIN} component={SignInPage} />
      <Route exact path={ROUTES.CHANGE_PASSWORD} component={PasswordChange} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
    </div>
  </Router>
);

export default withAuthentication(App);
