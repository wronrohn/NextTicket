import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../Signout";
import { AuthUserContext } from "../../Session";
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : null)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div className="container" style={{ paddingTop: "50px" }}>
    <div className="row">
      <Link className="navbar-brand col-md-10" to={ROUTES.LANDING}>
        <h1>Next Ticket</h1>
      </Link>
      <Link to={ROUTES.USER_PROFILE} className="nav-link">
        <i
          className="far fa-user-circle"
          style={{ fontSize: "3.5rem", paddingLeft: "3.2rem", color: "gray" }}
        />
      </Link>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to={ROUTES.LANDING}>
        <h1>Next Ticket</h1>
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
        <li>
          <Link to={ROUTES.SIGNUP} className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.SIGNIN} className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to={ROUTES.PASSWORD_FORGET} className="nav-link">
            ForgotPassword
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
