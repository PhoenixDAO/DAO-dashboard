import React from 'react'
import cn from 'classnames'
import EditModal from 'Proposals/EditModal'
import DeleteModal from 'Proposals/DeleteModal'
import iconEdit from 'assets/images/icons/edit.svg'
import iconDelete from 'assets/images/icons/delete.svg'
import style from './style.module.scss'

type Item = {
  title: string
  upvotes: number
  expirationDate: string
  text: string
}

const data: Item[] = [
  {
    title: 'Amazon Marketplace dApp',
    upvotes: 71,
    expirationDate: '8/15/2020',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  },
  {
    title: 'Amazon Marketplace dApp',
    upvotes: 71,
    expirationDate: '8/15/2020',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  },
  {
    title: 'Amazon Marketplace dApp',
    upvotes: 71,
    expirationDate: '8/15/2020',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  },
  {
    title: 'Amazon Marketplace dApp',
    upvotes: 71,
    expirationDate: '8/15/2020',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  },
  {
    title: 'Amazon Marketplace dApp',
    upvotes: 71,
    expirationDate: '8/15/2020',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  },
  {
    title: 'Amazon Marketplace dApp',
    upvotes: 71,
    expirationDate: '8/15/2020',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et',
  },
]

export default () => {
  const [editModalItem, setEditModalItem] = React.useState<Item | undefined>(undefined)
  const [deleteModalItem, setDeleteModalItem] = React.useState<Item | undefined>(undefined)

  const edit = (item: Item) =>
    setEditModalItem(item)

  const deleteProposal = (item: Item) =>
    setDeleteModalItem(item)

  return <>
    {editModalItem && <EditModal close={() => setEditModalItem(undefined)} />}
    {deleteModalItem && <DeleteModal item={deleteModalItem} close={() => setDeleteModalItem(undefined)} />}
    <div className={style.wrap}>
      {data.map((item, i) => {
        const {title, upvotes, expirationDate, text} = item

        return <div key={i} className={style.item}>
          <label tabIndex={-1} className={style.menu}>
            <div className={style.menuButton}>
              <div/>
              <div/>
              <div/>
            </div>
            <div className={style.menuItems}>
              <div className={cn(style.menuItem, style.edit)} onClick={() => edit(item)}>
                <img src={iconEdit} className={style.icon}/> Edit proposal
              </div>
              <div className={cn(style.menuItem, style.delete)} onClick={() => deleteProposal(item)}>
                <img src={iconDelete} className={style.icon}/> Delete
              </div>
            </div>
          </label>
          <div className={style.title}>{title}</div>
          <div className={style.keyValues}>
            <div>
              <div className={style.key}>Current Upvotes</div>
              <div className={style.value}>{upvotes}/100</div>
            </div>
            <div>
              <div className={style.key}>Expiration Date</div>
              <div className={style.value}>{expirationDate}</div>
            </div>
          </div>
          <div className={style.text}>{text}</div>
        </div>
      })}
    </div>
  </>
}
