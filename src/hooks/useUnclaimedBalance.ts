import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getUnclaimed, getmDistributorContract } from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useUnclaimedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const lod = useLod()
  const mDistributor = getmDistributorContract(lod)
  const block = useBlock()
  const fetchBalance = useCallback(async () => {
    const balance = await getUnclaimed(mDistributor, account)
    setBalance(new BigNumber(balance))
  }, [account, mDistributor])

  useEffect(() => {
    if (account && lod) {
      fetchBalance()
    }
  }, [account, setBalance, block, lod, fetchBalance])

  return balance
}

export default useUnclaimedBalance
