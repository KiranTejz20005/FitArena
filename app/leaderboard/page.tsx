'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Crown } from 'lucide-react'

export default function LeaderboardPage() {
  const leaderboard = [
    {
      rank: 1,
      username: 'Alex Chen',
      address: '0x3f...82a1',
      streak: 30,
      earned: 1800,
      medal: '🥇',
    },
    {
      rank: 2,
      username: 'Sarah Mitchell',
      address: '0x9a...b2c9',
      streak: 29,
      earned: 1650,
      medal: '🥈',
    },
    {
      rank: 3,
      username: 'You',
      address: '0x7f3a...9b2c',
      streak: 26,
      earned: 1420,
      medal: '🥉',
      isCurrentUser: true,
    },
    {
      rank: 4,
      username: 'Jordan Williams',
      address: '0x21...d5f1',
      streak: 25,
      earned: 1380,
      medal: '4️⃣',
    },
    {
      rank: 5,
      username: 'Emma Rodriguez',
      address: '0x55...e8r9',
      streak: 22,
      earned: 1250,
      medal: '5️⃣',
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
              <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-black transition-colors font-medium border-b-2 border-black">
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
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-black">Leaderboard</h1>
            <Crown className="w-8 h-8 text-black" />
          </div>
          <p className="text-gray-600">Top performers on FitReward</p>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div 
              key={entry.rank}
              className={`border rounded-lg p-6 transition-all duration-300 ${
                entry.isCurrentUser
                  ? 'bg-blue-50 border-blue-300 hover:border-black'
                  : 'bg-white border-gray-200 hover:border-black'
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg text-xl font-bold text-black">
                  {entry.medal}
                </div>

                {/* User Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg font-bold text-black">{entry.username}</span>
                    <span className="text-gray-500 text-sm font-mono">{entry.address}</span>
                    {entry.isCurrentUser && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">YOU</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{entry.streak}-day streak</p>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="text-gray-600 text-xs font-medium mb-1">Total Points</div>
                  <div className="text-2xl font-bold text-blue-600">{entry.earned}</div>
                </div>
              </div>
            </div>
          ))}
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
