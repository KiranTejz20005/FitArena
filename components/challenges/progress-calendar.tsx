import { Calendar, Flame } from 'lucide-react'

interface Day {
    day: number;
    status: 'completed' | 'today' | 'upcoming';
}

interface ProgressCalendarProps {
    days: Day[];
    monthName: string;
    /** When set, days are clickable (today/upcoming) to open check-in */
    onDayClick?: (day: number) => void;
    /** Current streak count to show in header */
    streak?: number;
}

export function ProgressCalendar({ days, monthName, onDayClick, streak }: ProgressCalendarProps) {
    return (
        <div className="glass p-6 border-white/5">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h3 className="text-xl font-bold mb-1">Progress Calendar</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                        Keep the streak alive
                        {streak !== undefined && streak > 0 && (
                            <span className="inline-flex items-center gap-1 text-hc-amber font-black">
                                <Flame className="w-3.5 h-3.5" /> {streak} day streak
                            </span>
                        )}
                    </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/60 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {monthName}
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((d) => {
                    const canClick = onDayClick && (d.status === 'today' || (d.status === 'upcoming' && d.day < 32))
                    return (
                        <div
                            key={d.day}
                            role={canClick ? 'button' : undefined}
                            onClick={canClick ? () => onDayClick(d.day) : undefined}
                            className={`aspect-square rounded-lg border flex items-center justify-center text-xs font-bold transition-all
              ${d.status === 'completed' ? 'bg-purple-500/20 border-purple-500/30 text-white' :
                                d.status === 'today' ? 'bg-zinc-900 border-hc-amber text-hc-amber shadow-[0_0_15px_rgba(251,191,36,0.2)]' :
                                    'bg-white/5 border-white/10 text-white/20 hover:border-white/20'}
              ${canClick ? 'cursor-pointer hover:ring-2 hover:ring-fuchsia-500/50' : ''}
            `}
                        >
                            {d.day}
                        </div>
                    )
                })}
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
