import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { harvest, getsDistributorContract } from '../lod/utils'

const useStakingReward = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()
  const sDistributor = getsDistributorContract(lod)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(sDistributor, pid, account)
    console.log(txHash)
    return txHash
  }, [sDistributor, pid, account])

  return { onReward: handleReward }
}

export default useStakingReward
