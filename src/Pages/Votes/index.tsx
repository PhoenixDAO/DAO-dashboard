import React from 'react'
import Font from 'Shared/Font'
import Card from "Shared/Card"
import Table from "Shared/Table"
import {Columns} from 'Shared/Grid'
import Modal from 'Shared/Modal'
import Button from 'Shared/Button'
import iconLike from 'assets/images/icons/like.svg'
import style from './style.module.scss'

type Project = {
  title: string,
  date?: string
}

const upcoming: Project[] = [
  {
    title: 'Amazon dApp build',
  },
  {
    title: 'Uber replacement dApp',
    date: '08/01/2020',
  },
  {
    title: 'Facebook dApp build',
    date: '08/01/2020',
  },
  {
    title: 'Youtube dApp build',
    date: '09/01/2020',
  },
  {
    title: 'Whatsapp dApp build',
    date: '09/01/2020',
  },
  {
    title: 'DEX aggregator build',
    date: '09/01/2020',
  },
  {
    title: 'Gamer Marketplace build',
    date: '09/01/2020',
  },
  {
    title: 'Tokenization dApp build',
    date: '10/01/2020',
  },
]

const past = [
  [
    'DEX dApp build',
    '07/01/2020',
    <Font color='success'>Pass</Font>,
  ],
  [
    'Other dApp build',
    '07/01/2020',
    <Font color='success'>Pass</Font>,
  ],
  [
    'Other dApp build',
    '07/01/2020',
    'Fail',
  ],
  [
    'Other dApp build',
    '07/01/2020',
    'Fail',
  ],
  [
    'Other dApp build',
    '07/01/2020',
    <Font color='success'>Pass</Font>,
  ],
  [
    'Other dApp build',
    '07/01/2020',
    'Fail',
  ],
  [
    'Other dApp build',
    '07/01/2020',
    <Font color='success'>Pass</Font>,
  ],
  [
    'Other dApp build',
    '07/01/2020',
    <Font color='success'>Pass</Font>,
  ],
]

export default () => {
  const [modalItem, setModalItem] = React.useState<Project | undefined>(undefined)
  const closeModal = () => setModalItem(undefined)

  return <>
    {
      modalItem &&
      <Modal
        title={modalItem.title}
        close={closeModal}
        actions={
          <>
            <Button primary onClick={closeModal}>Ok</Button>
            <Button primary outline onClick={closeModal} icon={iconLike}>Upvote</Button>
          </>
        }
      >
        <div className={style.modalContent}>
          <div className={style.modalBrief}>
            <span>350,000 PHNX</span>
            <span>5 milestone</span>
            <span>10/30/2020</span>
          </div>
          <div className={style.modalText}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          </div>
          <div className={style.modalSteps}>
            <div className={style.modalStep}>
              <div className={style.modalStepNumber}>1</div>
              <div className={style.modalStepText}>Architecture Document</div>
            </div>
            <div className={style.modalStep}>
              <div className={style.modalStepNumber}>2</div>
              <div className={style.modalStepText}>Backend server and database connected with registration</div>
            </div>
            <div className={style.modalStep}>
              <div className={style.modalStepNumber}>3</div>
              <div className={style.modalStepText}>Buy and sell one product functionality</div>
            </div>
          </div>
        </div>
      </Modal>
    }
    <Columns>
      <Card title='Upcoming Votes'>
        <Table columns={['Proposal', 'Voting Day']}>
          {upcoming.map((item, i) =>
            <tr key={i}>
              <td>{item.title}</td>
              <td>{
                item.date ||
                <Font
                  color='accent'
                  pointer
                  onClick={() => setModalItem(item)}
                >Vote Now</Font>
              }</td>
            </tr>
          )}
        </Table>
      </Card>
      <Card title='Past Votes'>
        <Table columns={['Proposal', 'Voting Day', 'Pass/Fail']}>
          {past.map((row, i) =>
            <tr key={i}>
              {row.map((value, j) =>
                <td key={j}>{value}</td>
              )}
            </tr>
          )}
        </Table>
      </Card>
    </Columns>
  </>
}
