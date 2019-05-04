import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../Signout";
import { AuthUserContext } from "../../Session";
const Navigation = ({ authUser }) => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.MOVIES}>Movies</Link>
    </li>
    <li>
      <Link to={ROUTES.CHANGE_PASSWORD}>Update Password</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGNIN}>Login</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGNUP}>Sign Up</Link>
    </li>
    <li>
      <Link to={ROUTES.PASSWORD_FORGET}>ForgotPassword</Link>
    </li>
  </ul>
);

export default Navigation;
