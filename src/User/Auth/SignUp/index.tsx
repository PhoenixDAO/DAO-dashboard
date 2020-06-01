import React from 'react'
import Layout from '../Layout'
import {Title} from '../Shared'
import Field from "Shared/Field"
import Button from 'Shared/Button'
import {Link} from 'react-router-dom'
import routes from 'routes'
import style from './style.module.scss'

const ThanksPage = () =>
  <Layout className={style.thanksPage}>
    <Title>Thank you for creating an account and joining the DAO!</Title>
    <div className={style.verifyText}>Please verify your email to complete registration to login.</div>
    <div className={style.buttons}>
      <Button component={Link} to={routes.root()} className={style.button} primary shadow>Log in</Button>
    </div>
  </Layout>

export default () => {
  const [registered, setRegistered] = React.useState(false)

  if (registered)
    return <ThanksPage />

  return <Layout>
    <Title>Register</Title>
    <Field label='First Name' />
    <Field label='Last Name' />
    <Field label='Email' type='email' />
    <Field label='Password' type='password' />
    <Field label='Confirm Password' type='password' />
    <div className={style.buttons}>
      <Button onClick={() => setRegistered(true)} className={style.button} primary shadow>Register</Button>
      <div className={style.center}>
        <Link to={routes.auth.logIn()} className={style.textButton}>Log in</Link>
      </div>
    </div>
  </Layout>
}
