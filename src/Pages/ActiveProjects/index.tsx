import React from 'react'
import Card from "Shared/Card"
import Table from "Shared/Table"

const data = [
  [
    'Amazon dApp build',
    'Milestone 3/5',
    '09/30/2020',
  ],
  [
    'Gamer dApp build',
    'Milestone 3/5',
    '09/30/2020',
  ],
  [
    'Youtube dApp build',
    'Milestone 2/5',
    '09/30/2020',
  ],
  [
    'Facebook dApp build',
    'Milestone 2/5',
    '09/30/2020',
  ],
  [
    'WhatsApp dApp build',
    'Milestone 2/5',
    '09/30/2020',
  ],
  [
    'DEX dApp build',
    'Milestone 2/5',
    '09/30/2020',
  ],
  [
    'Uber dApp build',
    'Milestone 1/5',
    '09/30/2020',
  ],
  [
    'Tokenization dApp build',
    'Milestone 3/5',
    '09/30/2020',
  ],
]

export default () =>
  <Card title='Active Projects'>
    <Table columns={['Active Project', 'Status', 'Est. Completion Date']}>
      {data.map((row, i) =>
        <tr key={i}>
          {row.map((value, j) =>
            <td key={j}>{value}</td>
          )}
        </tr>
      )}
    </Table>
  </Card>
