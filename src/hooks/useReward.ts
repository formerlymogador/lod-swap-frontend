import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { harvest, getlDistributorContract } from '../lod/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()
  const lDistributor = getlDistributorContract(lod)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(lDistributor, pid, account)
    console.log(txHash)
    return txHash
  }, [lDistributor, pid, account])

  return { onReward: handleReward }
}

export default useReward
