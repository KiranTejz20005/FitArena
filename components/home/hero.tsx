import Link from 'next/link'
import { ArrowRight, PlusCircle, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium mb-6 text-white/80">
          <span className="text-fuchsia-400 font-bold uppercase text-[9px]">New Season</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Live on Monad</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
          Get Fit.{' '}
          <span className="text-gradient">Earn Crypto.</span>
          <br />
          Stay Accountable.
        </h1>

        <p className="text-base text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stake tokens to commit to your health goals. Prove your progress on-chain through Monad&apos;s high-performance network and earn yield on your sweat.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/challenges">
            <Button className="btn-primary h-12 px-8 text-sm font-bold rounded-xl w-full sm:w-auto">
              Start Earning <PlusCircle className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/challenges">
            <Button variant="outline" className="h-12 px-8 text-sm font-bold rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white w-full sm:w-auto">
              Browse Challenges <LayoutGrid className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
