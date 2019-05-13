import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import logo from "./logo.png";
import { AuthUserContext } from "../../Session";
const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : null)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div className="container" style={{ paddingTop: "50px" }}>
    <div className="row">
      <div className="log-div-wrapper col-md-6">
        <Link className="navbar-brand" to={ROUTES.LANDING}>
          <img
            style={{ height: "50px" }}
            src={logo}
            alt="logo"
            className="mr-3"
          />
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "2.4rem",
              position: "relative",
              top: "0.5rem",
              fontVariant: "small-caps"
            }}
          >
            Next Ticket
          </span>
        </Link>
      </div>
      <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 user-avatar-wrapper">
        <Link to={ROUTES.USER_PROFILE} className="nav-link">
          <i
            className="far fa-user-circle"
            style={{
              fontSize: "3.5rem",
              paddingLeft: "3.2rem",
              color: "gray"
            }}
          />
        </Link>
      </div>
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
