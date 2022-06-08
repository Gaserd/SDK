import { ContractsData } from './contracts'
import CoreABI from './abis/Core.json'
import LpABI from './abis/Lp.json'
import AzuroBetABI from './abis/AzuroBet.json'
import TestERC20ABI from './abis/TestERC20.json'


export const CONTRACTS: ContractsData = {
  core: {
    address: '0xEf182ba80c2DA39710Fe0834b5Ac2E8e68820704',
    abi: CoreABI,
    decimals: 18,
  },
  lp: {
    address: '0x03792012947c6AC35C3B65eAd42E9edd9B7eD6c4',
    abi: LpABI,
    decimals: 18,
  },
  bet: {
    address: '0x4F0Dc3aAD27379E78C0777f66a07c2ba61B66C71',
    abi: AzuroBetABI,
    decimals: 18,
  },
  usdt: {
    address: '0xf5f125ffFFe359f2Bfe44776B5604eDFa82A0Ff2',
    abi: TestERC20ABI,
    decimals: 18,
  },
}
