'use client';

import DashboardCard from '@/app/components/DashboardCard';
import PomodoroTimer from '@/components/PomodoroTimer';

export default function FocusTimerPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Focus Timer</h1>
        <p className="text-gray-400">
          Use the Pomodoro Technique to maximize productivity and maintain focus
        </p>
      </div>

      {/* Main Timer */}
      <DashboardCard title="Pomodoro Timer" icon="⏲">
        <PomodoroTimer workDuration={25 * 60} breakDuration={5 * 60} />
      </DashboardCard>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <span className="text-3xl">🎯</span>
          <h3 className="font-semibold text-white">Improved Focus</h3>
          <p className="text-sm text-gray-400">
            Short intervals help maintain concentration and reduce distractions
          </p>
        </div>

        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <span className="text-3xl">⚡</span>
          <h3 className="font-semibold text-white">Better Breaks</h3>
          <p className="text-sm text-gray-400">
            Regular breaks prevent burnout and recharge your mental energy
          </p>
        </div>

        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <span className="text-3xl">📈</span>
          <h3 className="font-semibold text-white">Track Progress</h3>
          <p className="text-sm text-gray-400">
            Monitor completed sessions to build better study habits
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <DashboardCard title="Pro Tips for Success" icon="💡">
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">1️⃣</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Silence Notifications</h4>
              <p className="text-sm text-gray-400">Mute all alerts during work sessions to maintain deep focus</p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">2️⃣</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Stay Hydrated</h4>
              <p className="text-sm text-gray-400">Drink water during break sessions to stay refreshed</p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">3️⃣</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Take Longer Breaks</h4>
              <p className="text-sm text-gray-400">After 4 sessions, take a 15-30 minute break for better recovery</p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">4️⃣</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Set Clear Goals</h4>
              <p className="text-sm text-gray-400">Define what you want to accomplish before starting a session</p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">5️⃣</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Track Your Sessions</h4>
              <p className="text-sm text-gray-400">Log completed sessions to visualize your productivity growth</p>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4 text-center space-y-2 hover:bg-white/[0.05] transition-smooth">
          <p className="text-xs text-gray-400">This Week</p>
          <p className="text-2xl font-bold text-cyan-400">18</p>
          <p className="text-xs text-gray-500">sessions</p>
        </div>

        <div className="glass-effect rounded-lg p-4 text-center space-y-2 hover:bg-white/[0.05] transition-smooth">
          <p className="text-xs text-gray-400">Total Time</p>
          <p className="text-2xl font-bold text-purple-400">7.5h</p>
          <p className="text-xs text-gray-500">focused</p>
        </div>

        <div className="glass-effect rounded-lg p-4 text-center space-y-2 hover:bg-white/[0.05] transition-smooth">
          <p className="text-xs text-gray-400">Streak</p>
          <p className="text-2xl font-bold text-green-400">5</p>
          <p className="text-xs text-gray-500">days</p>
        </div>

        <div className="glass-effect rounded-lg p-4 text-center space-y-2 hover:bg-white/[0.05] transition-smooth">
          <p className="text-xs text-gray-400">Avg/Day</p>
          <p className="text-2xl font-bold text-amber-400">2.5h</p>
          <p className="text-xs text-gray-500">study</p>
        </div>
      </div>
    </div>
  );
}
