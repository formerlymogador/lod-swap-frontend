import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getlDistributorContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useStakedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const lod = useLod()
  const lDistributor = getlDistributorContract(lod)
  const block = useBlock()
  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(lDistributor, account)
    setBalance(new BigNumber(balance))
  }, [lDistributor, account])

  useEffect(() => {
    if (account && lod) {
      fetchBalance()
    }
  }, [account, setBalance, block, lod, fetchBalance])

  return balance
}

export default useStakedBalance
