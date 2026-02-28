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
        <div className="glass px-6 py-8 border-white/5 flex flex-col items-start relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 p-6 text-white/10 group-hover:text-fuchsia-500/20 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-3">{stat.label}</span>
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-[9px] font-bold text-hc-green bg-hc-green/10 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
        </div>
    )
}
