import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

type Item = {
  title: string
  url: string
  list: {text: string, checked: boolean}[]
  completionDate: string
}

const originalData: Item[] = [
  {
    title: 'Amazon Marketplace dApp',
    url: 'https://',
    list: [
      {
        text: 'Frontend Design',
        checked: true,
      },
      {
        text: 'Frontend React',
        checked: false,
      },
      {
        text: 'User/Business Registration',
        checked: false,
      },
      {
        text: "Backend API's",
        checked: false,
      },
      {
        text: 'Marketplace Smart Contracts',
        checked: false,
      },
    ],
    completionDate: '2020-09-30',
  },
  {
    title: 'Facebook Social dApp',
    url: 'https://',
    list: [
      {
        text: 'Frontend Desing',
        checked: true
      },
      {
        text: 'Frontend React',
        checked: true
      },
      {
        text: 'User Registration',
        checked: false
      },
      {
        text: "Backend API's",
        checked: false
      },
    ],
    completionDate: '2020-10-15',
  }
]

export default () => {
  const [data, setData] = React.useState(originalData)

  const check = (i: number, j: number) => {
    data[i].list[j].checked = !data[i].list[j].checked
    setData([...data])
  }

  const setUrl = (i: number, value: string) => {
    data[i].url = value
    setData([...data])
  }

  return <div className={style.wrap}>
    {data.map((item, i) => {
      const {title, url, list, completionDate} = item

      return <form key={i} className={style.item}>
        <div className={style.title}>{title}</div>
        <label className={style.formControl}>
          <div className={style.label}>Medium Update</div>
          <input className={style.input} type='url' value={url} onChange={({target: {value}}) => setUrl(i, value)}/>
        </label>
        {list.map(({text, checked}, j) =>
          <div key={j} className={cn(style.listItem, checked && style.checked)}>
            <div className={style.num}>{checked ? '✓' : j + 1}</div>
            <div className={style.name}>{text}</div>
            <div className={style.toggleButton} onClick={() => check(i, j)}>{checked ? 'Complete' : 'Incomplete'}</div>
          </div>
        )}
        <label className={style.formControl}>
          <div className={style.label}>Est. Completion Date</div>
          <input className={cn(style.input, style.date)} type='date' value={completionDate}/>
        </label>
        <div className={style.submitWrap}>
          <input type='submit' className={style.submit} value='Submit Updates'/>
        </div>
      </form>
    })}
  </div>
}
