import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../Layout'
import {Title} from '../Shared'
import Field from "Shared/Field"
import Button from 'Shared/Button'
import routes from 'routes'
import style from './style.module.scss'

export default () =>
  <Layout>
    <Title>Login</Title>
    <Field label='Email' />
    <Field label='Password' type='password' />
    <div className={style.forgot}>Forgot passport?</div>
    <div className={style.buttons}>
      <Button component={Link} to={routes.root()} className={style.button} primary shadow>Login</Button>
      <Button component={Link} to={routes.auth.logInWithNumio()} className={style.button} primary outline shadow>
        Login with Numio
      </Button>
      <Link to={routes.auth.signUp()} className={style.center}>
        <div className={style.textButton}>Create account</div>
      </Link>
    </div>
  </Layout>
