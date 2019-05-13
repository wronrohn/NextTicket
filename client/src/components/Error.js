import React from "react";

const Error = ({ message }) => (
  <div className="bg-light contentCenter w-50 rounded-lg">
    <div className="col-md-8 offset-md-2">
      <h1 className="display-4 m-5">Error</h1>
      <p className="lead m-5">{message}</p>
    </div>
  </div>
);

export default Error;
