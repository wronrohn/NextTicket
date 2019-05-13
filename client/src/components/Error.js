import React from "react";

const Error = ({ message }) => (
  <div className="">
    <div className="center-content">
      <div className="white-container">
        <h1 className="display-4 ">Error</h1>
        <p className="lead m-5m ">{message}</p>
      </div>
    </div>
  </div>
);

export default Error;
