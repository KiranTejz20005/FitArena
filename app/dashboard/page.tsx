'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, Target, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      label: 'Active Challenges',
      value: '3',
      icon: Target,
      color: 'text-black'
    },
    {
      label: 'Total Points Earned',
      value: '1,250',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      label: 'Current Streak',
      value: '12 Days',
      icon: TrendingUp,
      color: 'text-black'
    },
  ]

  const activeChallenges = [
    {
      name: '30-Day Yoga Streak',
      progress: 68,
      daysLeft: 10,
      pointsEarned: 340,
    },
    {
      name: '10K Steps Challenge',
      progress: 43,
      daysLeft: 5,
      pointsEarned: 215,
    },
    {
      name: 'Clean Eating Challenge',
      progress: 85,
      daysLeft: 2,
      pointsEarned: 425,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-gray-800 transition-colors">
              ⚡
            </div>
            <span className="text-xl font-bold text-black">FitReward</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/challenges" className="text-gray-600 hover:text-black transition-colors font-medium">
                Challenges
              </Link>
              <Link href="/dashboard" className="text-black transition-colors font-medium border-b-2 border-black">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-black transition-colors font-medium">
                Leaderboard
              </Link>
            </div>

            <Button className="bg-black text-white hover:bg-gray-800 transition-colors hidden sm:inline-flex">
              Connect Wallet
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">Your Dashboard</h1>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:border-black transition-colors duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-gray-600 text-sm font-medium mb-2">{stat.label}</div>
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Active Challenges */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Active Challenges</h2>
          <div className="space-y-4">
            {activeChallenges.map((challenge, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-black">{challenge.name}</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{challenge.daysLeft} days left</div>
                    <div className="text-lg font-bold text-blue-600">{challenge.pointsEarned} pts</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-2">{challenge.progress}% Complete</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                ⚡
              </div>
              <span className="text-black font-bold">FitReward</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2026 FitReward. Your fitness platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
