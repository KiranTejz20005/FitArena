import { Calendar } from 'lucide-react'

interface Day {
    day: number;
    status: 'completed' | 'today' | 'upcoming';
}

interface ProgressCalendarProps {
    days: Day[];
    monthName: string;
}

export function ProgressCalendar({ days, monthName }: ProgressCalendarProps) {
    return (
        <div className="glass p-6 border-white/5">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold mb-1">Progress Calendar</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Keep the streak alive</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {monthName}
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((d) => (
                    <div
                        key={d.day}
                        className={`aspect-square rounded-lg border flex items-center justify-center text-xs font-bold transition-all
              ${d.status === 'completed' ? 'bg-purple-500/20 border-purple-500/30 text-white' :
                                d.status === 'today' ? 'bg-zinc-900 border-hc-amber text-hc-amber shadow-[0_0_15px_rgba(251,191,36,0.2)]' :
                                    'bg-white/5 border-white/10 text-white/20 hover:border-white/20'}
            `}
                    >
                        {d.day}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Completed</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full border border-hc-amber" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Today</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full border border-white/10" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Upcoming</span>
                </div>
            </div>
        </div>
    )
}
