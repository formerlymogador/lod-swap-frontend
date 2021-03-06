import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getlDistributorContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const lDistributor = getlDistributorContract(lod)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(lDistributor, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, lDistributor, pid])

  useEffect(() => {
    if (account && lDistributor && lod) {
      fetchBalance()
    }
  }, [account, block, lDistributor, setBalance, lod, fetchBalance])

  return balance
}

export default useEarnings
