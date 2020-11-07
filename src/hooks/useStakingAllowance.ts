import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useLod from './useLod'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getsDistributorContract } from '../lod/utils'

const useStakingAllowance = (tokenContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const sDistributor = getsDistributorContract(lod)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(tokenContract, sDistributor, account)
    setAllowance(new BigNumber(allowance))
  }, [account, sDistributor, tokenContract])

  useEffect(() => {
    if (account && sDistributor && tokenContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, fetchAllowance, sDistributor, tokenContract])

  return allowance
}

export default useStakingAllowance
