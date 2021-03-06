import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { unstake, getlDistributorContract } from '../lod/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const lod = useLod()
  const lDistributor = getlDistributorContract(lod)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(lDistributor, pid, amount, account)
      console.log(txHash)
    },
    [lDistributor, pid, account],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
