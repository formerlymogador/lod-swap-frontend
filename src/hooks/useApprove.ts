import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getlDistributorContract } from '../lod/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const lDistributor = getlDistributorContract(lod)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, lDistributor, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, lDistributor])

  return { onApprove: handleApprove }
}

export default useApprove
