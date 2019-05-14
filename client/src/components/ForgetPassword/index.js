import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../../Firebase";
import * as ROUTES from "../../constants/routes";
import { SignupPageLink } from "../Signup";
import { SignInPageLink } from "../SignIn";

const PasswordForgetPage = () => (
  <div style={{ paddingTop: "7rem" }}>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
  message: ""
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .resetPassword(email)
      .then(message => {
        this.setState({
          message: "A reset password link is set to your email",
          error: null
        });
      })
      .catch(error => {
        this.setState({ error, message: null });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error, message } = this.state;

    const isInvalid = email === "";

    return (
      <div className="col-md-8 offset-md-2 mt-5">
        <h1 className="m-4 text-center text-white">Forgot your Password?</h1>
        <h2
          className="m-5 text-center text-white"
          style={{ fontWeight: "lighter", fontSize: "1.8rem" }}
        >
          Don't you worry! We got you
        </h2>
        <form
          className="mt-4 mb-5 form-wrapper-container"
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label className="text-white sr-only">Email</label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              className="form-control form-control-lg mb-4"
              placeholder="Email Address"
            />
          </div>
          <button
            disabled={isInvalid}
            className="btn btn-primary mb-2 mt-3 form-control form-control-lg"
            type="submit"
          >
            Reset My Password
          </button>
          {message && <p className="text-white text-center mt-5">{message}</p>}
          {error && (
            <p className="text-white text-center mt-5">{error.message}</p>
          )}
        </form>
        <SignInPageLink message="Login" />
        <SignupPageLink />
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="text-center">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
