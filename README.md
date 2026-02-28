# FitArena 🏃‍♂️🔗

> **Stake. Complete. Earn.**
> A blockchain-powered fitness accountability platform built on the Monad network.

FitArena is a decentralized application (dApp) designed to help users stick to their fitness goals through financial accountability. Users join challenges by staking cryptocurrency, check in daily, and earn rewards for completing the challenge. Those who quit early lose their stake, which is distributed among the winners.

Built for the **Monad Blitz Hackathon**.

---

## ✨ Features

- **Crypto Staking**: Put your money where your mouth is. Join fitness challenges by staking cryptocurrency.
- **Daily Check-ins**: Tamper-proof, on-chain daily check-ins to track your progress.
- **Automated Rewards**: Smart contracts automatically distribute the prize pool (quitters' stakes) to the winners who complete the challenge.
- **Instant Transactions**: Built on the Monad blockchain for lightning-fast (0.8s finality) and near zero-fee interactions.
- **Platform Fee**: A built-in 5% platform fee from the total prize pool.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Web3 & Blockchain

- **Blockchain**: [Monad Testnet](https://monad.xyz/)
- **Smart Contracts**: [Solidity](https://soliditylang.org/) (\`^0.8.20\`)
- **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/)
- **Ethereum Interactions**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/)

### Deployment

- **Frontend Hosting**: [Vercel](https://vercel.com/)
- **Smart Contract Deployment**: Hardhat / Remix IDE

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask browser extension installed & configured with Monad Testnet
- Testnet MON tokens

### 1. Clone & Install Dependencies

\`\`\`bash
git clone <repository-url>
cd fitarena
npm install
\`\`\`

### 2. Environment Setup

Configure your WalletConnect Project ID in \`app/providers.tsx\` to enable Wallet Connections.

1. Get a free project ID at [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Add it to the \`getDefaultConfig\` setup.

### 3. Smart Contract Setup & Configuration

The smart contract needs to be deployed to the Monad testnet.

1. Navigate to Remix IDE or use the local Hardhat setup.
2. Deploy \`contracts/HealthChallenge.sol\`.
3. Copy the deployed contract address.
4. Open \`lib/contract.ts\` and update the \`CONTRACT_ADDRESS\` variable:
\`\`\`typescript
export const CONTRACT_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS' as \`0x\${string}\`;
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📁 Project Structure

\`\`\`text
fitarena/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # User dashboard & progress tracking
│   ├── challenge/[id]/   # Dynamic challenge details page
│   ├── create/           # Form to create new challenges
│   ├── layout.tsx        # Root layout with Web3 providers
│   └── page.tsx          # Homepage rendering challenge grid
├── components/           # Reusable React components (Navbar, ChallengeCard, CheckInButton)
├── contracts/            # Solidity smart contracts
├── hooks/                # Custom React Hooks (useHealthChain for wagmi wrapping)
├── lib/                  # Utility functions and Contract ABI/Address config
└── types/                # TypeScript interface definitions
\`\`\`

---

## 🔮 How it Works

1. **Create a Challenge**: Any user can create a challenge, defining the name, required stake amount (in MON), and duration (in days).
2. **Join the Challenge**: Participants stake the required MON to join before they start their daily check-ins.
3. **Daily Check-ins**: Participants log their progress daily by submitting an on-chain transaction.
4. **Completion & Rewards**: At the end of the duration, participants who successfully checked in every day can claim their share of the total prize pool (minus a 5% platform fee).

---

## 📜 Smart Contract Security Notes

- Simple, straightforward architecture avoiding complex DeFi mechanics.
- Incorporates basic reentrancy protection and strict input validation.
- Owner-only administrative functions for platform fee adjustment.

---

*This project was built for the Monad Blitz Hackathon. Do not use testnet contracts on mainnet with real funds without a professional audit.*
