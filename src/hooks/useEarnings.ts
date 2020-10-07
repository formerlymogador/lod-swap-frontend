import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const masterChefContract = getMasterChefContract(lod)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, lod])

  useEffect(() => {
    if (account && masterChefContract && lod) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, lod])

  return balance
}

export default useEarnings
