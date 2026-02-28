import { Zap, Wallet, Users } from 'lucide-react'
import { Stat } from '@/types'

const IconMap = {
    zap: Zap,
    wallet: Wallet,
    users: Users,
}

interface StatCardProps {
    stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
    const Icon = IconMap[stat.iconType]

    return (
        <div className="glass px-4 sm:px-6 py-6 sm:py-8 border-white/5 flex flex-col items-start relative overflow-hidden group hover:border-white/20 transition-colors min-w-0">
            <div className="absolute top-0 right-0 p-4 sm:p-6 text-white/10 group-hover:text-fuchsia-500/20 transition-colors">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-2 sm:mb-3">{stat.label}</span>
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
                <span className="text-[9px] font-bold text-hc-green bg-hc-green/10 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
        </div>
    )
}
