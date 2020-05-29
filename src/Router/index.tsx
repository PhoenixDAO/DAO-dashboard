import React from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import routes from 'routes'
import Layout from 'Layout'
import Home from 'Home'

export default () =>
  <Router history={history}>
    <Layout>
      <Switch>
        <Route path={routes.root()} exact component={Home}/>
      </Switch>
    </Layout>
  </Router>

