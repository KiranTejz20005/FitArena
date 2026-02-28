'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Cardio', 'Mindfulness', 'Nutrition']

  const challenges = [
    {
      id: 1,
      icon: '🧘',
      name: '30-Day Yoga Streak',
      description: 'Complete 20 mins of daily yoga. Verify via photo proof or wearable data.',
      category: 'Mindfulness',
      prizePool: '5,000 MON',
      prizeColor: 'from-purple-500 to-blue-500',
      participants: 42,
      joinUrl: '/challenges/yoga-30day',
    },
    {
      id: 2,
      icon: '🏃',
      name: '10K Steps Challenge',
      description: 'Hit 10,000 steps every day for a week. Syncs with Apple Health & Google Fit.',
      category: 'Cardio',
      prizePool: '12,500 MON',
      prizeColor: 'from-pink-500 to-red-500',
      participants: 128,
      joinUrl: '/challenges/steps-10k',
    },
    {
      id: 3,
      icon: '🥗',
      name: 'Plant-Based February',
      description: 'Eat plant-based meals for 28 days. Upload meal photos to verify and earn.',
      category: 'Nutrition',
      prizePool: '3,000 MON',
      prizeColor: 'from-green-500 to-teal-500',
      participants: 15,
      joinUrl: '/challenges/plant-based',
    },
    {
      id: 4,
      icon: '🧘‍♀️',
      name: '5AM Meditation Club',
      description: 'Wake up and check in before 5:30 AM. Build discipline and earn rewards.',
      category: 'Lifestyle',
      prizePool: '8,000 MON',
      prizeColor: 'from-orange-500 to-amber-500',
      participants: 200,
      joinUrl: '/challenges/5am-meditation',
    },
  ]

  const filteredChallenges = activeFilter === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === activeFilter)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
              ❤️
            </div>
            <span className="text-xl font-bold text-white">HealthChain</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/challenges" className="text-slate-300 hover:text-white transition-colors font-medium">
                Challenges
              </Link>
              <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors font-medium">
                Leaderboard
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-slate-800 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-300 font-medium">Monad Testnet</span>
              </div>
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hidden sm:inline-flex">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-200 text-sm font-medium">
              NEW SEASON LIVE →
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Get Fit.</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Earn Crypto.</span>
            <br />
            <span className="text-white">Stay Accountable.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stake tokens to commit to your health goals. Prove your progress on-chain through Monad's high-performance network and earn yield on your sweat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-full px-8 group"
            >
              Start Earning
              <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800/50 rounded-full px-8 font-bold"
            >
              Browse Challenges
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
              <div className="text-slate-400 text-sm font-medium mb-2">Active Challenges</div>
              <div className="text-3xl font-bold text-white">124</div>
              <div className="text-green-400 text-xs font-semibold mt-2">↑12%</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
              <div className="text-slate-400 text-sm font-medium mb-2">MON Rewards Paid</div>
              <div className="text-3xl font-bold text-white">50k+</div>
              <div className="text-green-400 text-xs font-semibold mt-2">↑8%</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
              <div className="text-slate-400 text-sm font-medium mb-2">Total Participants</div>
              <div className="text-3xl font-bold text-white">12.5k</div>
              <div className="text-green-400 text-xs font-semibold mt-2">↑25%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Challenges Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Active Challenges</h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-6 md:mt-0">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              href={challenge.joinUrl}
              className="group"
            >
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{challenge.name}</h3>
                      <p className="text-slate-400 text-sm">{challenge.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full whitespace-nowrap">
                    {challenge.category}
                  </span>
                </div>

                <div className="flex-grow"></div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-slate-400 text-xs font-medium mb-1">Prize Pool</div>
                    <div className="text-xl font-bold text-white">{challenge.prizePool}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs font-medium mb-1">Participants</div>
                    <div className="text-xl font-bold text-white">{challenge.participants}</div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  Join Now
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                ❤️
              </div>
              <span className="text-white font-bold">HealthChain</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2024 HealthChain. Built on Monad Network.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
