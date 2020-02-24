import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


export const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem('token');
  console.log(children, rest);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
