import Link from 'next/link'
import { LeaderboardEntry } from '@/types'

interface LeaderboardSidebarProps {
    entries: LeaderboardEntry[];
}

export function LeaderboardSidebar({ entries }: LeaderboardSidebarProps) {
    return (
        <div className="glass p-6 border-white/5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold italic uppercase tracking-tight">Leaderboard</h3>
                <Link href="/leaderboard" className="text-[9px] font-black uppercase tracking-widest text-fuchsia-400 hover:text-fuchsia-300">View All</Link>
            </div>

            <div className="space-y-4">
                {entries.map((user, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${user.isUser ? 'bg-fuchsia-500/5 border-fuchsia-500/20 shadow-lg shadow-fuchsia-500/10' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black ${i === 0 ? 'bg-hc-amber text-black' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                            {i + 1}
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className={`text-xs font-bold ${user.isUser ? 'text-white' : 'text-white/70'}`}>{user.name}</span>
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{user.days}</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${user.isUser ? 'bg-fuchsia-500' : 'bg-hc-green'}`}
                                    style={{ width: `${user.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
