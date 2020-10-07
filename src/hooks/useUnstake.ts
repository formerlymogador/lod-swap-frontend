import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../lod/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()
  const masterChefContract = getMasterChefContract(lod)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, lod],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
