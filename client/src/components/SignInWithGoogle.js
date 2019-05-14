import React, { Component } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../constants/routes";
class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .signWithGmail()
      .then(socialAuthUser => {
        this.setState({ error: null });
        console.log(`User ${JSON.stringify(socialAuthUser)}`);
        if (socialAuthUser && socialAuthUser.user.uid) {
          this.network.syncWatchlistForLogin(socialAuthUser.user.uid);
        }
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="form-wrapper-container">
        <button
          type="submit"
          className="btn btn-primary mb-5 mt-2 form-control form-control-lg"
        >
          Sign In with Google
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

export default SignInGoogle;
