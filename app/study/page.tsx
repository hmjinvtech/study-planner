'use client';

import { useState } from 'react';
import DashboardCard from '@/app/components/DashboardCard';

interface StudySession {
  id: string;
  subject: string;
  duration: number; // in minutes
  date: string;
  timeSlot: string;
  completed: boolean;
}

export default function StudyPlannerPage() {
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      subject: 'Mathematics',
      duration: 90,
      date: '2026-05-22',
      timeSlot: '09:00 AM - 10:30 AM',
      completed: true,
    },
    {
      id: '2',
      subject: 'Physics',
      duration: 60,
      date: '2026-05-22',
      timeSlot: '11:00 AM - 12:00 PM',
      completed: false,
    },
    {
      id: '3',
      subject: 'History',
      duration: 45,
      date: '2026-05-22',
      timeSlot: '02:00 PM - 2:45 PM',
      completed: false,
    },
    {
      id: '4',
      subject: 'Computer Science',
      duration: 120,
      date: '2026-05-23',
      timeSlot: '10:00 AM - 12:00 PM',
      completed: false,
    },
    {
      id: '5',
      subject: 'Biology',
      duration: 75,
      date: '2026-05-23',
      timeSlot: '03:00 PM - 4:15 PM',
      completed: false,
    },
  ]);

  const totalMinutes = sessions.reduce((acc, s) => acc + s.duration, 0);
  const completedMinutes = sessions.filter(s => s.completed).reduce((acc, s) => acc + s.duration, 0);
  const completedSessions = sessions.filter(s => s.completed).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Study Planner</h1>
        <p className="text-gray-400">
          Plan your study sessions and track your learning progress
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total Study Time</p>
              <p className="text-2xl font-bold text-white">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</p>
            </div>
            <span className="text-2xl">⏱</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </div>

        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 mb-1">Completed</p>
              <p className="text-2xl font-bold text-cyan-400">{completedSessions}</p>
            </div>
            <span className="text-2xl">✓</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500" />
          </div>
        </div>

        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 mb-1">Completed Time</p>
              <p className="text-2xl font-bold text-green-400">{Math.floor(completedMinutes / 60)}h {completedMinutes % 60}m</p>
            </div>
            <span className="text-2xl">🎯</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-green-500 to-emerald-500" />
          </div>
        </div>

        <div className="glass-effect-light rounded-lg p-6 space-y-3 hover:bg-white/[0.1] transition-smooth">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-400 mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-amber-400">{Math.round((completedMinutes / totalMinutes) * 100)}%</p>
            </div>
            <span className="text-2xl">📊</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-orange-500" />
          </div>
        </div>
      </div>

      {/* Study Sessions */}
      <DashboardCard title="Study Sessions" icon="📚">
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`p-4 rounded-lg border transition-smooth ${
                session.completed
                  ? 'glass-effect opacity-50 line-through'
                  : 'glass-effect-light hover:bg-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={session.completed}
                      onChange={() => {
                        setSessions(
                          sessions.map(s =>
                            s.id === session.id ? { ...s, completed: !s.completed } : s
                          )
                        );
                      }}
                      className="w-4 h-4 rounded cursor-pointer"
                    />
                    <h4 className={`font-semibold ${session.completed ? 'text-gray-500' : 'text-white'}`}>
                      {session.subject}
                    </h4>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400 ml-7">
                    <span>📅 {session.date}</span>
                    <span>🕐 {session.timeSlot}</span>
                    <span>⏱ {session.duration} min</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  session.completed
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {session.completed ? '✓ Done' : '⧖ Pending'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Weekly Overview */}
      <DashboardCard title="Weekly Overview" icon="📅">
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
            <div key={day} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">{day}</span>
                <span className="text-xs text-gray-500">{(idx + 1) * 2}h planned</span>
              </div>
              <div className="h-2 glass-effect rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(idx + 1) * 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
