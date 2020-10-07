import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../lod/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(lod),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, lod],
  )

  return { onStake: handleStake }
}

export default useStake
