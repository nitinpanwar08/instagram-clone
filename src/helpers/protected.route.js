import PropTypes from "prop-types";
import { Route, Redirect } from "react-router";
import * as ROUTES from "../constants/routes";

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
   <Route
      {...rest}
      render={({ location }) =>
        user.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: location }
            }}
          />
        )
      }

    />
  );
}

ProtectedRoute.protoTypes = {
  user: PropTypes.object,
  children: PropTypes.object.required,
};
