import { useCallback } from 'react'

import useLod from './useLod'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getsDistributorContract } from '../lod/utils'

const useStakingApprove = (tokenContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const sDistributor = getsDistributorContract(lod)
  console.log(sDistributor)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, sDistributor, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, tokenContract, sDistributor])

  return { onApprove: handleApprove }
}

export default useStakingApprove
