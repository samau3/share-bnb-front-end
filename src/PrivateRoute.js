import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext";

/** "Higher-Order Component" for private routes.
 *
 * This component will check if there is a valid current user and 
 * only continues to the route if so. If no user is present, 
 * redirects to login form.
 * 
 *  Props:
 *  - exact: true/false
 *  - path: location to route to 
 *  - children: component to render
 * 
 *  State:
 *  - None
 * 
 *  Routes -> Private Route -> { Redirect, children }
 */

function PrivateRoute({ exact, path, children }) {
  const currentUser = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "exact=", exact,
    "path=", path,
    "currentUser=", currentUser,
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
