import Link from 'next/link'
import { CheckCircle2, Trophy, Share2, PlusCircle, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VerificationOptionsProps {
    onSelect: (option: string) => void;
    selectedOption: string | null;
}

export function VerificationOptions({ onSelect, selectedOption }: VerificationOptionsProps) {
    const options = [
        { id: 'photo', name: 'Photo Evidence', desc: 'AI-verified image check-in', icon: <PlusCircle className="w-5 h-5" /> },
        { id: 'wearable', name: 'Wearable Sync', desc: 'Sync Apple/Google Health', icon: <Activity className="w-5 h-5" /> },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
                <div
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`glass p-6 border cursor-pointer transition-all group relative overflow-hidden ${selectedOption === option.id
                        ? 'border-fuchsia-500/50 bg-fuchsia-500/5 shadow-[0_0_20px_rgba(232,121,249,0.1)]'
                        : 'border-white/5 hover:border-white/20'
                        }`}
                >
                    <div className={`p-3 rounded-lg border mb-4 inline-flex ${selectedOption === option.id
                        ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400'
                        : 'bg-white/5 border-white/10 text-white/40'
                        }`}>
                        {option.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-1">{option.name}</h3>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{option.desc}</p>
                </div>
            ))}
        </div>
    )
}

interface SuccessStateProps {
    challengeName: string;
}

export function SuccessState({ challengeName }: SuccessStateProps) {
    return (
        <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-hc-green/10 border border-hc-green/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-hc-green" />
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight mb-4">Mission Accomplished</h2>
            <p className="text-white/40 text-base font-medium mb-10">
                Day 21 check-in verified for <span className="text-white font-bold">{challengeName}</span>. Your streak is alive!
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12 px-8">
                <div className="glass p-6 border-white/5">
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">XP Earned</div>
                    <div className="text-2xl font-black text-fuchsia-400">+250</div>
                </div>
                <div className="glass p-6 border-white/5">
                    <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">New Streak</div>
                    <div className="text-2xl font-black text-hc-amber">21 Days</div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="h-12 px-8 text-sm font-black rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Share Proof
                </Button>
                <Link href="/challenges">
                    <Button className="btn-primary h-12 px-8 text-sm font-black rounded-xl flex items-center gap-2">
                        Back to Arena <Trophy className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
