'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Mindfulness',
    duration: 30,
    prizePool: 5000,
  })

  const filters = ['All', 'Cardio', 'Mindfulness', 'Nutrition', 'Lifestyle']

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      icon: '🧘',
      name: '30-Day Yoga Streak',
      description: 'Complete 20 mins of daily yoga. Verify via photo proof or wearable data.',
      category: 'Mindfulness',
      prizePool: '5,000 MON',
      participants: 42,
      status: 'Active',
      daysLeft: 15,
    },
    {
      id: 2,
      icon: '🏃',
      name: '10K Steps Challenge',
      description: 'Hit 10,000 steps every day for a week. Syncs with Apple Health & Google Fit.',
      category: 'Cardio',
      prizePool: '12,500 MON',
      participants: 128,
      status: 'Active',
      daysLeft: 7,
    },
    {
      id: 3,
      icon: '🥗',
      name: 'Plant-Based February',
      description: 'Eat plant-based meals for 28 days. Upload meal photos to verify and earn.',
      category: 'Nutrition',
      prizePool: '3,000 MON',
      participants: 15,
      status: 'Active',
      daysLeft: 28,
    },
    {
      id: 4,
      icon: '🧘‍♀️',
      name: '5AM Meditation Club',
      description: 'Wake up and check in before 5:30 AM. Build discipline and earn rewards.',
      category: 'Lifestyle',
      prizePool: '8,000 MON',
      participants: 200,
      status: 'Active',
      daysLeft: 30,
    },
    {
      id: 5,
      icon: '💪',
      name: 'Strength Training Streak',
      description: '3x weekly strength sessions. Log workouts and earn rewards.',
      category: 'Cardio',
      prizePool: '6,500 MON',
      participants: 89,
      status: 'Active',
      daysLeft: 21,
    },
    {
      id: 6,
      icon: '🥕',
      name: 'Clean Eating Challenge',
      description: 'No processed foods for 14 days. Track your meals and wins.',
      category: 'Nutrition',
      prizePool: '4,000 MON',
      participants: 56,
      status: 'Active',
      daysLeft: 14,
    },
  ])

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault()
    const categoryIcons: Record<string, string> = {
      Mindfulness: '🧘',
      Cardio: '🏃',
      Nutrition: '🥗',
      Lifestyle: '🧘‍♀️',
    }

    const newChallenge = {
      id: challenges.length + 1,
      icon: categoryIcons[formData.category] || '⚡',
      name: formData.name,
      description: formData.description,
      category: formData.category,
      prizePool: `${formData.prizePool.toLocaleString()} MON`,
      participants: Math.floor(Math.random() * 200) + 10,
      status: 'Active',
      daysLeft: formData.duration,
    }

    setChallenges([...challenges, newChallenge])
    setShowCreateModal(false)
    setFormData({
      name: '',
      description: '',
      category: 'Mindfulness',
      duration: 30,
      prizePool: 5000,
    })
  }

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
              <Link href="/challenges" className="text-white transition-colors font-medium border-b-2 border-purple-500">
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
      <section className="py-12 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">All Challenges</h1>
              <p className="text-slate-400">Choose a challenge and start earning crypto rewards</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg hidden md:flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Challenge
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Create Button */}
      <section className="md:hidden py-4 px-6 border-b border-slate-800">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Challenge
        </Button>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 border-b border-slate-800 sticky top-16 z-40 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
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
      </section>

      {/* Challenges Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              href={`/challenges/${challenge.id}`}
              className="group"
            >
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full">
                    {challenge.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{challenge.name}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{challenge.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-slate-400 text-xs font-medium">Prize Pool</div>
                    <div className="text-lg font-bold text-white">{challenge.prizePool}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs font-medium">{challenge.participants} joined</div>
                    <div className="text-lg font-bold text-green-400">{challenge.daysLeft}d left</div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all"
                >
                  View Challenge
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Challenge</h2>
            
            <form onSubmit={handleCreateChallenge} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Challenge Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                  placeholder="e.g., 30-Day Yoga Challenge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Describe your challenge..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option>Mindfulness</option>
                  <option>Cardio</option>
                  <option>Nutrition</option>
                  <option>Lifestyle</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Prize Pool (MON)</label>
                  <input
                    type="number"
                    min="100"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({...formData, prizePool: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border-slate-600 text-white hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                >
                  Create Challenge
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <Link href="/challenges" className="text-white transition-colors font-medium border-b-2 border-purple-500">
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
      <section className="py-12 px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">All Challenges</h1>
          <p className="text-slate-400">Choose a challenge and start earning crypto rewards</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 border-b border-slate-800 sticky top-16 z-40 bg-slate-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
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
      </section>

      {/* Challenges Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              href={`/challenges/${challenge.id}`}
              className="group"
            >
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-semibold rounded-full">
                    {challenge.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{challenge.name}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{challenge.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-slate-400 text-xs font-medium">Prize Pool</div>
                    <div className="text-lg font-bold text-white">{challenge.prizePool}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400 text-xs font-medium">{challenge.participants} joined</div>
                    <div className="text-lg font-bold text-green-400">{challenge.daysLeft}d left</div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all"
                >
                  View Challenge
                </Button>
              </div>
            </Link>
          ))}
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
