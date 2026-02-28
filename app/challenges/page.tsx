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
    reward: 500,
  })

  const filters = ['All', 'Cardio', 'Mindfulness', 'Nutrition', 'Lifestyle']

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      icon: '🧘',
      name: '30-Day Yoga Streak',
      description: 'Complete 20 mins of daily yoga.',
      category: 'Mindfulness',
      reward: '500 Points',
      participants: 42,
      status: 'Active',
      daysLeft: 15,
    },
    {
      id: 2,
      icon: '🏃',
      name: '10K Steps Challenge',
      description: 'Hit 10,000 steps every day for a week.',
      category: 'Cardio',
      reward: '300 Points',
      participants: 128,
      status: 'Active',
      daysLeft: 7,
    },
    {
      id: 3,
      icon: '🥗',
      name: 'Plant-Based February',
      description: 'Eat plant-based meals for 28 days.',
      category: 'Nutrition',
      reward: '400 Points',
      participants: 15,
      status: 'Active',
      daysLeft: 28,
    },
    {
      id: 4,
      icon: '🧘‍♀️',
      name: '5AM Meditation Club',
      description: 'Wake up and check in before 5:30 AM.',
      category: 'Lifestyle',
      reward: '200 Points',
      participants: 200,
      status: 'Active',
      daysLeft: 30,
    },
    {
      id: 5,
      icon: '💪',
      name: 'Strength Training Streak',
      description: '3x weekly strength sessions.',
      category: 'Cardio',
      reward: '600 Points',
      participants: 89,
      status: 'Active',
      daysLeft: 21,
    },
    {
      id: 6,
      icon: '🥕',
      name: 'Clean Eating Challenge',
      description: 'No processed foods for 14 days.',
      category: 'Nutrition',
      reward: '400 Points',
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
      reward: `${formData.reward} Points`,
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
      reward: 500,
    })
  }

  const filteredChallenges = activeFilter === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === activeFilter)

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
              <Link href="/challenges" className="text-black transition-colors font-medium border-b-2 border-black">
                Challenges
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-black transition-colors font-medium">
                Leaderboard
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-black text-white hover:bg-gray-800 transition-colors hidden sm:inline-flex">
                Connect Wallet
              </Button>
            </div>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">All Challenges</h1>
              <p className="text-gray-600">Pick a challenge and start earning rewards</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-black text-white hover:bg-gray-800 font-bold rounded-lg hidden md:flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Create Button */}
      <section className="md:hidden py-4 px-6 border-b border-gray-200">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-black text-white hover:bg-gray-800 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Challenge
        </Button>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 border-b border-gray-200 sticky top-16 z-40 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:border border-gray-300'
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
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                    {challenge.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-black mb-2">{challenge.name}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{challenge.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-gray-600 text-xs font-medium">Reward</div>
                    <div className="text-lg font-bold text-black">{challenge.reward}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 text-xs font-medium">{challenge.participants} joined</div>
                    <div className="text-lg font-bold text-blue-600">{challenge.daysLeft}d</div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-black text-white hover:bg-gray-800 font-bold rounded-lg group-hover:shadow-lg transition-all duration-300"
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-lg max-w-md w-full p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Create New Challenge</h2>
            
            <form onSubmit={handleCreateChallenge} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Challenge Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  placeholder="e.g., 30-Day Yoga Challenge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                  placeholder="Describe your challenge..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                >
                  <option>Mindfulness</option>
                  <option>Cardio</option>
                  <option>Nutrition</option>
                  <option>Lifestyle</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Reward (Points)</label>
                  <input
                    type="number"
                    min="100"
                    value={formData.reward}
                    onChange={(e) => setFormData({...formData, reward: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 text-black hover:bg-gray-100 transition-colors font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-black text-white hover:bg-gray-800 font-semibold transition-colors"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
