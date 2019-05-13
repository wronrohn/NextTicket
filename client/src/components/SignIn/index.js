import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import * as CONSTANTS from "./Constants";
import { PasswordForgetLink } from "../ForgetPassword";
import Network from "../Network";

const SignInPage = () => (
  <div className="">
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
    this.network = new Network();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      let resolved = await this.props.firebase.signInWithEmailAndPassword(email, password);
      if(resolved && resolved.user && resolved.user.uid) {
          this.network.syncWatchlistForLogin(resolved.user.uid);
      }
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
        <h1 className="m-4 text-center text-white">Welcome to Next Ticket</h1>
        <h2 className="m-5 text-center text-white">Sign In with your existing details</h2>
        <form className="mt-4 mb-5 form-wrapper-container" onSubmit={this.onSubmit}>
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
              className="form-control form-control-lg mb-4"
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
              className="form-control form-control-lg"
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
