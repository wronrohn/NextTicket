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

const NavigationAuth = props => (
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
          <span className="text-hide" style={{ width: "0px", height: "0px" }}>
            User Profile
          </span>
        </Link>
      </div>
    </div>
  </div>
);

export default Navigation;
