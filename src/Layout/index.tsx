import React from 'react'
import {Link} from 'react-router-dom'
import routes from 'routes'
import logo from 'assets/images/logo.svg'
import avatar from 'assets/images/avatar.png'
import iconAddProposal from 'assets/images/icons/add-proposal.svg'
import iconPenNPaper from 'assets/images/icons/pen-n-paper.svg'
import iconReward from 'assets/images/icons/reward.svg'
import iconUsers from 'assets/images/icons/users.svg'
import iconBell from 'assets/images/icons/bell.svg'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
}

export default ({children}: Props) =>
  <div className={style.page}>
    <div className={style.topBar}>
      <Link to={routes.root}>
        <img src={logo} alt="logo"/>
      </Link>
      <div className={style.user}>
        <div>
          <div className={style.name}>Robert Chen</div>
          <div className={style.email}>robchen@gmail.com</div>
        </div>
        <div className={style.avatar} style={{backgroundImage: `url(${avatar})`}}/>
      </div>
    </div>
    <div className={style.columns}>
      <div className={style.sidebar}>
        <Link className={style.item} to='#'>
          <div className={style.icon}>
            <img src={iconAddProposal} />
          </div>
          <div className={style.text}>Proposals</div>
        </Link>
        <Link className={style.item} to='#'>
          <div className={style.icon}>
            <img src={iconUsers} />
          </div>
          <div className={style.text}>Votes</div>
          <div className={style.bell}>
            <img src={iconBell}/>
          </div>
        </Link>
        <Link className={style.item} to='#'>
          <div className={style.icon}>
            <img src={iconPenNPaper} />
          </div>
          <div className={style.text}>Active Projects</div>
        </Link>
        <Link className={style.item} to='#'>
          <div className={style.icon}>
            <img src={iconReward} />
          </div>
          <div className={style.text}>Rewards</div>
        </Link>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  </div>
