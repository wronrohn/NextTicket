import React, { Component } from "react";
import { AuthUserContext } from "../Session";

class RecommendWatchListMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendation: props.recommendation,
      watchlist: props.watchlist
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      recommendation: props.recommendation,
      watchlist: props.watchlist
    });
  }

  render() {
    const { onWatchListTapped, onRecomemndationTapped } = this.props;
    const { recommendation, watchlist } = this.state;
    console.log(`Watch list ${watchlist}`);
    return (
      <ul className="nav justify-content-center m-3">
        <li className="nav-item">
          <AuthUserContext.Consumer>
            {authUser => {
              return (
                <button
                  className={
                    recommendation
                      ? `nav-link btn btn-link`
                      : `disable-button-nav nav-link btn btn-link`
                  }
                  onClick={e => {
                    this.setState({
                      recommendation: true,
                      watchlist: false
                    });
                    onRecomemndationTapped(authUser.uid);
                  }}
                >
                  Recommended Movies
                </button>
              );
            }}
          </AuthUserContext.Consumer>
        </li>
        <li className="nav-item">
          <AuthUserContext.Consumer>
            {authUser => {
              return (
                <button
                  className={
                    watchlist
                      ? `nav-link btn btn-link`
                      : `disable-button-nav nav-link btn btn-link`
                  }
                  onClick={e => {
                    this.setState({
                      recommendation: false,
                      watchlist: true
                    });
                    onWatchListTapped(authUser.uid);
                  }}
                >
                  Watch List
                </button>
              );
            }}
          </AuthUserContext.Consumer>
        </li>
      </ul>
    );
  }
}

export default RecommendWatchListMenu;
