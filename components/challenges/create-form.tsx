import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap } from 'lucide-react'
import type { CreateChallengeForm } from '@/types'

interface ChallengeDetailsFormProps {
  value: Pick<CreateChallengeForm, 'name' | 'durationDays'>
  onChange: (v: Partial<CreateChallengeForm>) => void
}

export function ChallengeDetailsForm({ value, onChange }: ChallengeDetailsFormProps) {
  return (
    <Card className="glass p-4 sm:p-6 border-white/5 space-y-4 sm:space-y-6 min-w-0">
      <div className="space-y-1.5">
        <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Arena Name</Label>
        <Input
          placeholder="e.g. 30 Days of Zen"
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-fuchsia-500/50 transition-all text-sm font-bold"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Duration</Label>
        <Select
          value={value.durationDays}
          onValueChange={(v) => onChange({ durationDays: v })}
        >
          <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-fuchsia-500/50 transition-all text-sm font-bold">
            <SelectValue placeholder="Select days" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl">
            <SelectItem value="7">7 Days</SelectItem>
            <SelectItem value="14">14 Days</SelectItem>
            <SelectItem value="30">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}

interface StakeRewardsFormProps {
  value: string
  onChange: (v: string) => void
}

export function StakeRewardsForm({ value, onChange }: StakeRewardsFormProps) {
  return (
    <Card className="glass p-6 border-white/5 space-y-6">
      <div className="space-y-1.5">
        <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Entry Stake (MON)</Label>
        <div className="relative">
          <Input
            type="number"
            min="0.5"
            step="0.01"
            placeholder="10"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-12 py-6 bg-white/5 border-white/10 rounded-xl focus:border-hc-green/50 transition-all text-2xl font-black"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-hc-green/10 border border-hc-green/20 text-[9px] font-black text-hc-green">
            MIN 0.5 MON
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-hc-green/5 border border-hc-green/10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Estimated Rewards</span>
          <Zap className="w-3 h-3 text-hc-green" />
        </div>
        <div className="text-lg font-black text-hc-green mb-1">125% - 200% Yield</div>
        <p className="text-[9px] text-white/30 font-medium">Based on current participant yield and staking mechanics.</p>
      </div>
    </Card>
  )
}
