import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStakingEarned, getsDistributorContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useStakingEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const sDistributor = getsDistributorContract(lod)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStakingEarned(sDistributor, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, sDistributor, pid])

  useEffect(() => {
    if (account && sDistributor && lod) {
      fetchBalance()
    }
  }, [account, block, sDistributor, setBalance, lod, fetchBalance])

  return balance
}

export default useStakingEarnings
