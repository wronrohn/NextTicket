import React from "react";
import * as CONSTANTS from "./Constants";
import { FirebaseContext } from "../../Firebase";
import SignUpForm from "./SignUpForm";
const SignupPage = () => (
  <div>
    <h1>Sign Up</h1>
    <FirebaseContext.Consumer>
      {firebase => {
        return <SignUpForm firebase={firebase} />;
      }}
    </FirebaseContext.Consumer>
  </div>
);

export default SignupPage;
