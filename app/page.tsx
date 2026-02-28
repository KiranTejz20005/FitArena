'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './providers'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Cardio', 'Mindfulness', 'Nutrition']

  const challenges = [
    {
      id: 1,
      icon: '🧘',
      name: '30-Day Yoga Streak',
      description: 'Complete 20 mins of daily yoga.',
      category: 'Mindfulness',
      reward: '500 Stake Tokens',
      participants: 42,
      joinUrl: '/challenges/1',
    },
    {
      id: 2,
      icon: '🏃',
      name: '10K Steps Daily',
      description: 'Hit 10,000 steps every day.',
      category: 'Cardio',
      reward: '300 Stake Tokens',
      participants: 128,
      joinUrl: '/challenges/2',
    },
    {
      id: 3,
      icon: '🥗',
      name: 'Plant-Based Challenge',
      description: 'Eat plant-based for 28 days.',
      category: 'Nutrition',
      reward: '400 Stake Tokens',
      participants: 15,
      joinUrl: '/challenges/3',
    },
    {
      id: 4,
      icon: '🧘‍♀️',
      name: '5AM Wake Challenge',
      description: 'Wake before 5:30 AM daily.',
      category: 'Mindfulness',
      reward: '200 Stake Tokens',
      participants: 200,
      joinUrl: '/challenges/1',
    },
  ]

  const filteredChallenges = activeFilter === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === activeFilter)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-emerald-700 dark:group-hover:bg-emerald-700 transition-colors">
              ⚡
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">FitArena</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/challenges" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                Challenges
              </Link>
              <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
                Leaderboard
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" className="border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 hidden sm:inline-flex">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-slate-900 dark:text-white animate-fadeIn">
            Achieve Your Fitness Goals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Stake tokens on fitness challenges, complete them, and earn rewards. Simple, transparent, and rewarding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/challenges">
              <Button className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 h-12 px-8 font-semibold">
                Browse Challenges
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 w-full sm:w-auto h-12 px-8 font-semibold transition-colors">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,200+</div>
              <p className="text-gray-600 dark:text-gray-400">Active Challenges</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">$50M</div>
              <p className="text-gray-600 dark:text-gray-400">Total Stake Tokens</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">125K</div>
              <p className="text-gray-600 dark:text-gray-400">Active Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Challenges</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">Discover the most popular fitness challenges and start earning stake tokens today.</p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={challenge.joinUrl}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/10 h-full flex flex-col">
                  <div className="text-4xl mb-4">{challenge.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{challenge.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{challenge.description}</p>

                  <div className="pt-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Reward</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{challenge.reward}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Participants</span>
                      <span className="font-bold text-slate-900 dark:text-white">{challenge.participants}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors group-hover:shadow-lg group-hover:shadow-blue-500/30"
                  >
                    Join Now
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                ⚡
              </div>
              <span className="text-slate-900 dark:text-white font-bold">FitArena</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2026 FitArena. Your fitness, your rewards.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
