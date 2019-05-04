import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import * as CONSTANTS from "./Constants";
import { PasswordForgetLink } from "../ForgetPassword";

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
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
      this.props.history.push(ROUTES.MOVIES);
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
      <form onSubmit={this.onSubmit}>
        <label htmlFor={CONSTANTS.FORMFIELDEMAIL}>Email</label>
        <input
          name={CONSTANTS.FORMFIELDEMAIL}
          id={CONSTANTS.FORMFIELDEMAIL}
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name={CONSTANTS.FORMFIELDPASSWORD}
          value={password}
          id={CONSTANTS.FORMFIELDPASSWORD}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Login
        </button>
        “ {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
