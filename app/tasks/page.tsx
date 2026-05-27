'use client';

import { useState } from 'react';
import DashboardCard from '@/app/components/DashboardCard';
import TaskList from '@/app/components/TaskList';
import AddTaskForm from '@/app/components/AddTaskForm';

interface Task {
  id: string;
  title: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subject?: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, subject: string, dueTime: string, priority: 'high' | 'medium' | 'low') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      dueTime,
      priority,
      completed: false,
      subject,
    };
    setTasks([newTask, ...tasks]);
  };

  const highPriorityCount = tasks.filter((t) => !t.completed && t.priority === 'high').length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Tasks Manager</h1>
        <p className="text-gray-400">
          Organize, prioritize, and track all your academic assignments
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-effect-light rounded-lg p-4 flex items-center gap-3 hover:bg-white/[0.1] transition-smooth cursor-pointer">
          <span className="text-2xl">🎯</span>
          <div>
            <p className="text-xs text-gray-400">High Priority</p>
            <p className="text-lg font-bold text-red-400">{highPriorityCount} task{highPriorityCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="glass-effect-light rounded-lg p-4 flex items-center gap-3 hover:bg-white/[0.1] transition-smooth cursor-pointer">
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-xs text-gray-400">Total Tasks</p>
            <p className="text-lg font-bold text-cyan-400">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="glass-effect-light rounded-lg p-4 flex items-center gap-3 hover:bg-white/[0.1] transition-smooth cursor-pointer">
          <span className="text-2xl">✓</span>
          <div>
            <p className="text-xs text-gray-400">Completed</p>
            <p className="text-lg font-bold text-green-400">{completedCount} task{completedCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Task List */}
      <DashboardCard title="All Tasks" icon="📋">
        <TaskList initialTasks={tasks} showCompleted={true} />
      </DashboardCard>
    </div>
  );
}
