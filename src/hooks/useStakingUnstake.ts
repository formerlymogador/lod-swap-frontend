import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { unstake, getsDistributorContract } from '../lod/utils'

const useStakingUnstake = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()
  const sDistributor = getsDistributorContract(lod)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(sDistributor, pid, amount, account)
      console.log(txHash)
    },
    [sDistributor, pid, account],
  )

  return { onUnstake: handleUnstake }
}

export default useStakingUnstake
