import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import LodIcon from '../../../components/LodIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useRemainingReward from '../../../hooks/useRemainingReward'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnclaimedBalance from '../../../hooks/useUnclaimedBalance'
import useLod from '../../../hooks/useLod'
import { getlodAddress, getLodSupply } from '../../../lod/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'

const Balances: React.FC = () => {
  //const [reward, setReward] = useState<BigNumber>()
  const lod = useLod()
  const lodBalance = useTokenBalance(getlodAddress(lod))
  const unclaimed = useUnclaimedBalance()
  const reward = useRemainingReward()

  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  /*
  useEffect(() => {
    async function fetchReward() {
      const supply = await getLodSupply(lod)
      setReward(supply)
    }
    if (lod) {
      fetchReward()
    }
  }, [lod, setReward])
  */

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <LodIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your LOD Balance" />
                <Value
                  value={!!account ? getBalanceNumber(lodBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Unclaimed LOD From NFT Trading
          <FootnoteValue>
            {!!account ? getBalanceNumber(unclaimed) : 'Locked'} LOD
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <Label text="Remaining LOD rewards" />
          <Value value={!!account ? getBalanceNumber(reward) : 'Locked'} />
        </CardContent>
        <Footnote>
          Total LOD Supply
          <FootnoteValue>210,000,000 LOD</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
