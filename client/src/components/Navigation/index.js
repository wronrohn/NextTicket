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
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to={ROUTES.LANDING}>
      Next Ticket
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span>
        <i className="fa fa-align-justify" />
      </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={ROUTES.MOVIES} className="nav-link">
            Movies
          </Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.CHANGE_PASSWORD} className="nav-link">
            Update Password
          </Link>
        </li>
        <li className="nav-item">
          <SignOutButton />
        </li>
      </ul>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-dark bg-dark">
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
  </nav>
);

export default Navigation;
