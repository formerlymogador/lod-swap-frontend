import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const lod = useLod()
  const masterChefContract = getMasterChefContract(lod)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, lod])

  useEffect(() => {
    if (account && lod) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, lod])

  return balance
}

export default useStakedBalance
