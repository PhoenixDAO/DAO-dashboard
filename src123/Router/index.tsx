import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import routes from "routes";
import LogIn from "User/Auth/LogIn";
import LogInWithNumio from "User/Auth/LogInWithNumio";
import SignUp from "User/Auth/SignUp";
import Layout from "Layout";
import Home from "Home";
import Admin from "Admin";
import Proposals from "Proposals";
import Votes from "Votes";
import ActiveProjects from "ActiveProjects";
import Rewards from "Rewards";
import MyProjects from "UserProjects";
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import { Height } from "@material-ui/icons";

const inh = ({ store }: any) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            path={routes.auth.root()}
            render={() => (
              <Switch>
                <Route path={routes.auth.logIn()} component={LogIn} />
                <Route
                  path={routes.auth.logInWithNumio()}
                  component={LogInWithNumio}
                />
                <Route path={routes.auth.signUp()} component={SignUp} />
              </Switch>
            )}
          />
          <Route
            render={() => (
              <Layout>
                <Switch>
                  <PrivateRoute path={routes.root()} exact component={Home} />
                  <AdminRoute path={routes.admin()} exact component={Admin} />
                  <PrivateRoute
                    path={routes.proposals()}
                    exact
                    component={Proposals}
                  />
                  <PrivateRoute path={routes.votes()} exact component={Votes} />
                  <PrivateRoute
                    path={routes.activeProjects()}
                    exact
                    component={ActiveProjects}
                  />
                  <PrivateRoute
                    path={routes.rewards()}
                    exact
                    component={Rewards}
                  />
                  <PrivateRoute
                    path={routes.myProjects.root()}
                    exact
                    // link={routes.myProjects.active()}
                    component={MyProjects}
                  />
                  <PrivateRoute
                    path={routes.myProjects.active()}
                    component={MyProjects}
                  />
                  <PrivateRoute
                    path={routes.myProjects.proposals()}
                    component={MyProjects}
                  />
                </Switch>
              </Layout>
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default inh;
