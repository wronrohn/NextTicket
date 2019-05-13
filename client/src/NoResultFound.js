import React from "react";

import ticketIcon from "../src/ticketIcon.png";
const NoResultFound = () => (
  <div className="container no-result-div">
    <div className="text-center">
      <img className="m-5" src={ticketIcon} alt="Ticket Icon" />
      <h1 className="text-white m-5">No Results Found</h1>
    </div>
  </div>
);

export default NoResultFound;
