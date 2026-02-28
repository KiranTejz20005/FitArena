'use client'

import { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Trophy, Zap } from 'lucide-react'

const challengeData: Record<string, any> = {
  '1': {
    icon: '🧘',
    name: '30-Day Yoga Streak',
    category: 'Mindfulness',
    description: 'Complete 20 mins of daily yoga. Verify via photo proof or wearable data.',
    prizePool: '5,000 MON',
    participants: 42,
    daysLeft: 15,
    progress: 68,
    details: 'This challenge encourages daily mindfulness practice. Each day you complete 20 minutes of yoga, you earn points towards the prize pool.',
    requirements: [
      'Complete 20 minutes of yoga daily',
      'Upload photo proof or sync wearable data',
      'Maintain streak for 30 days',
    ],
    rewards: {
      first: '2,500 MON',
      second: '1,500 MON',
      third: '1,000 MON',
    },
  },
  '2': {
    icon: '🏃',
    name: '10K Steps Challenge',
    category: 'Cardio',
    description: 'Hit 10,000 steps every day for a week. Syncs with Apple Health & Google Fit.',
    prizePool: '12,500 MON',
    participants: 128,
    daysLeft: 7,
    progress: 43,
    details: 'Challenge yourself to hit 10,000 steps daily. This 7-day challenge syncs with your Apple Health or Google Fit data.',
    requirements: [
      'Walk 10,000 steps daily',
      'Sync with Apple Health or Google Fit',
      'Complete 7 consecutive days',
    ],
    rewards: {
      first: '6,000 MON',
      second: '4,000 MON',
      third: '2,500 MON',
    },
  },
  '3': {
    icon: '🥗',
    name: 'Plant-Based February',
    category: 'Nutrition',
    description: 'Eat plant-based meals for 28 days. Upload meal photos to verify and earn.',
    prizePool: '3,000 MON',
    participants: 15,
    daysLeft: 28,
    progress: 85,
    details: 'Join this nutrition challenge and commit to eating only plant-based meals for 28 days. Document your journey!',
    requirements: [
      'Eat plant-based meals only',
      'Upload meal photos daily',
      'Complete 28 days',
    ],
    rewards: {
      first: '1,500 MON',
      second: '1,000 MON',
      third: '500 MON',
    },
  },
}

export default function ChallengePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const challenge = challengeData[id] || challengeData['1']

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

      {/* Header */}
      <section className="py-8 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/challenges" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges
          </Link>

          <div className="flex items-start gap-6">
            <div className="text-6xl">{challenge.icon}</div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{challenge.name}</h1>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full">
                  {challenge.category}
                </span>
              </div>
              <p className="text-slate-400 mb-4">{challenge.description}</p>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-slate-400 text-xs font-medium">PRIZE POOL</div>
                  <div className="text-2xl font-bold text-purple-400">{challenge.prizePool}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-medium">PARTICIPANTS</div>
                  <div className="text-2xl font-bold text-white">{challenge.participants}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-medium">DAYS LEFT</div>
                  <div className="text-2xl font-bold text-green-400">{challenge.daysLeft}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Progress</h3>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full" 
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-slate-400">{challenge.progress}% Complete</div>
            </div>

            {/* Description */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">About This Challenge</h3>
              <p className="text-slate-300 leading-relaxed mb-4">{challenge.details}</p>
            </div>

            {/* Requirements */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Requirements</h3>
              <ul className="space-y-3">
                {challenge.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-slate-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rewards Distribution */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Reward Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-white font-medium">🥇 1st Place</span>
                  <span className="text-green-400 font-bold">{challenge.rewards.first}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-white font-medium">🥈 2nd Place</span>
                  <span className="text-green-400 font-bold">{challenge.rewards.second}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-white font-medium">🥉 3rd Place</span>
                  <span className="text-green-400 font-bold">{challenge.rewards.third}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-4 h-fit sticky top-20">
            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg h-12"
            >
              Join Challenge
              <Zap className="w-5 h-5 ml-2" />
            </Button>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-slate-400 text-xs font-medium mb-2">CURRENT PARTICIPANTS</div>
                  <div className="text-2xl font-bold text-white">{challenge.participants}</div>
                </div>
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  View Leaderboard
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <p className="text-sm text-slate-300">
                <span className="font-bold text-purple-300">Pro Tip:</span> Challenges with clear success criteria and reasonable durations (7-14 days) tend to have 3x higher completion rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6 mt-12">
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

      {/* Header */}
      <section className="py-8 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/challenges" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges
          </Link>

          <div className="flex items-start gap-6">
            <div className="text-6xl">{challenge.icon}</div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{challenge.name}</h1>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full">
                  {challenge.category}
                </span>
              </div>
              <p className="text-slate-400 mb-4">{challenge.description}</p>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-slate-400 text-xs font-medium">PRIZE POOL</div>
                  <div className="text-2xl font-bold text-purple-400">{challenge.prizePool}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-medium">PARTICIPANTS</div>
                  <div className="text-2xl font-bold text-white">{challenge.participants}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-medium">DAYS LEFT</div>
                  <div className="text-2xl font-bold text-green-400">{challenge.daysLeft}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Progress</h3>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full" 
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-slate-400">{challenge.progress}% Complete</div>
            </div>

            {/* Description */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">About This Challenge</h3>
              <p className="text-slate-300 leading-relaxed mb-4">{challenge.details}</p>
            </div>

            {/* Requirements */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Requirements</h3>
              <ul className="space-y-3">
                {challenge.requirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-slate-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rewards Distribution */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Reward Distribution
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-white font-medium">🥇 1st Place</span>
                  <span className="text-green-400 font-bold">{challenge.rewards.first}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-white font-medium">🥈 2nd Place</span>
                  <span className="text-green-400 font-bold">{challenge.rewards.second}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-white font-medium">🥉 3rd Place</span>
                  <span className="text-green-400 font-bold">{challenge.rewards.third}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-4 h-fit sticky top-20">
            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg h-12"
            >
              Join Challenge
              <Zap className="w-5 h-5 ml-2" />
            </Button>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Community
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-slate-400 text-xs font-medium mb-2">CURRENT PARTICIPANTS</div>
                  <div className="text-2xl font-bold text-white">{challenge.participants}</div>
                </div>
                <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                  View Leaderboard
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
              <p className="text-sm text-slate-300">
                <span className="font-bold text-purple-300">Pro Tip:</span> Challenges with clear success criteria and reasonable durations (7-14 days) tend to have 3x higher completion rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6 mt-12">
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
