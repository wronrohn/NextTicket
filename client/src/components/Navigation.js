import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import SignOutButton from "./Signout";
const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
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
  </ul>
);

export default Navigation;
