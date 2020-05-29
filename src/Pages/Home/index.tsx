import React from 'react'
import {Columns, SmallColumn, WideColumn} from 'Shared/Grid'
import Card from 'Shared/Card'
import Table from 'Shared/Table'
import Font from 'Shared/Font'
import PieChart from 'Shared/PieChart'

const chartData = [
  {
    title: 'Community Airdrop, HYDRO Holders',
    value: 40,
    color: '#5F64EC',
  },
  {
    title: 'Phoenix DAO Foundation',
    value: 30,
    color: '#E39D42',
  },
  {
    title: 'DAO rewards',
    value: 15,
    color: '#B09CFF',
  },
  {
    title: 'DAO Fund',
    value: 15,
    color: '#52C92F',
  },
]

export default () => {
  return <Columns>
    <SmallColumn>
      <Card title='Latest Proposals'>
        <Table compact>
          <tr>
            <td>Build Amazon Marketplace dApp</td>
            <td>06/28/20</td>
          </tr>
          <tr>
            <td>Build DEX aggregator</td>
            <td>07/03/20</td>
          </tr>
          <tr>
            <td>1,000,000 tokens for exchange listing</td>
            <td>07/09/20</td>
          </tr>
          <tr>
            <td>Build ZK proof storage contracts</td>
            <td>07/15/20</td>
          </tr>
          <tr>
            <td>Start unbanked marketing initiative</td>
            <td>08/01/20</td>
          </tr>
        </Table>
      </Card>
      <Card title='Voting Results'>
        <Table compact>
          <tr>
            <td>06/21/20</td>
            <td>Build messaging dApp</td>
            <td><Font color='success'>Passed</Font></td>
          </tr>
          <tr>
            <td>06/19/20</td>
            <td>Fund a checkers dApp</td>
            <td>Failed</td>
          </tr>
          <tr>
            <td>06/15/20</td>
            <td>Fund Exchange Listing</td>
            <td><Font color='success'>Passed</Font></td>
          </tr>
          <tr>
            <td>05/18/20</td>
            <td>Fund social marketing</td>
            <td><Font color='success'>Passed</Font></td>
          </tr>
          <tr>
            <td>05/12/20</td>
            <td>Fund a gambling dApp</td>
            <td>Failed</td>
          </tr>
        </Table>
      </Card>
    </SmallColumn>
    <WideColumn>
      <PieChart
        lineWidth={50}
        data={chartData}
      />
      <Card title='Transaction History'>
        <Table compact columns={['Type', 'Use', 'Amount', 'Date']}>
          <tr>
            <td>Foundation</td>
            <td>DAO Developers</td>
            <td>1,500,000</td>
            <td>06/29/20</td>
          </tr>
          <tr>
            <td>DAO Rewards</td>
            <td>Community Vote</td>
            <td>345,613</td>
            <td>06/19/20</td>
          </tr>
          <tr>
            <td>Foundation</td>
            <td>Storage Protocol</td>
            <td>745,000</td>
            <td>06/15/20</td>
          </tr>
          <tr>
            <td>DOA Rewards</td>
            <td>Community Vote</td>
            <td>289,477</td>
            <td>05/18/20</td>
          </tr>
        </Table>
      </Card>
    </WideColumn>
  </Columns>
}
