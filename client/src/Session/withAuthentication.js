import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        isLoading: true
      };
    }

    componentDidMount() {
      try {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            authUser
              ? this.setState({ authUser, isLoading: false })
              : this.setState({ authUser: null, isLoading: false });
          }
        );
      } catch (e) {}
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      if (this.state.isLoading) {
        return (
          <div>
            <p className="text-white">Loading .... </p>
          </div>
        );
      }
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
