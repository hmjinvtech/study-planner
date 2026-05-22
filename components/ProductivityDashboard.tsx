'use client';

import { useState, useEffect } from 'react';

interface Event {
  id: string;
  date: number;
  type: 'deadline' | 'study' | 'task';
  title: string;
  time: string;
}

interface AnalyticsData {
  completedTasks: number;
  totalTasks: number;
  studyStreak: number;
  totalFocusHours: number;
  productivityPercentage: number;
  thisWeekHours: number;
}

export default function ProductivityDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    completedTasks: 18,
    totalTasks: 24,
    studyStreak: 12,
    totalFocusHours: 87.5,
    productivityPercentage: 75,
    thisWeekHours: 24,
  });

  // Mock events
  const events: Event[] = [
    { id: '1', date: 5, type: 'deadline', title: 'Math Exam', time: '10:00 AM' },
    { id: '2', date: 8, type: 'study', title: 'Physics Study', time: '2:00 PM' },
    { id: '3', date: 12, type: 'deadline', title: 'Project Due', time: '11:59 PM' },
    { id: '4', date: 15, type: 'study', title: 'Chemistry Review', time: '3:00 PM' },
    { id: '5', date: 18, type: 'task', title: 'Assignment 5', time: '4:00 PM' },
    { id: '6', date: 22, type: 'deadline', title: 'Presentation', time: '9:00 AM' },
    { id: '7', date: 25, type: 'study', title: 'Biology Lab', time: '1:00 PM' },
    { id: '8', date: 28, type: 'task', title: 'Quiz Prep', time: '5:00 PM' },
  ];

  // Get calendar data
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Get events for a specific day
  const getEventsForDay = (day: number) => events.filter((e) => e.date === day);

  // Get event type color
  const getEventColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'study':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'task':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Get event type icon
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

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  // Animated counter effect
  const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = typeof value === 'number' ? value : 0;
      const duration = 1000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value]);

    return (
      <div className="text-center">
        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {displayValue}
        </p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="gradient-text text-5xl font-bold">Productivity Dashboard</h1>
        <p className="text-gray-400">Track your focus time, deadlines, and study sessions</p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Tasks */}
        <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium text-gray-400">📋 Tasks Completed</p>
            <div className="space-y-3">
              <p className="text-4xl font-bold text-cyan-400">{analyticsData.completedTasks}</p>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(analyticsData.completedTasks / analyticsData.totalTasks) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{analyticsData.totalTasks} total tasks</p>
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium text-gray-400">🔥 Study Streak</p>
            <div className="space-y-3">
              <p className="text-4xl font-bold text-purple-400">{analyticsData.studyStreak}</p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <p className="text-xs text-gray-400">consecutive days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Focus Hours */}
        <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium text-gray-400">⏱️ Focus Hours</p>
            <div className="space-y-3">
              <p className="text-4xl font-bold text-pink-400">{analyticsData.totalFocusHours}</p>
              <p className="text-xs text-gray-400">this month</p>
            </div>
          </div>
        </div>

        {/* Productivity Percentage */}
        <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative space-y-4">
            <p className="text-sm font-medium text-gray-400">📊 Productivity</p>
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <p className="text-4xl font-bold text-green-400">{analyticsData.productivityPercentage}</p>
                <p className="text-lg text-green-400 mb-1">%</p>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${analyticsData.productivityPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-effect-light rounded-3xl p-8 border border-white/10">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">{monthName}</h2>
            <div className="flex gap-3">
              <button
                onClick={previousMonth}
                className="px-4 py-2 rounded-lg glass-effect border border-white/10 text-white hover:border-white/30 transition-smooth active:scale-95"
              >
                ←
              </button>
              <button
                onClick={nextMonth}
                className="px-4 py-2 rounded-lg glass-effect border border-white/10 text-white hover:border-white/30 transition-smooth active:scale-95"
              >
                →
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty days */}
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-lg bg-white/5" />
            ))}

            {/* Calendar days */}
            {calendarDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isSelected = selectedDay === day;
              const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  className={`aspect-square rounded-lg p-2 transition-all duration-200 group ${
                    isSelected ? 'glass-effect border-cyan-500/50' : 'glass-effect hover:border-white/20'
                  } border border-white/10 flex flex-col items-start justify-start`}
                >
                  <span
                    className={`text-sm font-bold mb-1 ${
                      isToday
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
                        : 'text-white'
                    }`}
                  >
                    {day}
                  </span>

                  {/* Event indicators */}
                  <div className="flex gap-1 flex-wrap">
                    {dayEvents.slice(0, 2).map((event) => (
                      <span
                        key={event.id}
                        className={`text-xs px-1.5 py-0.5 rounded border ${getEventColor(event.type)}`}
                      >
                        {getEventIcon(event.type)}
                      </span>
                    ))}
                    {dayEvents.length > 2 && <span className="text-xs text-gray-400">+{dayEvents.length - 2}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏰</span>
              <span className="text-xs text-gray-400">Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <span className="text-xs text-gray-400">Study Session</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span className="text-xs text-gray-400">Task</span>
            </div>
          </div>
        </div>

        {/* Sidebar - Day Details and Stats */}
        <div className="space-y-6">
          {/* Selected Day Details */}
          <div className="glass-effect-light rounded-2xl p-6 border border-white/10 h-fit">
            <h3 className="text-lg font-bold text-white mb-4">
              {selectedDay ? `May ${selectedDay}, 2026` : 'Select a Day'}
            </h3>

            {selectedDay && selectedDayEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-lg p-4 border ${getEventColor(event.type)} transition-all duration-200 hover:scale-105`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-1">{getEventIcon(event.type)}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{event.title}</p>
                        <p className="text-xs opacity-80 mt-1">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedDay ? (
              <p className="text-sm text-gray-400">No events scheduled</p>
            ) : (
              <p className="text-sm text-gray-400">Click on a date to view events</p>
            )}
          </div>

          {/* This Week Stats */}
          <div className="glass-effect-light rounded-2xl p-6 border border-white/10 space-y-6">
            <h3 className="text-lg font-bold text-white">This Week</h3>

            <div className="space-y-4">
              {/* Hours Studied */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Study Hours</span>
                  <span className="text-lg font-bold text-cyan-400">{analyticsData.thisWeekHours}h</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: '68%' }}
                  />
                </div>
              </div>

              {/* Tasks Done */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Tasks Completed</span>
                  <span className="text-lg font-bold text-purple-400">12/16</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>

              {/* Consistency */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Consistency</span>
                  <span className="text-lg font-bold text-green-400">86%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    style={{ width: '86%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-effect rounded-lg p-4 text-center border border-white/10 hover:border-white/20 transition-smooth">
              <p className="text-2xl font-bold text-cyan-400">7</p>
              <p className="text-xs text-gray-400 mt-1">Upcoming</p>
            </div>
            <div className="glass-effect rounded-lg p-4 text-center border border-white/10 hover:border-white/20 transition-smooth">
              <p className="text-2xl font-bold text-pink-400">3</p>
              <p className="text-xs text-gray-400 mt-1">Overdue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
