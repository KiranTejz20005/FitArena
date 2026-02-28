'use client'

import { useMemo, useState, useRef } from 'react'
import { useHasCheckedIn } from '@/hooks/useHealthChain'
import { ProgressCalendar } from '@/components/challenges/progress-calendar'
import { getCurrentDay } from '@/lib/challenge-utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ImagePlus } from 'lucide-react'

const MAX_DAYS = 31

interface ChallengeProgressCalendarProps {
  challengeId: number
  userAddress: string | undefined
  startTime: bigint
  durationDays: number
  onCheckIn?: (day: number) => Promise<void>
  refetch?: () => void
}

export function ChallengeProgressCalendar({ challengeId, userAddress, startTime, durationDays, onCheckIn, refetch }: ChallengeProgressCalendarProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const d1 = useHasCheckedIn(challengeId, userAddress, 1)
  const d2 = useHasCheckedIn(challengeId, userAddress, 2)
  const d3 = useHasCheckedIn(challengeId, userAddress, 3)
  const d4 = useHasCheckedIn(challengeId, userAddress, 4)
  const d5 = useHasCheckedIn(challengeId, userAddress, 5)
  const d6 = useHasCheckedIn(challengeId, userAddress, 6)
  const d7 = useHasCheckedIn(challengeId, userAddress, 7)
  const d8 = useHasCheckedIn(challengeId, userAddress, 8)
  const d9 = useHasCheckedIn(challengeId, userAddress, 9)
  const d10 = useHasCheckedIn(challengeId, userAddress, 10)
  const d11 = useHasCheckedIn(challengeId, userAddress, 11)
  const d12 = useHasCheckedIn(challengeId, userAddress, 12)
  const d13 = useHasCheckedIn(challengeId, userAddress, 13)
  const d14 = useHasCheckedIn(challengeId, userAddress, 14)
  const d15 = useHasCheckedIn(challengeId, userAddress, 15)
  const d16 = useHasCheckedIn(challengeId, userAddress, 16)
  const d17 = useHasCheckedIn(challengeId, userAddress, 17)
  const d18 = useHasCheckedIn(challengeId, userAddress, 18)
  const d19 = useHasCheckedIn(challengeId, userAddress, 19)
  const d20 = useHasCheckedIn(challengeId, userAddress, 20)
  const d21 = useHasCheckedIn(challengeId, userAddress, 21)
  const d22 = useHasCheckedIn(challengeId, userAddress, 22)
  const d23 = useHasCheckedIn(challengeId, userAddress, 23)
  const d24 = useHasCheckedIn(challengeId, userAddress, 24)
  const d25 = useHasCheckedIn(challengeId, userAddress, 25)
  const d26 = useHasCheckedIn(challengeId, userAddress, 26)
  const d27 = useHasCheckedIn(challengeId, userAddress, 27)
  const d28 = useHasCheckedIn(challengeId, userAddress, 28)
  const d29 = useHasCheckedIn(challengeId, userAddress, 29)
  const d30 = useHasCheckedIn(challengeId, userAddress, 30)
  const d31 = useHasCheckedIn(challengeId, userAddress, 31)
  const checks = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31]

  const currentDay = useMemo(() => getCurrentDay(startTime, durationDays), [startTime, durationDays])
  const streak = useMemo(() => {
    let count = 0
    for (let i = 0; i < Math.min(durationDays, checks.length); i++) {
      if (checks[i]?.hasCheckedIn) count++
      else break
    }
    return count
  }, [durationDays, checks])

  const days = useMemo(() => {
    const len = Math.min(durationDays, MAX_DAYS)
    return Array.from({ length: len }, (_, i) => {
      const day = i + 1
      const checked = checks[i]?.hasCheckedIn ?? false
      let status: 'completed' | 'today' | 'upcoming' = 'upcoming'
      if (checked) status = 'completed'
      else if (day === currentDay) status = 'today'
      return { day, status }
    })
  }, [startTime, durationDays, checks, currentDay])

  const startDate = new Date(Number(startTime) * 1000)
  const monthName = startDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const handleDayClick = (day: number) => {
    const checked = checks[day - 1]?.hasCheckedIn ?? false
    if (checked) return
    setSelectedDay(day)
    setPhotoPreview(null)
    setModalOpen(true)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
  }

  const handleConfirmCheckIn = async () => {
    if (selectedDay == null || !onCheckIn) return
    const canCheckInToday = selectedDay === currentDay
    if (!canCheckInToday) {
      setModalOpen(false)
      return
    }
    setIsSubmitting(true)
    try {
      await onCheckIn(selectedDay)
      refetch?.()
      setModalOpen(false)
      setSelectedDay(null)
      setPhotoPreview(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canConfirmToday = selectedDay === currentDay && onCheckIn

  if (durationDays <= 0) return null

  return (
    <>
      <ProgressCalendar
        days={days}
        monthName={monthName}
        onDayClick={onCheckIn ? handleDayClick : undefined}
        streak={streak}
      />
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Check in — Day {selectedDay}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-white/70">
              Add a photo to log your progress (optional). Only today&apos;s check-in can be submitted on-chain.
            </p>
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <Button
                type="button"
                variant="outline"
                className="border-white/20 text-white/80 hover:bg-white/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="w-4 h-4 mr-2" /> Add photo
              </Button>
              {photoPreview && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-white/5 border border-white/10">
                  <img src={photoPreview} alt="Check-in" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <Button
              className="btn-primary w-full"
              disabled={!canConfirmToday || isSubmitting}
              onClick={handleConfirmCheckIn}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm check-in'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
