import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../lod/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()
  const masterChefContract = getMasterChefContract(lod)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, lod])

  return { onReward: handleReward }
}

export default useReward
