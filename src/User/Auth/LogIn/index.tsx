import React from 'react'
import {Title} from '../Shared'
import Field from "Shared/Field"
import Button from 'Shared/Button'
import style from './style.module.scss'

export default () =>
  <>
    <Title>Login</Title>
    <Field label='Email' />
    <Field label='Password' type='password' />
    <div className={style.forgot}>Forgot passport?</div>
    <div className={style.buttons}>
      <Button className={style.button} primary shadow>Login</Button>
      <Button className={style.button} primary outline shadow>Login with Numio</Button>
      <div className={style.center}>
        <div className={style.create}>Create account</div>
      </div>
    </div>
  </>
