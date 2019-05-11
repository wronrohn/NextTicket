import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignupPage from "./Signup";
import SignInPage from "./SignIn";
import * as ROUTES from "../constants/routes";
import { withAuthentication } from "../Session";
import PasswordChange from "./PasswordChange";
import PasswordForgetPage from "./ForgetPassword";
import Home from "./Home";
import { AuthUserContext } from "../Session";
import MovieDescription from "./MovieDescription";
/**
 * Main entrypoint for the client-side applicaiton.
 */

const App = () => (
  <Router>
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Navigation />
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <Route exact path={ROUTES.LANDING} component={Home} />
          ) : (
            <Route exact path={ROUTES.LANDING} component={SignupPage} />
          )
        }
      </AuthUserContext.Consumer>
      <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
      <Route exact path={ROUTES.SIGNIN} component={SignInPage} />
      <Route exact path={ROUTES.CHANGE_PASSWORD} component={PasswordChange} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.SPECIFIC_MOVIE} component={MovieDescription} />
    </div>
  </Router>
);

export default withAuthentication(App);
