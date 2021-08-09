import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener.js";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protected.route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login.js"));
const Signup = lazy(() => import("./pages/Signup.js"));
const NotFound = lazy(() => import("./pages/NotFound.js"));

function App() {
  const user = useAuthListener();
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback="..loading">
          <Switch>
            {/* <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} /> */}
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <IsUserLoggedIn user={user} path={ROUTES.LOGIN} exact>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} path={ROUTES.SIGN_UP} exact>
              <Signup />
            </IsUserLoggedIn>


            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
