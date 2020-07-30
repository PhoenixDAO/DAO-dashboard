import React from 'react'
import cn from 'classnames'
import Card from 'Shared/Card'
import Table from 'Shared/AdminTable'
import style from './style.module.scss'

type LatestProposal = {
  proposal: string
  approve: boolean
}

type ProposalForVote = {
  proposal: string
  date: string
}

type VotingResults = {
  proposal: string
  context: string
  percentage: string
  approve: boolean
}

type MilestoneRequested = {
  proposal: string
  milestone: String
  approve: boolean
}

const latestProposals: LatestProposal[] = [  
  {
    proposal: 'Build Amazon Marketplace dApp',
    approve: true
  },
  {
    proposal: 'Build DEX aggregator',
    approve: true
  },
  {
    proposal: '1,000,000 tokens for exchange listing',
    approve: true
  },
  {
    proposal: 'Build ZK proof storage contracts',
    approve: true
  },
  {
    proposal: 'Start unbanked marketing initiative',
    approve: true
  },
]

const proposalsForVote: ProposalForVote[] = [
  {
    proposal: 'Build Amazon Marketplace dApp',
    date: '06/28/20'
  },
  {
    proposal: 'Build DEX aggregator',
    date: '07/03/20'
  },
  {
    proposal: '1,000,000 tokens for exchange listing',
    date: '07/09/20'
  },
  {
    proposal: 'Build ZK proof storage contracts',
    date: '07/15/20'
  },
  {
    proposal: 'Start unbanked marketing initiative',
    date: '08/01/20'
  },
]

const vote: VotingResults[] = [
  {
    proposal: '500,000 PHNX',
    context: 'Build messaging dApp',
    percentage: '62%',
    approve: true
  },
  {
    proposal: '300,000 PHNX',
    context: 'Fund a checkers dApp',
    percentage: '61%',
    approve: true
  },
  {
    proposal: '700,000 PHNX',
    context: 'Fund Exchange Listing',
    percentage: '57%',
    approve: true
  },
  {
    proposal: '800,000 PHNX',
    context: 'Fund social marketing',
    percentage: '62%',
    approve: true
  },
  {
    proposal: '100,000 PHNX',
    context: 'Fund a gambling dApp',
    percentage: '52%',
    approve: true
  }
]

const milestone: MilestoneRequested[] = [
  {
    proposal: 'Build Amazon Marketplace dApp',
    milestone: 'M1',
    approve: true
  },
  {
    proposal: 'Build DEX aggregator',
    milestone: 'M2',
    approve: true
  },
  {
    proposal: '1,000,000 tokens for exchange listing',
    milestone: 'M3',
    approve: true
  },
  {
    proposal: 'Build ZK proof storage contracts',
    milestone: 'M2',
    approve: true
  },
  {
    proposal: 'Start unbanked marketing initiative',
    milestone: 'M4',
    approve: true
  }
]

export default () => {
  const [latestProposaldata, setlatestProposalData] = React.useState(latestProposals)
  const [votedata, setvoteData] = React.useState(vote)
  const [milestonedata, setmilestoneData] = React.useState(milestone)

  const check_latestProposal = (i: number) => {
    latestProposaldata[i].approve = !latestProposaldata[i].approve
    setlatestProposalData([...latestProposaldata])
  }

  const check_vote = (i: number) => {
    votedata[i].approve = !votedata[i].approve
    setvoteData([...votedata])
  }

  const check_milestone = (i: number) => {
    milestonedata[i].approve = !milestonedata[i].approve
    setmilestoneData([...milestonedata])
  }

  return <>
    <div id="scrollContainer" className={style.grid}>
      <Card title='Latest Proposals'>
        <Table compact columns={['Proposal', 'Approve']}>
          {latestProposals.map((item, i) =>
            <tr key={i}>
              <td>{item.proposal}</td>
              <td className={cn(style.listItem, item.approve && style.checked)}>
                <div className={style.toggleButton} onClick={() => check_latestProposal(i)}>{item.approve ? 'Yes' : 'No'}</div>
              </td>
            </tr>
          )}
        </Table>
      </Card>
      <Card title='Proposals Ready for Vote'>
        <Table compact columns={['Proposal', 'Select Date']}>
          {proposalsForVote.map((item, i) =>
            <tr key={i}>
              <td>{item.proposal}</td>
              <td>{item.date}</td>
            </tr>
          )}
        </Table>
      </Card>
      <Card title='Voting Results'>
        <Table compact columns={['Proposal', 'Proposal', '%', 'Approve']}>
            {vote.map((item, i) =>
              <tr key={i}>
                <td>{item.proposal}</td>
                <td>{item.context}</td>
                <td>{item.percentage}</td>
                <td className={cn(style.listItem, item.approve && style.checked)}>
                  <div className={style.toggleButton} onClick={() => check_vote(i)}>{item.approve ? 'Yes' : 'No'}</div>
                </td>
              </tr>
            )}
        </Table>
      </Card>
      <Card title='Milestone Requested'>
        <Table compact columns={['Proposal', 'Milestone', 'Approve']}>
            {milestone.map((item, i) =>
              <tr key={i}>
                <td>{item.proposal}</td>
                <td>{item.milestone}</td>
                <td className={cn(style.listItem, item.approve && style.checked)}>
                  <div className={style.toggleButton} onClick={() => check_milestone(i)}>{item.approve ? 'Yes' : 'No'}</div>
                </td>
              </tr>
            )}
        </Table>
      </Card>
    </div>
  </>
}
