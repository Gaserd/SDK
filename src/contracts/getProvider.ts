import { JsonRpcProvider } from '@ethersproject/providers'

import state from './state'
import config from '../config'


const getProvider = (withWalletProvider?: boolean): JsonRpcProvider => {
  // for dev purpose
  if (state.selectedChainId === 1337) {
    return new JsonRpcProvider()
  }

  if (state.walletProvider && withWalletProvider) {
    return state.walletProvider.getSigner() as unknown as JsonRpcProvider
  }

  return new JsonRpcProvider(config.rpcUrl)
}

export default getProvider
