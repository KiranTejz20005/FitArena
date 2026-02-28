'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Activity } from 'lucide-react'

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
      reward: '500 Points',
      participants: 42,
      joinUrl: '/challenges/1',
    },
    {
      id: 2,
      icon: '🏃',
      name: '10K Steps Daily',
      description: 'Hit 10,000 steps every day.',
      category: 'Cardio',
      reward: '300 Points',
      participants: 128,
      joinUrl: '/challenges/2',
    },
    {
      id: 3,
      icon: '🥗',
      name: 'Plant-Based Challenge',
      description: 'Eat plant-based for 28 days.',
      category: 'Nutrition',
      reward: '400 Points',
      participants: 15,
      joinUrl: '/challenges/3',
    },
    {
      id: 4,
      icon: '🧘‍♀️',
      name: '5AM Wake Challenge',
      description: 'Wake before 5:30 AM daily.',
      category: 'Mindfulness',
      reward: '200 Points',
      participants: 200,
      joinUrl: '/challenges/1',
    },
  ]

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
              <Link href="/challenges" className="text-gray-600 hover:text-black transition-colors font-medium">
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
              <Button className="bg-black text-white hover:bg-gray-800 transition-colors">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-black animate-fadeIn">
            Achieve Your Fitness Goals
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Complete challenges, track progress, and earn rewards. A simple, beautiful platform for your fitness journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="bg-black text-white hover:bg-gray-800 rounded-lg px-8 font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-black text-black hover:bg-black hover:text-white rounded-lg px-8 font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:border-black transition-colors duration-300">
              <div className="text-gray-600 text-sm font-medium mb-2">Active Challenges</div>
              <div className="text-3xl font-bold text-black">24</div>
              <div className="text-blue-600 text-xs font-semibold mt-2">+5 this month</div>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:border-black transition-colors duration-300">
              <div className="text-gray-600 text-sm font-medium mb-2">Total Participants</div>
              <div className="text-3xl font-bold text-black">2.5k</div>
              <div className="text-blue-600 text-xs font-semibold mt-2">Growing daily</div>
            </div>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 hover:border-black transition-colors duration-300">
              <div className="text-gray-600 text-sm font-medium mb-2">Rewards Distributed</div>
              <div className="text-3xl font-bold text-black">50k</div>
              <div className="text-blue-600 text-xs font-semibold mt-2">Points awarded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Challenges Section */}
      <section className="py-20 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-black mb-2">Featured Challenges</h2>
              <p className="text-gray-600">Pick a challenge and start your journey today</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap mt-6 md:mt-0">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={challenge.joinUrl}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{challenge.icon}</div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {challenge.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-black mb-2">{challenge.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{challenge.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-gray-600 text-xs font-medium mb-1">Reward</div>
                      <div className="text-lg font-bold text-black">{challenge.reward}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-600 text-xs font-medium mb-1">Joined</div>
                      <div className="text-lg font-bold text-black">{challenge.participants}</div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 bg-black text-white hover:bg-gray-800 font-semibold rounded-lg group-hover:shadow-lg transition-all duration-300"
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
      <footer className="border-t border-gray-200 bg-white py-12 px-6">
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
