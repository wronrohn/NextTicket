import React from "react";
import * as CONSTANTS from "./Constants";
import { withFirebase } from "../../Firebase";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
const SignupPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
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
    await this.props.firebase.createUserWithEmailAndPassword(email, password);
    try {
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
      this.props.history.push(ROUTES.HOME);
    } catch (e) {
      this.setState(() => {
        return {
          error: e
        };
      });
    }
  }

  render() {
    const {
      email,
      password,
      userName,
      repeatPassword,
      error,
      message
    } = this.state;
    const isInvalid =
      password !== repeatPassword ||
      password === "" ||
      repeatPassword === "" ||
      email === "" ||
      userName === "";
    return (
      <React.Fragment>
        {message && <p>{message}</p>}
        <form onSubmit={this.onSubmit}>
          <label htmlFor={CONSTANTS.FORMFIELDUSERNAME}>Username:</label>
          <input
            type="text"
            name={CONSTANTS.FORMFIELDUSERNAME}
            id={CONSTANTS.FORMFIELDUSERNAME}
            placeholder="Enter UserName"
            value={userName}
            onChange={this.onFormFieldChange}
          />
          <label htmlFor={CONSTANTS.FORMFIELDEMAIL}>Email</label>
          <input
            type="text"
            name={CONSTANTS.FORMFIELDEMAIL}
            id={CONSTANTS.FORMFIELDEMAIL}
            placeholder="Enter Email"
            value={email}
            onChange={this.onFormFieldChange}
          />
          <label htmlFor={CONSTANTS.FORMFIELDPASSWORD}>Password</label>
          <input
            type="password"
            name={CONSTANTS.FORMFIELDPASSWORD}
            placeholder="Enter your password"
            id={CONSTANTS.FORMFIELDPASSWORD}
            value={password}
            onChange={this.onFormFieldChange}
          />
          <label htmlFor={CONSTANTS.FORMFIELDREPEATPASSWORD}>Password</label>
          <input
            type="password"
            name={CONSTANTS.FORMFIELDREPEATPASSWORD}
            placeholder="Enter your password"
            id={CONSTANTS.FORMFIELDREPEATPASSWORD}
            value={repeatPassword}
            onChange={this.onFormFieldChange}
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </React.Fragment>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);
export default SignupPage;
export { SignUpForm };
