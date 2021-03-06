import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useLod from './useLod'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getlDistributorContract } from '../lod/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const lod = useLod()
  const lDistributor = getlDistributorContract(lod)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(lpContract, lDistributor, account)
    setAllowance(new BigNumber(allowance))
  }, [account, lDistributor, lpContract])

  useEffect(() => {
    if (account && lDistributor && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, fetchAllowance, lDistributor, lpContract])

  return allowance
}

export default useAllowance
