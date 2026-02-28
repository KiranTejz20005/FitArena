import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatEther } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// Blockchain utilities
// ============================================

export function formatMON(wei: bigint, decimals: number = 4): string {
  const ether = formatEther(wei)
  const num = parseFloat(ether)
  return `${num.toFixed(decimals)} MON`
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return ''
  if (address.length < chars * 2 + 2) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function calculatePrizePool(totalStaked: bigint, feePercent: number = 5): bigint {
  const fee = (totalStaked * BigInt(feePercent)) / BigInt(100)
  return totalStaked - fee
}
