import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'

// Official Monad Testnet chain ID (10143). Using 41454 causes "duplicate RPC" errors when wallet already has Monad Testnet.
export const monadTestnet = defineChain({
  id: 10143,
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
      url: 'https://testnet.monadexplorer.com',
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
