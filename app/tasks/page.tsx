'use client';

import { useState } from 'react';
import DashboardCard from '@/app/components/DashboardCard';
import TaskList from '@/app/components/TaskList';

const defaultTasks = [
  {
    id: '1',
    title: 'Complete Calculus Assignment - Chapter 5',
    dueTime: '02:00 PM',
    priority: 'high' as const,
    completed: false,
    subject: 'Mathematics',
  },
  {
    id: '2',
    title: 'Read Chapter 8 of Physics Textbook',
    dueTime: '03:30 PM',
    priority: 'medium' as const,
    completed: false,
    subject: 'Physics',
  },
  {
    id: '3',
    title: 'Prepare presentation slides for History',
    dueTime: '05:00 PM',
    priority: 'high' as const,
    completed: false,
    subject: 'History',
  },
  {
    id: '4',
    title: 'Code review for CS project',
    dueTime: '04:00 PM',
    priority: 'medium' as const,
    completed: false,
    subject: 'Computer Science',
  },
  {
    id: '5',
    title: 'Biology lab report submission',
    dueTime: '11:59 PM',
    priority: 'low' as const,
    completed: true,
    subject: 'Biology',
  },
];

export default function TasksPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Tasks Manager</h1>
        <p className="text-gray-400">
          Organize, prioritize, and track all your academic assignments
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-effect-light rounded-lg p-4 flex items-center gap-3 hover:bg-white/[0.1] transition-smooth cursor-pointer">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="text-xs text-gray-400">High Priority</p>
            <p className="text-lg font-bold text-red-400">3 tasks</p>
          </div>
        </div>
        <div className="glass-effect-light rounded-lg p-4 flex items-center gap-3 hover:bg-white/[0.1] transition-smooth cursor-pointer">
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-xs text-gray-400">Due Today</p>
            <p className="text-lg font-bold text-cyan-400">5 tasks</p>
          </div>
        </div>
        <div className="glass-effect-light rounded-lg p-4 flex items-center gap-3 hover:bg-white/[0.1] transition-smooth cursor-pointer">
          <span className="text-2xl">✓</span>
          <div>
            <p className="text-xs text-gray-400">Completed</p>
            <p className="text-lg font-bold text-green-400">1 task</p>
          </div>
        </div>
      </div>

      {/* Task List */}
      <DashboardCard title="All Tasks" icon="📋">
        <TaskList initialTasks={defaultTasks} showCompleted={true} />
      </DashboardCard>
    </div>
  );
}
