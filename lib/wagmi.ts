import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'

export const monadTestnet = defineChain({
  id: 41454,
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://explorer.testnet.monad.xyz',
    },
  },
  testnet: true,
})

// WalletConnect requires a non-empty projectId. Set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env (get one at cloud.walletconnect.com).
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'e806f081b29f56b0637633730693b87a'

export const config = getDefaultConfig({
  appName: 'FitArena',
  projectId,
  chains: [monadTestnet],
  ssr: true,
})
