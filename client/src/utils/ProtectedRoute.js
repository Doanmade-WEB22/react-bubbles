import React from "react";
import { Redirect, Route } from "react-router";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
