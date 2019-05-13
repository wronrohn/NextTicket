import React from "react";

const Error = ({ message }) => (
  <div className="">
    <div className="center-content">
      <h1 className="display-4 text-white">Error</h1>
      <p className="lead m-5m text-white">{message}</p>
    </div>
  </div>
);

export default Error;
