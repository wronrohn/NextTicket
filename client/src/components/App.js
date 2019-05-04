import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LandingPage from "./Landing";
import SignupPage from "./Signup";
import SignInPage from "./SignIn";
import MovieList from "./MovieList";
import * as ROUTES from "../constants/routes";
import { withFirebase } from "../Firebase";

/**
 * Main entrypoint for the client-side applicaiton.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation authUser={this.state.authUser} />
            <hr />
            <Route exact path={ROUTES.SIGNUP} component={SignupPage} />
            <Route exact path={ROUTES.MOVIES} component={MovieList} />
            <Route exact path={ROUTES.SIGNIN} component={SignInPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withFirebase(App);
