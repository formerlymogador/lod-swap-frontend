import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { stake, getsDistributorContract } from '../lod/utils'

const useStakingStake = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getsDistributorContract(lod),
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

export default useStakingStake
