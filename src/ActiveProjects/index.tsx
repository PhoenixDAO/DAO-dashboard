import React from 'react'
import Card from "Shared/Card"
import Table from "Shared/Table"
import Modal from './Modal'

type Project = {
  title: string
  milestone: string
  date: string
  list: {
    text: string
    checked: boolean
  }[]
}

const list = [
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
]

const data: Project[] = [
  {
    title: 'Amazon dApp build',
    milestone: 'Milestone 3/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'Gamer dApp build',
    milestone: 'Milestone 3/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'Youtube dApp build',
    milestone: 'Milestone 2/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'Facebook dApp build',
    milestone: 'Milestone 2/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'WhatsApp dApp build',
    milestone: 'Milestone 2/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'DEX dApp build',
    milestone: 'Milestone 2/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'Uber dApp build',
    milestone: 'Milestone 1/5',
    date: '09/30/2020',
    list
  },
  {
    title: 'Tokenization dApp build',
    milestone: 'Milestone 3/5',
    date: '09/30/2020',
    list
  },
]

export default () => {
  const [modalItem, setModalItem] = React.useState<Project | undefined>(undefined)
  const closeModal = () => setModalItem(undefined)

  return <Card title='Active Projects'>
    {modalItem && <Modal close={closeModal} item={modalItem} />}
    <Table columns={['Active Project', 'Status', 'Est. Completion Date']}>
      {data.map((item, i) =>
        <tr key={i} onClick={() => setModalItem(item)}>
          <td>{item.title}</td>
          <td>{item.milestone}</td>
          <td>{item.date}</td>
        </tr>
      )}
    </Table>
  </Card>
}
