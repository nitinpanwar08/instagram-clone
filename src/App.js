import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener.js";
import UserContext from "./context/user";

const Dashboard = lazy(() => import("./pages/Dashboard"));
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
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
