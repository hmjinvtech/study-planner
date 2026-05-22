'use client';

import { useState, useEffect } from 'react';

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [analytics] = useState({
    totalStudyHours: 156.5,
    totalTasks: 248,
    completedTasks: 186,
    averageDailyHours: 22.36,
    studySessions: 45,
    focusStreak: 12,
    mostActiveDay: 'Wednesday',
    productivityScore: 78,
  });

  const AnalyticCard = ({ title, value, unit, icon, trend }: any) => (
    <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-4xl font-bold text-white">{value}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">{unit}</span>
          {trend && (
            <span className={`flex items-center gap-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const SubjectBreakdown = [
    { name: 'Mathematics', hours: 45, color: 'from-cyan-500 to-blue-500' },
    { name: 'Physics', hours: 38, color: 'from-purple-500 to-pink-500' },
    { name: 'Chemistry', hours: 35, color: 'from-green-500 to-emerald-500' },
    { name: 'Biology', hours: 28, color: 'from-yellow-500 to-orange-500' },
    { name: 'English', hours: 10.5, color: 'from-red-500 to-pink-500' },
  ];

  const StudyPatterns = [
    { day: 'Mon', hours: 18 },
    { day: 'Tue', hours: 22 },
    { day: 'Wed', hours: 28 },
    { day: 'Thu', hours: 19 },
    { day: 'Fri', hours: 25 },
    { day: 'Sat', hours: 24 },
    { day: 'Sun', hours: 20 },
  ];

  const maxHours = Math.max(...StudyPatterns.map((p) => p.hours));

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          Analytics &amp; <span className="gradient-text">Insights</span>
        </h1>
        <p className="text-gray-400">Track your productivity and study patterns</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'year'].map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedTimeframe === timeframe
                ? 'glass-effect border border-cyan-500/50 text-cyan-400'
                : 'glass-effect border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticCard
          title="Study Hours"
          value={analytics.totalStudyHours}
          unit="hours this month"
          icon="⏱️"
          trend={12}
        />
        <AnalyticCard
          title="Tasks Completed"
          value={`${analytics.completedTasks}/${analytics.totalTasks}`}
          unit={`${Math.round((analytics.completedTasks / analytics.totalTasks) * 100)}% done`}
          icon="✓"
          trend={8}
        />
        <AnalyticCard
          title="Daily Average"
          value={analytics.averageDailyHours}
          unit="hours per day"
          icon="📊"
          trend={5}
        />
        <AnalyticCard
          title="Productivity Score"
          value={analytics.productivityScore}
          unit="/ 100"
          icon="🎯"
          trend={3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Pattern Chart */}
        <div className="lg:col-span-2 glass-effect-light rounded-3xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-8">Weekly Study Pattern</h2>
          <div className="flex items-end justify-around h-64 gap-2">
            {StudyPatterns.map((pattern) => (
              <div key={pattern.day} className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full glass-effect hover:border-cyan-500/50 rounded-t-lg transition-smooth group overflow-hidden relative" style={{ height: `${(pattern.hours / maxHours) * 200}px` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">{pattern.hours}h</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400">{pattern.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Stats Sidebar */}
        <div className="space-y-4">
          <div className="glass-effect-light rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Most Active</p>
                <p className="text-2xl font-bold text-cyan-400">{analytics.mostActiveDay}</p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Study Sessions</p>
                <p className="text-2xl font-bold text-purple-400">{analytics.studySessions}</p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-green-400">{analytics.focusStreak} days</p>
              </div>
            </div>
          </div>

          <div className="glass-effect-light rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Completion Rate</span>
                  <span className="text-sm font-bold text-cyan-400">75%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Focus Quality</span>
                  <span className="text-sm font-bold text-purple-400">82%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '82%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Consistency</span>
                  <span className="text-sm font-bold text-green-400">88%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="glass-effect-light rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Subject Breakdown</h2>
        <div className="space-y-4">
          {SubjectBreakdown.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">{subject.name}</span>
                <span className="text-sm font-bold text-gray-400">{subject.hours} hours</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-500`}
                  style={{ width: `${(subject.hours / analytics.totalStudyHours) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
