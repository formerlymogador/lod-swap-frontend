import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'

import { claim, getmDistributorContract } from '../lod/utils'

const useClaim = () => {
  const { account } = useWallet()
  const lod = useLod()
  const mDistributor = getmDistributorContract(lod)
  console.log(mDistributor)
  const handleClaim = useCallback(async () => {
    try {
      const txHash = await claim(mDistributor, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, mDistributor])

  return { onClaim: handleClaim }
}

export default useClaim
