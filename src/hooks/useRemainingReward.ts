import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import {
  getLodContract,
  getRemainingReward,
  getTreasuryAddress,
} from '../lod/utils'
import useLod from './useLod'
import useBlock from './useBlock'

const useRemainingReward = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const lod = useLod()
  const lodContract = getLodContract(lod)
  const treasuryAddress = getTreasuryAddress(lod)
  const block = useBlock()
  const fetchBalance = useCallback(async () => {
    const balance = await getRemainingReward(lodContract, treasuryAddress)
    setBalance(new BigNumber(balance))
  }, [lodContract, treasuryAddress])

  useEffect(() => {
    if (lod) {
      fetchBalance()
    }
  }, [setBalance, block, lod, fetchBalance])

  return balance
}

export default useRemainingReward
