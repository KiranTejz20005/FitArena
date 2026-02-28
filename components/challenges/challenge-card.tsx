import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Activity, Zap, Trophy, Flame, PlusCircle, Target, ArrowUpRight } from 'lucide-react'
import { Challenge } from '@/types'

const IconMap = {
    activity: Activity,
    zap: Zap,
    trophy: Trophy,
    flame: Flame,
    plus: PlusCircle,
    target: Target,
}

interface ChallengeCardProps {
    challenge: Challenge;
    variant?: 'grid' | 'list';
}

export function ChallengeCard({ challenge, variant = 'grid' }: ChallengeCardProps) {
    const Icon = IconMap[challenge.iconType] || Activity

    if (variant === 'list') {
        return (
            <div className="glass p-1 border-white/5 group hover:border-white/20 transition-all overflow-hidden">
                <div className="p-6 h-full flex flex-col bg-zinc-950/20 rounded-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                            <Icon className="w-4 h-4 text-fuchsia-400" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-fuchsia-400 bg-fuchsia-400/10">
                            {challenge.category ?? 'Challenge'}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
                    <p className="text-white/50 text-xs mb-10 line-clamp-2 leading-relaxed">
                        {challenge.description ?? 'Stake MON and check in daily to complete.'}
                    </p>

                    <div className="mt-auto space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Prize Pool</span>
                                <div className="text-lg font-bold tracking-tight">{challenge.prizePool}</div>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Progress</span>
                                <div className="text-[10px] font-bold">{challenge.progress}% Filled</div>
                            </div>
                        </div>

                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 transition-all duration-1000"
                                style={{ width: `${challenge.progress}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2">
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-800" />
                                ))}
                                <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center text-[9px] font-bold text-white/50">
                                    +{challenge.participants}
                                </div>
                            </div>
                            <Link href={`/challenges/${challenge.id}`}>
                                <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-6 h-10 text-xs font-bold uppercase tracking-widest">
                                    Join Challenge
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link href={`/challenges/${challenge.id}`} className="group h-full">
            <div className="glass p-6 border-white/5 hover:border-white/10 transition-all group-hover:-translate-y-1 duration-500 relative overflow-hidden h-full flex flex-col">
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${challenge.gradient || 'from-fuchsia-500/20 to-purple-500/20'} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />

                <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <Icon className="w-6 h-6 text-fuchsia-400" />
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="px-1.5 py-0.5 rounded bg-hc-green/10 border border-hc-green/20 text-[7px] font-black uppercase tracking-widest text-hc-green mb-1.5">
                            Active
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white/30">
                            <Flame className="w-3 h-3 text-orange-400" /> Hot
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight mb-2 italic group-hover:text-fuchsia-400 transition-colors line-clamp-1">{challenge.name}</h3>
                <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-8 flex-grow">{(challenge.category ?? 'Challenge')} • {challenge.participants} Participants</p>

                <div className="flex items-end justify-between pt-6 border-t border-white/5">
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Prize pool</div>
                        <div className="text-xl font-black tracking-tight">{challenge.prizePool}</div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Time left</div>
                        <div className="text-base font-black tracking-tight text-hc-green">{challenge.daysLeft}D</div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-fuchsia-400">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
        </Link>
    )
}
