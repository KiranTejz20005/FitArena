import { Challenge, Stat, LeaderboardEntry } from '@/types'

export const STATS: Stat[] = [
    { label: 'Active Challenges', value: '124', change: '+12%', iconType: 'zap' },
    { label: 'MON Rewards Paid', value: '50k+', change: '+8%', iconType: 'wallet' },
    { label: 'Total Participants', value: '12.5k', change: '+25%', iconType: 'users' },
]

export const CHALLENGES: Challenge[] = [
    {
        id: '1',
        name: '30-Day Yoga Streak',
        description: 'Complete 20 mins of daily yoga. Verify via photo proof or wearable data integration.',
        category: 'Yoga',
        prizePool: '5,000 MON',
        entryFee: '10 MON',
        reward: '12.5 MON',
        progress: 65,
        participants: 47,
        daysLeft: 10,
        iconType: 'activity',
        gradient: 'from-purple-500/20 to-fuchsia-500/20',
    },
    {
        id: '2',
        name: '10K Steps Challenge',
        description: 'Hit 10,000 steps every day for a week. Syncs seamlessly with Apple Health & Google Fit.',
        category: 'Cardio',
        prizePool: '12,500 MON',
        entryFee: '25 MON',
        reward: '32 MON',
        progress: 88,
        participants: 128,
        daysLeft: 5,
        iconType: 'zap',
        gradient: 'from-blue-500/20 to-emerald-500/20',
    },
    {
        id: '3',
        name: 'Plant-Based Week',
        description: 'Eat plant-based meals for 7 days. Upload meal photos to verify and earn rewards.',
        category: 'Nutrition',
        prizePool: '3,000 MON',
        entryFee: '5 MON',
        reward: '7 MON',
        progress: 45,
        participants: 24,
        daysLeft: 4,
        iconType: 'activity',
        gradient: 'from-emerald-500/20 to-hc-amber/20',
    },
    {
        id: '4',
        name: '5AM Meditation Club',
        description: 'Wake up and check in before 5:30 AM. Build discipline, consistency and earn rewards.',
        category: 'Mindfulness',
        prizePool: '8,000 MON',
        entryFee: '15 MON',
        reward: '20 MON',
        progress: 92,
        participants: 200,
        daysLeft: 14,
        iconType: 'trophy',
        gradient: 'from-hc-amber/20 to-orange-500/20',
    },
]

export const LEADERBOARD: LeaderboardEntry[] = [
    { name: '0x3f...82A1', progress: 100, days: '30/30' },
    { name: '0x9a...B2C9', progress: 95, days: '29/30' },
    { name: 'You', progress: 85, days: '26/30', isUser: true },
    { name: '0x21...D5F1', progress: 80, days: '25/30' },
    { name: '0x55...E8R9', progress: 72, days: '22/30' },
]
