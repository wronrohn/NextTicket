import React from "react";
import { AuthUserContext } from "../Session";

const RecommendWatchListMenu = ({
  onWatchListTapped,
  onRecomemndationTapped
}) => (
  <ul>
    <li>
      <AuthUserContext.Consumer>
        {authUser => {
          return (
            <button
              onClick={e => {
                onRecomemndationTapped(authUser.uid);
              }}
            >
              Recommended Movies
            </button>
          );
        }}
      </AuthUserContext.Consumer>
    </li>
    <li>
      <AuthUserContext.Consumer>
        {authUser => {
          return (
            <button
              onClick={e => {
                onWatchListTapped(authUser.uid);
              }}
            >
              Watch List Tapped
            </button>
          );
        }}
      </AuthUserContext.Consumer>
    </li>
  </ul>
);

export default RecommendWatchListMenu;
