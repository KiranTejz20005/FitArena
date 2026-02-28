// ============================================
// CONTRACT CONFIGURATION
// ============================================
// Update CONTRACT_ADDRESS after deploying to Monad Testnet (e.g. via Remix).

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ZERO_ADDRESS) as `0x${string}`

/** When false, contract reads are disabled so the app still loads without a deployed contract. */
export const isContractConfigured = Boolean(
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS &&
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS !== ZERO_ADDRESS
)

export const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'challengeCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_challengeId', type: 'uint256' }],
    name: 'getChallenge',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'uint256', name: 'stakeAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'durationDays', type: 'uint256' },
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'totalStaked', type: 'uint256' },
          { internalType: 'uint256', name: 'participantCount', type: 'uint256' },
          { internalType: 'address', name: 'creator', type: 'address' },
          { internalType: 'bool', name: 'isActive', type: 'bool' },
        ],
        internalType: 'struct HealthChallenge.Challenge',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_challengeId', type: 'uint256' },
      { internalType: 'address', name: '_user', type: 'address' },
    ],
    name: 'getParticipant',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'stakedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'checkInCount', type: 'uint256' },
          { internalType: 'bool', name: 'hasCompleted', type: 'bool' },
          { internalType: 'bool', name: 'rewardClaimed', type: 'bool' },
        ],
        internalType: 'struct HealthChallenge.Participant',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_challengeId', type: 'uint256' }],
    name: 'getParticipantCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_challengeId', type: 'uint256' },
      { internalType: 'uint256', name: '_index', type: 'uint256' },
    ],
    name: 'getParticipantAt',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_challengeId', type: 'uint256' },
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'uint256', name: '_day', type: 'uint256' },
    ],
    name: 'hasCheckedIn',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'uint256', name: '_stakeAmount', type: 'uint256' },
      { internalType: 'uint256', name: '_durationDays', type: 'uint256' },
    ],
    name: 'createChallenge',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_challengeId', type: 'uint256' }],
    name: 'joinChallenge',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_challengeId', type: 'uint256' },
      { internalType: 'uint256', name: '_day', type: 'uint256' },
    ],
    name: 'checkIn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_challengeId', type: 'uint256' }],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'stakeAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'durationDays', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'creator', type: 'address' },
    ],
    name: 'ChallengeCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'participant', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'ParticipantJoined',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'participant', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'day', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'totalCheckIns', type: 'uint256' },
    ],
    name: 'CheckInRecorded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'challengeId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'participant', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'RewardClaimed',
    type: 'event',
  },
] as const;
