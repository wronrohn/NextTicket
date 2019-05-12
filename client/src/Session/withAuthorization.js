import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../constants/routes";

const withAuthorization = (condition = authUser => !!authUser) => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false
      };
    }
    componentDidMount() {
      this.setState({
        isLoading: true
      });
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        this.setState({
          isLoading: false
        });
        if (!condition(authUser)) {
          this.props.history.push(ROUTES.SIGNIN);
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      if (this.state.isLoading) {
        return <p>Loading ....</p>;
      }
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
