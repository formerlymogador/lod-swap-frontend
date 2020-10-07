import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useLod from '../../hooks/useLod'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../lod/utils'
import { getFarms } from '../../lod/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const lod = useLod()
  const { account } = useWallet()

  const farms = getFarms(lod)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
