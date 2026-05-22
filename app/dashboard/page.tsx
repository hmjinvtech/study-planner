'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [today, setToday] = useState('');
  const [stats] = useState({
    completedToday: 8,
    upcomingTasks: 12,
    focusHoursToday: 4.5,
    studyStreak: 12,
  });

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    setToday(date);
  }, []);

  const StatCard = ({ icon, label, value, subtext, gradient }: any) => (
    <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-4xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{subtext}</p>
      </div>
    </div>
  );

  const QuickTaskItem = ({ title, time, priority }: any) => (
    <div className="glass-effect rounded-lg p-4 flex items-center justify-between border border-white/10 hover:border-white/20 transition-smooth group">
      <div className="flex items-center gap-3 flex-1">
        <input type="checkbox" className="w-4 h-4 rounded" />
        <div>
          <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-smooth">{title}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <span
        className={`px-3 py-1 rounded text-xs font-medium ${
          priority === 'high'
            ? 'bg-red-500/20 text-red-300'
            : priority === 'medium'
              ? 'bg-amber-500/20 text-amber-300'
              : 'bg-green-500/20 text-green-300'
        }`}
      >
        {priority}
      </span>
    </div>
  );

  const upcomingDeadlines = [
    { id: 1, title: 'Math Exam', date: 'May 25', time: '10:00 AM' },
    { id: 2, title: 'Physics Assignment', date: 'May 27', time: '11:59 PM' },
    { id: 3, title: 'Chemistry Lab Report', date: 'May 28', time: '2:00 PM' },
  ];

  const recentTasks = [
    { title: 'Complete Algebra Problems', time: '10:30 AM', priority: 'high' },
    { title: 'Review Study Guide', time: '1:00 PM', priority: 'medium' },
    { title: 'Group Project Discussion', time: '3:00 PM', priority: 'medium' },
    { title: 'Organize Notes', time: '4:30 PM', priority: 'low' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Welcome back</p>
        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          Dashboard <span className="gradient-text">Overview</span>
        </h1>
        <p className="text-gray-400">{today}</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="✓"
          label="Completed Today"
          value={stats.completedToday}
          subtext="tasks finished"
          gradient="from-cyan-500 to-blue-500"
        />
        <StatCard
          icon="📋"
          label="Upcoming Tasks"
          value={stats.upcomingTasks}
          subtext="in the pipeline"
          gradient="from-purple-500 to-pink-500"
        />
        <StatCard
          icon="⏱️"
          label="Focus Hours"
          value={`${stats.focusHoursToday}h`}
          subtext="today's progress"
          gradient="from-green-500 to-emerald-500"
        />
        <StatCard
          icon="🔥"
          label="Study Streak"
          value={stats.studyStreak}
          subtext="consecutive days"
          gradient="from-pink-500 to-red-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Tasks */}
        <div className="lg:col-span-2 glass-effect-light rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Today's Tasks</h2>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-smooth">View All →</button>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task, idx) => (
              <QuickTaskItem key={idx} {...task} />
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="glass-effect-light rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Deadlines</h2>
            <span className="text-xs text-gray-400">Next 7 days</span>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="glass-effect rounded-lg p-4 border border-red-500/20 hover:border-red-500/40 transition-smooth group">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-white group-hover:text-red-300 transition-smooth">{deadline.title}</p>
                  <span className="text-lg">⏰</span>
                </div>
                <p className="text-xs text-gray-400">{deadline.date}</p>
                <p className="text-xs text-gray-500 mt-1">{deadline.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Progress */}
        <div className="glass-effect-light rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white">Weekly Progress</h3>
          <div className="space-y-3">
            {[
              { label: 'Study Sessions', value: 12, max: 15, color: 'from-purple-500 to-pink-500' },
              { label: 'Focus Hours', value: 24, max: 30, color: 'from-cyan-500 to-blue-500' },
              { label: 'Tasks Completed', value: 18, max: 20, color: 'from-green-500 to-emerald-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-400">{item.label}</span>
                  <span className="text-sm font-bold text-white">{item.value}/{item.max}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="glass-effect-light rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Start Focus Session', icon: '⏱️', color: 'cyan' },
              { label: 'Add Task', icon: '➕', color: 'purple' },
              { label: 'View Schedule', icon: '📅', color: 'blue' },
              { label: 'Settings', icon: '⚙️', color: 'gray' },
            ].map((action) => (
              <button
                key={action.label}
                className={`glass-effect rounded-lg p-4 border border-white/10 hover:border-white/20 transition-smooth active:scale-95 text-center group`}
              >
                <p className="text-2xl mb-2">{action.icon}</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-smooth">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
