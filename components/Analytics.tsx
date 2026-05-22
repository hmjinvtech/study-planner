'use client';

import { useState } from 'react';

/**
 * Analytics Component
 * 
 * Features:
 * - Timeframe selector (Week/Month/Year)
 * - 4 key performance metrics with trends
 * - Weekly study pattern visualization
 * - Subject breakdown with progress bars
 * - Performance metrics sidebar
 * - Key insights section
 */

interface AnalyticsMetric {
  label: string;
  icon: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const metrics: AnalyticsMetric[] = [
  { label: 'Study Hours', icon: '⏱️', value: '156.5', change: '↑ 12%', trend: 'up' },
  { label: 'Tasks Completed', icon: '✓', value: '186/248', change: '↑ 8%', trend: 'up' },
  { label: 'Daily Average', icon: '📊', value: '22.36', change: '↑ 5%', trend: 'up' },
  { label: 'Productivity Score', icon: '🎯', value: '78', change: '↑ 3%', trend: 'up' },
];

const weeklyData = [
  { day: 'Mon', hours: 18 },
  { day: 'Tue', hours: 22 },
  { day: 'Wed', hours: 28 },
  { day: 'Thu', hours: 19 },
  { day: 'Fri', hours: 25 },
  { day: 'Sat', hours: 24 },
  { day: 'Sun', hours: 20 },
];

const subjects = [
  { name: 'Mathematics', hours: 45 },
  { name: 'Physics', hours: 38 },
  { name: 'Chemistry', hours: 35 },
  { name: 'Biology', hours: 28 },
  { name: 'English', hours: 10.5 },
];

export default function Analytics() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Analytics & Insights</h1>
        <p className="text-gray-400">Track your productivity and study patterns</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {(['week', 'month', 'year'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
              timeframe === tf
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="glass-effect-light rounded-xl p-6 border border-white/10 hover:border-white/20 transition-smooth group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{metric.icon}</span>
                <span className={`text-xs font-medium ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">{metric.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Pattern & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-effect-light rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6">Weekly Study Pattern</h2>
          <div className="space-y-8">
            {weeklyData.map((data) => (
              <div key={data.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">{data.day}</span>
                  <span className="text-sm text-cyan-400">{data.hours}h</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${(data.hours / maxHours) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-4">
          {/* Key Insights */}
          <div className="glass-effect-light rounded-xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-cyan-400 mb-4">🎯 Key Insights</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">Most Active</p>
                <p className="text-lg font-bold text-white">Wednesday</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Study Sessions</p>
                <p className="text-lg font-bold text-white">45</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Current Streak</p>
                <p className="text-lg font-bold text-white">12 days</p>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="glass-effect-light rounded-xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-purple-400 mb-4">📊 Performance</h3>
            <div className="space-y-4">
              {[
                { label: 'Completion Rate', value: '75%' },
                { label: 'Focus Quality', value: '82%' },
                { label: 'Consistency', value: '88%' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="glass-effect-light rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Subject Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">{subject.name}</span>
                <span className="text-xs text-cyan-400">{subject.hours}h</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${(subject.hours / 45) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
