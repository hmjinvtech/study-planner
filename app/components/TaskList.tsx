'use client';

import { useState } from 'react';
import TaskCard from './TaskCard';

interface Task {
  id: string;
  title: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subject?: string;
}

interface TaskListProps {
  initialTasks?: Task[];
  showCompleted?: boolean;
  maxItems?: number;
}

export default function TaskList({
  initialTasks = [],
  showCompleted = true,
  maxItems,
}: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (title: string, subject: string, dueTime: string, priority: 'high' | 'medium' | 'low') => {
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

  // Filter tasks
  let filteredTasks = tasks.filter((task) => {
    const matchesCompletion = showCompleted ? true : !task.completed;
    const matchesPriority = filterPriority === 'all' ? true : task.priority === filterPriority;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    return matchesCompletion && matchesPriority && matchesSearch;
  });

  if (maxItems) {
    filteredTasks = filteredTasks.slice(0, maxItems);
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const highPriorityCount = tasks.filter((t) => !t.completed && t.priority === 'high').length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="glass-effect rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-bold text-white">{tasks.length}</p>
        </div>
        <div className="glass-effect rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Completed</p>
          <p className="text-lg font-bold text-cyan-400">{completedCount}</p>
        </div>
        <div className="glass-effect rounded-lg p-3 text-center">
          <p className="text-xs text-gray-400">Urgent</p>
          <p className="text-lg font-bold text-red-400">{highPriorityCount}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 glass-effect rounded-lg text-sm text-white placeholder-gray-500 border-0 outline-none transition-smooth focus:bg-white/[0.12]"
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as any)}
          className="px-4 py-2 glass-effect rounded-lg text-sm text-white border-0 outline-none transition-smooth focus:bg-white/[0.12]"
        >
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="relative group">
              <TaskCard task={task} onToggle={toggleTask} />
              <button
                onClick={() => deleteTask(task.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 transition-smooth"
                title="Delete task"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="glass-effect rounded-lg p-8 text-center">
            <p className="text-gray-400">No tasks found</p>
            <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-semibold text-white">
              {Math.round((completedCount / tasks.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 glass-effect rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
