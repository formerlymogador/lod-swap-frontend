import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Lod } from '../../lod'

export interface LodContext {
  lod?: typeof Lod
}

export const Context = createContext<LodContext>({
  lod: undefined,
})

declare global {
  interface Window {
    lodsauce: any
  }
}

const LodProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [lod, setLod] = useState<any>()

  // @ts-ignore
  window.lod = lod
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const lodLib = new Lod(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setLod(lodLib)
      window.lodsauce = lodLib
    }
  }, [ethereum])

  return <Context.Provider value={{ lod }}>{children}</Context.Provider>
}

export default LodProvider
