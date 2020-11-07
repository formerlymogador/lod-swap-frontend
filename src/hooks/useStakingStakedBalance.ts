import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getsDistributorContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useStakingStakedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const lod = useLod()
  const sDistributor = getsDistributorContract(lod)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(sDistributor, account)
    setBalance(new BigNumber(balance))
  }, [sDistributor, account])

  useEffect(() => {
    if (account && lod) {
      fetchBalance()
    }
  }, [account, setBalance, block, lod, fetchBalance])

  return balance
}

export default useStakingStakedBalance
