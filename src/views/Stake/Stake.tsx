import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import useLod from '../../hooks/useLod'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'
import { getMasterChefContract } from '../../lod/utils'

import Harvest from './components/Harvest'
import EtanolHarvest from './components/EtanolHarvest'
import Stake from './components/Stake'

import Spacer from '../../components/Spacer'

import FarmCards from './components/FarmCards'

const Farm: React.FC = () => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  //const { farmId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm('LOD') || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const lod = useLod()
  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  const { onRedeem } = useRedeem(getMasterChefContract(lod))

  const tokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon="🌽"
            title="Staking LOD"
            subtitle="stake LOD to earn extra LOD."
          />
          <StyledFarm>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Harvest pid={pid} />
              </StyledCardWrapper>
              <Spacer />
              <StyledCardWrapper>
                <Stake
                  tokenContract={tokenContract}
                  pid={pid}
                  tokenName={lpToken.toUpperCase()}
                />
              </StyledCardWrapper>
            </StyledCardsWrapper>
            <Spacer size="lg" />
            <StyledInfo>
              ⭐️ Every time you stake and unstake LOD tokens, the contract will
              automagically distribute LOD rewards for you!
            </StyledInfo>
            <Spacer size="lg" />
          </StyledFarm>
        </>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onPresentWalletProviderModal}
            text="🔓 Unlock Wallet"
          />
        </div>
      )}
    </Page>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
