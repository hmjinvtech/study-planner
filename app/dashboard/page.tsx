'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [today, setToday] = useState('');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [stats, setStats] = useState({
    completedToday: 8,
    upcomingTasks: 12,
    focusHoursToday: 4.5,
    studyStreak: 12,
  });

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    setToday(date);
  }, []);

  // Handle task completion toggle
  const handleTaskToggle = (index: number) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter(i => i !== index));
      setStats(prev => ({ ...prev, completedToday: Math.max(0, prev.completedToday - 1) }));
    } else {
      setCompletedTasks([...completedTasks, index]);
      setStats(prev => ({ ...prev, completedToday: prev.completedToday + 1, upcomingTasks: Math.max(0, prev.upcomingTasks - 1) }));
    }
  };

  // Navigation handlers
  const handleStartFocus = () => router.push('/focus');
  const handleAddTask = () => router.push('/tasks');
  const handleViewSchedule = () => router.push('/study');
  const handleSettings = () => router.push('/settings');
  const handleViewAllTasks = () => router.push('/tasks');

  const StatCard = ({ icon, label, value, subtext, gradient }: any) => (
    <div className="modern-card group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
          <span className="text-2xl group-hover:scale-125 transition-transform">{icon}</span>
        </div>
        <div>
          <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{value}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
    </div>
  );

  const QuickTaskItem = ({ title, time, priority, index }: any) => (
    <div className="glass-effect rounded-xl p-4 flex items-center justify-between border border-white/10 hover:border-white/20 transition-smooth group hover:bg-white/5">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          className="w-5 h-5 rounded-md cursor-pointer accent-cyan-500 flex-shrink-0 hover:scale-110 transition-transform"
          checked={completedTasks.includes(index)}
          onChange={() => handleTaskToggle(index)}
        />
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium transition-all truncate ${
            completedTasks.includes(index)
              ? 'line-through text-gray-500'
              : 'text-white group-hover:text-cyan-300'
          }`}>
            {title}
          </p>
          <p className="text-xs text-gray-500 truncate">{time}</p>
        </div>
      </div>
      <span
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 ml-2 ${
          priority === 'high'
            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
            : priority === 'medium'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-green-500/20 text-green-300 border border-green-500/30'
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
        <div className="lg:col-span-2 modern-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Today's Tasks</h2>
            <button
              onClick={handleViewAllTasks}
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-smooth active:scale-95 group flex items-center gap-1"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task, idx) => (
              <QuickTaskItem key={idx} {...task} index={idx} />
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="modern-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">⏰ Deadlines</h2>
            <span className="badge-modern">Next 7 days</span>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="glass-effect rounded-xl p-4 border border-red-500/20 hover:border-red-500/40 transition-smooth group hover:bg-red-500/5">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-white group-hover:text-red-300 transition-smooth truncate flex-1">{deadline.title}</p>
                </div>
                <p className="text-xs text-gray-500 mb-1">{deadline.date}</p>
                <p className="text-xs text-gray-500 font-medium">📍 {deadline.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Study Progress */}
        <div className="modern-card">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            📊 Weekly Progress
          </h3>
          <div className="space-y-5">
            {[
              { label: 'Study Sessions', value: 12, max: 15, color: 'from-purple-500 to-pink-500' },
              { label: 'Focus Hours', value: 24, max: 30, color: 'from-cyan-500 to-blue-500' },
              { label: 'Tasks Completed', value: 18, max: 20, color: 'from-green-500 to-emerald-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</span>
                  <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {item.value}/{item.max}
                  </span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500 shadow-lg shadow-purple-500/20`}
                    style={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="modern-card">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            ⚡ Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Start Focus', icon: '⏱️', handler: handleStartFocus },
              { label: 'Add Task', icon: '➕', handler: handleAddTask },
              { label: 'Schedule', icon: '📅', handler: handleViewSchedule },
              { label: 'Settings', icon: '⚙️', handler: handleSettings },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.handler}
                className="glass-effect rounded-xl p-4 border border-white/10 hover:border-cyan-500/40 hover:bg-gradient-to-br hover:from-cyan-500/10 hover:to-blue-500/10 transition-all active:scale-95 text-center group"
              >
                <p className="text-2xl mb-2 group-hover:scale-125 transition-transform group-hover:animate-float">{action.icon}</p>
                <p className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
