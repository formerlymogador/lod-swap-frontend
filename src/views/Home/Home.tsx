import React, { useState } from 'react'
import { useWallet } from 'use-wallet'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import useLod from '../../hooks/useLod'
import useClaim from '../../hooks/useClaim'

const Home: React.FC = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const lod = useLod()
  const { account }: { account: any; ethereum: any } = useWallet()
  const { onClaim } = useClaim()
  return (
    <Page>
      <PageHeader
        icon="🌽"
        title="LOD Party!"
        subtitle="Use Los dorados and claim LOD token!"
      />
      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: you can yield more LOD by providing liquidty to
        Uniswap and staking LODs.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        {account ? (
          <Button
            text="Claim LOD"
            variant="secondary"
            onClick={async () => {
              setPendingTx(true)
              await onClaim()
              setPendingTx(false)
            }}
          />
        ) : (
          <div />
        )}
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.white};
  }
`

export default Home
