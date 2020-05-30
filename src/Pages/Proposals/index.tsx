import React from 'react'
import Card from "Shared/Card"
import Table from "Shared/Table"
import Font from 'Shared/Font'
import Button from 'Shared/Button'
import Modal from 'Shared/Modal'
import style from './style.module.scss'

const data = [
  [
    'Build Amazon Marketplace dApp',
    <>88 / <Font color='success'>100</Font></>,
    104,
    '350,000',
    <Font color='accent'>06/30/2020</Font>,
  ],
  [
    'Build Uber replacement dApp',
    <>79 / <Font color='success'>100</Font></>,
    89,
    '550,000',
    <Font color='accent'>07/05/2020</Font>,
  ],
  [
    'Build Facebook replacement dApp',
    <>65 / <Font color='success'>100</Font></>,
    97,
    '350,000',
    <Font color='accent'>07/15/2020</Font>,
  ],
  [
    'Build DEX aggregator dApp',
    <>63 / <Font color='success'>100</Font></>,
    136,
    '450,000',
    <Font color='accent'>07/30/2020</Font>,
  ],
  [
    'Build Tokenization dApp',
    <>59 / <Font color='success'>100</Font></>,
    45,
    '950,000',
    <Font color='accent'>08/15/2020</Font>,
  ],
  [
    'Build Youtube replacement dApp',
    <>47 / <Font color='success'>100</Font></>,
    62,
    '250,000',
    <Font color='accent'>08/15/2020</Font>,
  ],
  [
    'Build WhatsApp replacement dApp',
    <>81 / <Font color='success'>100</Font></>,
    95,
    '150,000',
    <Font color='accent'>08/25/2020</Font>,
  ],
  [
    'Build Gamer Marketplace dApp',
    <>94 / <Font color='success'>100</Font></>,
    247,
    '300,000',
    <Font color='accent'>09/01/2020</Font>,
  ],
]

export default () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const closeModal = () => setModalOpen(false)

  return <>
    {modalOpen &&
      <Modal
        title='Submit a Proposal'
        actions={<Button primary onClick={closeModal}>Yes</Button>}
        close={closeModal}
      >
        <div className={style.modalContent}>
          <div className={style.modalContentTitle}>
            Why do you want to build this dApp or smart contract?<br/>Why is it needed?
          </div>
          <div className={style.modalContent}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          </div>
        </div>
      </Modal>
    }
    <Card
      title='Latest Proposals'
      actions={
        <Button secondary onClick={() => setModalOpen(true)}>Submit Proposal</Button>
      }
    >
      <Table columns={['Proposal', 'Current Upvotes', '# comments', 'Cost (PHNX)', 'Expiration Date']}>
        {data.map((row, i) =>
          <tr key={i}>
            {row.map((value, j) =>
              <td key={j}>{value}</td>
            )}
          </tr>
        )}
      </Table>
    </Card>
  </>
}

