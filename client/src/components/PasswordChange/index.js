import React, { Component } from "react";

import { withFirebase } from "../../Firebase";
import { withAuthorization } from "../../Session";
import { SignInPageLink } from "../SignIn";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .passwordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div className="col-md-8 offset-md-2 mt-5">
        <form className="mt-4 mb-5" onSubmit={this.onSubmit}>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
            className="form-control form-control-lg"
          />
          <br />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
            className="form-control form-control-lg"
          />
          <br />
          <button
            className="btn btn-primary mb-2 mt-3 form-control form-control-lg"
            disabled={isInvalid}
            type="submit"
          >
            Reset My Password
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withAuthorization()(withFirebase(PasswordChangeForm));
