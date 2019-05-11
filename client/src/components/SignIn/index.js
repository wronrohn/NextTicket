import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import * as CONSTANTS from "./Constants";
import { PasswordForgetLink } from "../ForgetPassword";

const SignInPage = () => (
  <div className="container bg-light contentCenter w-50 rounded-lg">
    <SignInForm />
    <PasswordForgetLink className="p-5 m-5" />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      await this.props.firebase.signInWithEmailAndPassword(email, password);
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.LANDING);
    } catch (error) {
      this.setState({ error });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <div className="col-md-8 offset-md-2 mt-5">
        <h1 className="m-4 text-center">Welcome to Next Ticket</h1>
        <h2 className="m-5 text-center">Sign In with your existing details</h2>
        <form className="mt-4 mb-5" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label
              className="text-white sr-only"
              htmlFor={CONSTANTS.FORMFIELDEMAIL}
            >
              Email
            </label>
            <input
              name={CONSTANTS.FORMFIELDEMAIL}
              id={CONSTANTS.FORMFIELDEMAIL}
              value={email}
              onChange={this.onChange}
              type="text"
              class="form-control form-control-lg mb-4"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <label
              className="text-white sr-only"
              htmlFor={CONSTANTS.FORMFIELDPASSWORD}
            >
              Password
            </label>
            <input
              name={CONSTANTS.FORMFIELDPASSWORD}
              value={password}
              id={CONSTANTS.FORMFIELDPASSWORD}
              onChange={this.onChange}
              type="password"
              class="form-control form-control-lg"
              placeholder="Password"
            />
          </div>
          <button
            className="btn btn-primary mb-2 mt-3 form-control form-control-lg"
            disabled={isInvalid}
            type="submit"
          >
            Login
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
