import React from 'react'
import Font from 'Shared/Font'
import Card from "Shared/Card"
import Table from "Shared/Table"
import {Columns} from 'Shared/Grid'

const upcoming = [
  [
    'Amazon dApp build',
    'Vote Now',
  ],
  [
    'Uber replacement dApp',
    '08/01/2020',
  ],
  [
    'Facebook dApp build',
    '08/01/2020',
  ],
  [
    'Youtube dApp build',
    '09/01/2020',
  ],
  [
    'Whatsapp dApp build',
    '09/01/2020',
  ],
  [
    'DEX aggregator build',
    '09/01/2020',
  ],
  [
    'Gamer Marketplace build',
    '09/01/2020',
  ],
  [
    'Tokenization dApp build',
    '10/01/2020',
  ],
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

export default () =>
  <Columns>
    <Card title='Upcoming Votes'>
      <Table columns={['Proposal', 'Voting Day']}>
        {upcoming.map((row, i) =>
          <tr key={i}>
            {row.map((value, j) =>
              <td key={j}>{value}</td>
            )}
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
