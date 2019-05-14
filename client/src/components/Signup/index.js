import React from "react";
import * as CONSTANTS from "./Constants";
import { withFirebase } from "../../Firebase";
import { withRouter, Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { SignInPageLink } from "../SignIn";
import SignInGoogle from "../SignInWithGoogle";

const SignupPage = () => (
  <div style={{ paddingTop: "4rem" }}>
    <SignUpForm />
    <SignInGoogle />
    <SignInPageLink />
  </div>
);

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      repeatPassword: "",
      error: null,
      message: null
    };
    this.onFormFieldChange = this.onFormFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFormFieldChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  async onSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    try {
      await this.props.firebase.createUserWithEmailAndPassword(email, password);
      this.setState(() => {
        return {
          email: "",
          password: "",
          userName: "",
          repeatPassword: "",
          error: null,
          message: null
        };
      });
      this.props.history.push(ROUTES.LANDING);
    } catch (e) {
      this.setState({
        error: e
      });
    }
  }

  render() {
    const { email, password, userName, repeatPassword, error } = this.state;
    const isInvalid =
      password !== repeatPassword ||
      password === "" ||
      repeatPassword === "" ||
      email === "" ||
      userName === "";
    return (
      <React.Fragment>
        <div className="col-md-8 offset-md-2 mt-5">
          <h1 className="m-4 text-center text-white">Welcome to Next Ticket</h1>
          <h2
            className="m-5 text-center text-white"
            style={{ fontWeight: "lighter", fontSize: "1.8rem" }}
          >
            Sign Up and start getting recommendations for movies based on the
            ones you have already have in your watch list
          </h2>
          <form className="form-wrapper-container" onSubmit={this.onSubmit}>
            <label
              className="text-white sr-only"
              htmlFor={CONSTANTS.FORMFIELDUSERNAME}
            >
              Username:
            </label>
            <input
              type="text"
              name={CONSTANTS.FORMFIELDUSERNAME}
              id={CONSTANTS.FORMFIELDUSERNAME}
              placeholder="Enter UserName"
              value={userName}
              className="form-control form-control-lg mb-4"
              onChange={this.onFormFieldChange}
            />
            <label
              className="text-white sr-only"
              htmlFor={CONSTANTS.FORMFIELDEMAIL}
            >
              Email
            </label>
            <input
              type="text"
              name={CONSTANTS.FORMFIELDEMAIL}
              id={CONSTANTS.FORMFIELDEMAIL}
              placeholder="Enter Email"
              value={email}
              className="form-control form-control-lg mb-4"
              onChange={this.onFormFieldChange}
            />
            <label
              className="text-white sr-only"
              htmlFor={CONSTANTS.FORMFIELDPASSWORD}
            >
              Password
            </label>
            <input
              type="password"
              name={CONSTANTS.FORMFIELDPASSWORD}
              placeholder="Enter your password"
              id={CONSTANTS.FORMFIELDPASSWORD}
              value={password}
              className="form-control form-control-lg"
              onChange={this.onFormFieldChange}
            />
            <br />
            <label
              className="text-white sr-only"
              htmlFor={CONSTANTS.FORMFIELDREPEATPASSWORD}
            >
              Password
            </label>
            <input
              type="password"
              name={CONSTANTS.FORMFIELDREPEATPASSWORD}
              placeholder="Re-enter your password"
              id={CONSTANTS.FORMFIELDREPEATPASSWORD}
              value={repeatPassword}
              className="form-control form-control-lg"
              onChange={this.onFormFieldChange}
            />
            <br />
            <button
              className="btn btn-primary mb-3 mt-3 form-control form-control-lg"
              disabled={isInvalid}
              type="submit"
            >
              Sign Up
            </button>
            {error && <p className="text-white text-center">{error.message}</p>}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);
const SignupPageLink = () => (
  <p className="text-center">
    <Link to={ROUTES.SIGNUP}>Not a Member Join Now</Link>
  </p>
);
export default SignupPage;
export { SignUpForm, SignupPageLink };
