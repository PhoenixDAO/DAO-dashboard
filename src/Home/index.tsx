import React from 'react'
import {Columns, SmallColumn, WideColumn} from 'Shared/Grid'
import Card from 'Shared/Card'

export default () =>
  <Columns>
    <SmallColumn>
      <Card title='Latest Proposals'>

      </Card>
      <Card title='Voting Results'>

      </Card>
    </SmallColumn>
    <WideColumn>
      <div/>
      <Card title='Transaction History'>

      </Card>
    </WideColumn>
  </Columns>
