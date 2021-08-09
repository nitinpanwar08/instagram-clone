import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as ROUTES from "../constants/routes";

const IsUserLoggedIn = ({children,user, ...rest}) => {
  return (
    <Route
      {...rest}
      render={({ location }) => 
        !user.user ? (
          children
        ) : (
             <Redirect
            to={{
              pathname: ROUTES.DASHBOARD,
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default IsUserLoggedIn


IsUserLoggedIn.propTypes = {
  user : PropTypes.object,
  children : PropTypes.object.isRequired
}