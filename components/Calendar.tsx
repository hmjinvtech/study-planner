'use client';

import { useState } from 'react';

/**
 * Calendar Component
 * 
 * Features:
 * - Full monthly calendar view (May 2026)
 * - Event indicators (Deadlines, Study Sessions, Tasks)
 * - Day click to view event details
 * - Event legend with color coding
 * - Weekly stats sidebar
 * - Month navigation
 */

interface CalendarEvent {
  date: number;
  type: 'deadline' | 'study' | 'task';
  title: string;
  time?: string;
}

const events: CalendarEvent[] = [
  { date: 5, type: 'deadline', title: 'Math Exam', time: '10:00 AM' },
  { date: 8, type: 'study', title: 'Physics Study Session', time: '2:00 PM' },
  { date: 12, type: 'deadline', title: 'Chemistry Lab', time: '11:59 PM' },
  { date: 15, type: 'study', title: 'Group Study', time: '3:00 PM' },
  { date: 18, type: 'task', title: 'Complete Assignment', time: '5:00 PM' },
  { date: 22, type: 'deadline', title: 'Project Due', time: '4:00 PM' },
  { date: 25, type: 'study', title: 'Final Review', time: '10:00 AM' },
  { date: 28, type: 'task', title: 'Submit Report', time: '2:00 PM' },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return '⏰';
      case 'study':
        return '📚';
      case 'task':
        return '✓';
      default:
        return '•';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'text-red-400';
      case 'study':
        return 'text-purple-400';
      case 'task':
        return 'text-cyan-400';
      default:
        return 'text-gray-400';
    }
  };

  const dayEventsForSelected = selectedDate
    ? events.filter(e => e.date === selectedDate)
    : [];

  const daysInMonth = 31; // May 2026
  const firstDayOfMonth = new Date(2026, 4, 1).getDay(); // 0 = Sunday

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const stats = [
    { label: 'Study Hours', value: '24h' },
    { label: 'Tasks Completed', value: '12/16' },
    { label: 'Consistency', value: '86%' },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Productivity Dashboard</h1>
        <p className="text-gray-400">Track your focus time, deadlines, and study sessions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '📋 Tasks Completed', value: '18', sub: '24 total tasks' },
          { label: '🔥 Study Streak', value: '12', sub: 'consecutive days' },
          { label: '⏱️ Focus Hours', value: '87.5', sub: 'this month' },
          { label: '📊 Productivity', value: '75', sub: '%' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-effect-light rounded-lg p-4 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-effect-light rounded-xl p-6 border border-white/10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">May 2026</h2>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-cyan-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {days.map((day) => {
                const dayEvents = events.filter(e => e.date === day);
                const isSelected = day === selectedDate;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-lg p-2 text-center text-sm font-medium transition-smooth flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/50'
                        : 'glass-effect hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white">{day}</span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5">
                        {dayEvents.map((evt, idx) => (
                          <span key={idx} className="text-xs">
                            {getEventIcon(evt.type)}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              {[
                { icon: '⏰', label: 'Deadline', color: 'text-red-400' },
                { icon: '📚', label: 'Study Session', color: 'text-purple-400' },
                { icon: '✓', label: 'Task', color: 'text-cyan-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`text-lg ${item.color}`}>{item.icon}</span>
                  <span className="text-xs text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Day Details */}
          <div className="glass-effect-light rounded-xl p-6 border border-white/10">
            {selectedDate ? (
              <div>
                <h3 className="text-sm font-bold text-cyan-400 mb-4">May {selectedDate}, 2026</h3>
                {dayEventsForSelected.length > 0 ? (
                  <div className="space-y-3">
                    {dayEventsForSelected.map((evt, idx) => (
                      <div key={idx} className="space-y-1 pb-3 border-b border-white/10 last:border-0">
                        <p className="text-sm font-medium text-white">{evt.title}</p>
                        <p className={`text-xs ${getEventColor(evt.type)}`}>
                          {getEventIcon(evt.type)} {evt.type.charAt(0).toUpperCase() + evt.type.slice(1)}
                        </p>
                        {evt.time && <p className="text-xs text-gray-400">🕐 {evt.time}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No events scheduled</p>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-bold text-gray-400">Select a Day</h3>
                <p className="text-xs text-gray-500 mt-2">Click on a date to view events</p>
              </div>
            )}
          </div>

          {/* This Week Stats */}
          <div className="glass-effect-light rounded-xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-purple-400 mb-4">📊 This Week</h3>
            <div className="space-y-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-white font-medium">{stat.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" style={{ width: stat.value === '86%' ? '86%' : stat.value === '24h' ? '60%' : '75%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="glass-effect-light rounded-xl p-6 border border-white/10">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">Upcoming Events</p>
                <p className="text-2xl font-bold text-white">7</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Overdue Tasks</p>
                <p className="text-2xl font-bold text-red-400">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
