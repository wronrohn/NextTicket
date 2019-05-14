import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../Firebase";
import * as CONSTANTS from "./Constants";
import { PasswordForgetLink } from "../ForgetPassword";
import Network from "../Network";
import { SignupPageLink } from "../Signup";
import SignInWithGoogle from "../SignInWithGoogle";

const SignInPage = () => (
  <div style={{ paddingTop: "10rem" }}>
    <SignInForm />
    <SignInWithGoogle />
    <PasswordForgetLink className="p-5 m-5" />
    <SignupPageLink className="p-5 m-5" />
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
    this.signWithGmail = this.onChange.bind(this);
  }

  async onSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      let resolved = await this.props.firebase.signInWithEmailAndPassword(
        email,
        password
      );
      if (resolved && resolved.user && resolved.user.uid) {
        this.network.syncWatchlistForLogin(resolved.user.uid);
      }
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.LANDING);
    } catch (error) {
      this.setState({ error });
    }
  }

  onChange(event) {
    console.log(`ON CHANGE`);
    this.setState({ [event.target.name]: event.target.value });
  }

  async signWithGmail(event) {
    //event.preventDefault();
    console.log("here in signin");
    try {
      const authUser = await this.props.firebase.signWithGmail();
      console.log(`User -> Auth User ${JSON.stringify(authUser)}`);
      this.props.history.push(ROUTES.LANDING);
    } catch (e) {
      console.log(`ERRRO ON CLICK ${e}`);
      this.setState({
        error: e,
        message: null
      });
    }
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <div className="col-md-8 offset-md-2 mt-5">
        <h1 className="m-4 text-center text-white">Welcome to Next Ticket</h1>
        <h2
          className="m-5 text-center text-white"
          style={{ fontWeight: "lighter", fontSize: "1.8rem" }}
        >
          Sign In with your existing details
        </h2>
        <form
          className="mt-4 mb-5 form-wrapper-container"
          onSubmit={this.onSubmit}
        >
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
            className="btn btn-primary mb-1 mt-3 form-control form-control-lg"
            disabled={isInvalid}
            type="submit"
          >
            Login
          </button>
          {error && <p className="text-white">{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInPageLink = ({ message }) => (
  <p className="text-center">
    <Link to={ROUTES.SIGNIN}>
      {message ? `${message}` : `Already a Member?`}
    </Link>
  </p>
);

export default SignInPage;

export { SignInForm, SignInPageLink };
