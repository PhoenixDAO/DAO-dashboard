import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import routes from 'routes'
import LogIn from 'User/Auth/LogIn'
import LogInWithNumio from 'User/Auth/LogInWithNumio'
import SignUp from 'User/Auth/SignUp'
import Layout from 'Layout'
import Home from 'Home'
import Admin from 'Admin'
import Proposals from 'Proposals'
import Votes from 'Votes'
import ActiveProjects from 'ActiveProjects'
import Rewards from 'Rewards'
import MyProjects from 'UserProjects'

export default () =>
  <Router history={history}>
    <Switch>
      <Route path={routes.auth.root()} render={() =>
        <Switch>
          <Route path={routes.auth.logIn()} component={LogIn} />
          <Route path={routes.auth.logInWithNumio()} component={LogInWithNumio} />
          <Route path={routes.auth.signUp()} component={SignUp} />
        </Switch>
      }/>
      <Route render={() =>
        <Layout>
          <Switch>
            <Route path={routes.root()} exact component={Home}/>
            <Route path={routes.admin()} exact component={Admin}/>
            <Route path={routes.proposals()} exact component={Proposals}/>
            <Route path={routes.votes()} exact component={Votes}/>
            <Route path={routes.activeProjects()} exact component={ActiveProjects}/>
            <Route path={routes.rewards()} exact component={Rewards}/>
            <Route path={routes.myProjects.root()} component={MyProjects}/>
          </Switch>
        </Layout>
      }/>
    </Switch>
  </Router>

