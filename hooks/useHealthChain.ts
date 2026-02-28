'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI, isContractConfigured } from '@/lib/contract'
import type { ChainChallenge, ChainParticipant } from '@/types'

/** Strip " MON" suffix so parseEther gets a valid decimal string (e.g. "1.0000 MON" -> "1.0000"). */
function toEtherString(value: string): string {
  return value.replace(/\s*MON\s*$/i, '').trim() || '0'
}

// ============================================
// Write hook – create, join, check-in, claim
// ============================================

export function useHealthChain() {
  const { address, isConnected } = useAccount()
  const { writeContractAsync, isPending, error } = useWriteContract()
  const [lastTxHash, setLastTxHash] = useState<`0x${string}` | undefined>()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: lastTxHash,
  })

  const createChallenge = async (name: string, stakeAmount: string, durationDays: number) => {
    const tx = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'createChallenge',
      args: [name, parseEther(toEtherString(stakeAmount)), BigInt(durationDays)],
    })
    setLastTxHash(tx)
    return tx
  }

  const joinChallenge = async (challengeId: number, stakeAmount: string) => {
    const tx = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'joinChallenge',
      args: [BigInt(challengeId)],
      value: parseEther(toEtherString(stakeAmount)),
    })
    setLastTxHash(tx)
    return tx
  }

  const checkIn = async (challengeId: number, day: number) => {
    const tx = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'checkIn',
      args: [BigInt(challengeId), BigInt(day)],
    })
    setLastTxHash(tx)
    return tx
  }

  const claimReward = async (challengeId: number) => {
    const tx = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'claimReward',
      args: [BigInt(challengeId)],
    })
    setLastTxHash(tx)
    return tx
  }

  return {
    address,
    isConnected,
    createChallenge,
    joinChallenge,
    checkIn,
    claimReward,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    lastTxHash,
  }
}

// ============================================
// Read hooks
// ============================================

export function useChallengeCount() {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'challengeCounter',
    query: { enabled: isContractConfigured },
  })
  return {
    count: data !== undefined ? Number(data) : 0,
    isLoading: isContractConfigured ? isLoading : false,
    error,
  }
}

export function useChallenge(challengeId: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getChallenge',
    args: [BigInt(challengeId)],
    query: {
      enabled: isContractConfigured && challengeId >= 0,
      refetchInterval: 10_000,
    },
  })
  return {
    challenge: (data as ChainChallenge | undefined) ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function useParticipant(challengeId: number, userAddress: string | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getParticipant',
    args: userAddress ? [BigInt(challengeId), userAddress as `0x${string}`] : undefined,
    query: {
      enabled: isContractConfigured && !!userAddress && challengeId >= 0,
      refetchInterval: 10_000,
    },
  })
  return {
    participant: (data as ChainParticipant | undefined) ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function useHasCheckedIn(challengeId: number, userAddress: string | undefined, day: number | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasCheckedIn',
    args:
      userAddress !== undefined && day !== undefined
        ? [BigInt(challengeId), userAddress as `0x${string}`, BigInt(day)]
        : undefined,
    query: {
      enabled: isContractConfigured && !!userAddress && day !== undefined && day >= 1 && challengeId >= 0,
    },
  })
  return {
    hasCheckedIn: data === true,
    isLoading,
    error,
  }
}

export function useParticipantCount(challengeId: number) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getParticipantCount',
    args: [BigInt(challengeId)],
    query: { enabled: isContractConfigured && challengeId >= 0 },
  })
  return {
    count: data !== undefined ? Number(data) : 0,
    isLoading: isContractConfigured ? isLoading : false,
    error,
  }
}

export function useParticipantAt(challengeId: number, index: number) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getParticipantAt',
    args: [BigInt(challengeId), BigInt(index)],
    query: { enabled: isContractConfigured && challengeId >= 0 && index >= 0 },
  })
  return {
    address: (data as `0x${string}` | undefined) ?? null,
    isLoading,
    error,
  }
}

const MAX_CHALLENGES = 30

/** Returns challenges from chain (0 to min(count, MAX_CHALLENGES)-1). Fixed hook count for React rules. */
export function useAllChallenges() {
  const { count, isLoading: countLoading } = useChallengeCount()
  const safeCount = Math.min(Math.max(0, count), MAX_CHALLENGES)
  const r0 = useChallenge(0)
  const r1 = useChallenge(1)
  const r2 = useChallenge(2)
  const r3 = useChallenge(3)
  const r4 = useChallenge(4)
  const r5 = useChallenge(5)
  const r6 = useChallenge(6)
  const r7 = useChallenge(7)
  const r8 = useChallenge(8)
  const r9 = useChallenge(9)
  const r10 = useChallenge(10)
  const r11 = useChallenge(11)
  const r12 = useChallenge(12)
  const r13 = useChallenge(13)
  const r14 = useChallenge(14)
  const r15 = useChallenge(15)
  const r16 = useChallenge(16)
  const r17 = useChallenge(17)
  const r18 = useChallenge(18)
  const r19 = useChallenge(19)
  const r20 = useChallenge(20)
  const r21 = useChallenge(21)
  const r22 = useChallenge(22)
  const r23 = useChallenge(23)
  const r24 = useChallenge(24)
  const r25 = useChallenge(25)
  const r26 = useChallenge(26)
  const r27 = useChallenge(27)
  const r28 = useChallenge(28)
  const r29 = useChallenge(29)
  const all = [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16, r17, r18, r19, r20, r21, r22, r23, r24, r25, r26, r27, r28, r29]
  const challenges = all
    .slice(0, safeCount)
    .map((r, i) => (r.challenge ? { id: i, ...r.challenge } : null))
    .filter(Boolean) as (ChainChallenge & { id: number })[]
  const isLoading = countLoading || all.slice(0, safeCount).some((r) => r.isLoading)
  return { challenges, count: safeCount, isLoading }
}
