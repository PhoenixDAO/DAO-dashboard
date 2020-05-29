import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import routes from 'routes'
import Layout from 'Layout'
import Home from 'Pages/Home'
import Proposals from 'Pages/Proposals'
import Votes from 'Pages/Votes'
import ActiveProjects from 'Pages/ActiveProjects'
import Rewards from 'Pages/Rewards'

export default () =>
  <Router history={history}>
    <Layout>
      <Switch>
        <Route path={routes.root()} exact component={Home}/>
        <Route path={routes.proposals()} exact component={Proposals}/>
        <Route path={routes.votes()} exact component={Votes}/>
        <Route path={routes.activeProjects()} exact component={ActiveProjects}/>
        <Route path={routes.rewards()} exact component={Rewards}/>
      </Switch>
    </Layout>
  </Router>

