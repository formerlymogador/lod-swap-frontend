import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const farms = getFarms(lod)
  const masterChefContract = getMasterChefContract(lod)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, lod])

  useEffect(() => {
    if (account && masterChefContract && lod) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, lod])

  return balances
}

export default useAllEarnings
