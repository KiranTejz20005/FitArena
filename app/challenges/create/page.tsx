'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChallengeDetailsForm, StakeRewardsForm } from '@/components/challenges/create-form'
import { useHealthChain } from '@/hooks/useHealthChain'
import { Activity, Zap, Rocket, ShieldCheck, PlusCircle, ArrowLeft } from 'lucide-react'

const initialForm = {
  name: '',
  stakeAmount: '',
  durationDays: '30',
}

export default function CreateChallengePage() {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState<string | null>(null)
  const { createChallenge, isPending, isConfirming, isConfirmed, isConnected, isMonadTestnet } = useHealthChain()

  useEffect(() => {
    if (isConfirmed) {
      router.push('/challenges')
    }
  }, [isConfirmed, router])

  const handleSubmit = async () => {
    setError(null)
    const name = form.name.trim()
    const stake = form.stakeAmount.trim()
    const duration = form.durationDays.trim()
    if (!name) {
      setError('Enter a challenge name')
      return
    }
    const stakeNum = parseFloat(stake)
    if (Number.isNaN(stakeNum) || stakeNum < 0.5) {
      setError('Stake must be at least 0.5 MON')
      return
    }
    const days = parseInt(duration, 10)
    if (Number.isNaN(days) || days < 1 || days > 365) {
      setError('Duration must be between 1 and 365 days')
      return
    }
    if (!isConnected) {
      setError('Connect your wallet first')
      return
    }
    try {
      await createChallenge(name, stake, days)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create challenge')
    }
  }

  const loading = isPending || isConfirming
  const valid = form.name.trim().length > 0 && parseFloat(form.stakeAmount) >= 0.5 && form.durationDays.length > 0

  return (
    <div className="pb-20 min-w-0">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 min-w-0">
        <div className="mb-10 sm:mb-16">
          <Link href="/challenges" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-fuchsia-400 transition-colors mb-6 sm:mb-10">
            <ArrowLeft className="w-4 h-4 shrink-0" /> Back to Arena
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tight mb-3 sm:mb-4">Launch Arena</h1>
          <p className="text-white/40 text-sm sm:text-lg font-medium">Design your battlefield. Set the stakes. Invite the squad.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12">
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-fuchsia-400" />
                </div>
                <h2 className="text-xl font-bold uppercase italic tracking-tight">Challenge Details</h2>
              </div>
              <ChallengeDetailsForm
                value={{ name: form.name, durationDays: form.durationDays }}
                onChange={(v) => setForm((prev) => ({ ...prev, ...v }))}
              />
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-hc-green/10 border border-hc-green/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-hc-green" />
                </div>
                <h2 className="text-xl font-bold uppercase italic tracking-tight">Stake & Rewards</h2>
              </div>
              <StakeRewardsForm value={form.stakeAmount} onChange={(stakeAmount) => setForm((prev) => ({ ...prev, stakeAmount }))} />
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-hc-amber/10 border border-hc-amber/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-hc-amber" />
                </div>
                <h2 className="text-xl font-bold uppercase italic tracking-tight">Verification Method</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'photo', name: 'Photo Proof', icon: <PlusCircle className="w-5 h-5" />, desc: 'AI-verified image check-ins' },
                  { id: 'wearable', name: 'Wearable Sync', icon: <Activity className="w-5 h-5" />, desc: 'Apple Health/Google Fit integration' },
                ].map((method) => (
                  <div key={method.id} className="glass p-6 border-white/5 cursor-pointer hover:border-fuchsia-500/30 transition-all group relative overflow-hidden">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:text-fuchsia-400">
                        {method.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold mb-1">{method.name}</div>
                        <div className="text-[10px] font-medium text-white/30 uppercase tracking-widest">{method.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-10 flex flex-col gap-6">
              {isConnected && !isMonadTestnet && (
                <p className="text-hc-amber text-sm text-center">Switch to Monad Testnet to pay in MON. You&apos;ll be prompted when you click Deploy.</p>
              )}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <Button
                onClick={handleSubmit}
                disabled={!isConnected || !valid || loading}
                className="btn-primary h-16 w-full text-lg font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'Confirm in wallet...' : 'Deploy Challenge'} <Rocket className="w-6 h-6" />
              </Button>
              <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                Powered by Monad Network • Estimated Gas: ~0.002 MON
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
