'use client';

import { useState, useRef } from 'react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review calculus concepts',
      priority: 'high',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Complete physics homework',
      priority: 'medium',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Read history chapter',
      priority: 'low',
      completed: true,
      createdAt: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  // Add task
  const handleAddTask = () => {
    if (inputValue.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: inputValue,
      priority: selectedPriority,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([newTask, ...tasks]);
    setInputValue('');
    inputRef.current?.focus();
  };

  // Mark task complete
  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high' && !t.completed).length;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Task Manager</h1>
        <p className="text-gray-400">Organize your tasks with priority levels and track your progress.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-effect-light rounded-xl p-4 border-l-4 border-cyan-500 hover:bg-white/[0.08] transition-smooth">
          <p className="text-sm text-gray-400 font-medium">Total Tasks</p>
          <p className="text-3xl font-bold text-cyan-400">{totalTasks}</p>
        </div>
        <div className="glass-effect-light rounded-xl p-4 border-l-4 border-green-500 hover:bg-white/[0.08] transition-smooth">
          <p className="text-sm text-gray-400 font-medium">Completed</p>
          <p className="text-3xl font-bold text-green-400">{completedTasks}</p>
        </div>
        <div className="glass-effect-light rounded-xl p-4 border-l-4 border-red-500 hover:bg-white/[0.08] transition-smooth">
          <p className="text-sm text-gray-400 font-medium">High Priority</p>
          <p className="text-3xl font-bold text-red-400">{highPriorityTasks}</p>
        </div>
      </div>

      {/* Add Task Section */}
      <div className="glass-effect-light rounded-2xl p-6 space-y-4 border border-white/10 hover:border-white/20 transition-smooth">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          ➕ Add New Task
        </h2>

        <div className="space-y-4">
          {/* Input Field */}
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 px-5 py-3 rounded-xl glass-effect border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-smooth"
            />
            <button
              onClick={handleAddTask}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 transition-all duration-200"
            >
              Add Task
            </button>
          </div>

          {/* Priority Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-400">Priority:</span>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map((priority) => (
                <button
                  key={priority}
                  onClick={() => setSelectedPriority(priority)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedPriority === priority
                      ? priority === 'high'
                        ? 'bg-red-500/30 text-red-300 border-2 border-red-500 shadow-lg shadow-red-500/30'
                        : priority === 'medium'
                        ? 'bg-amber-500/30 text-amber-300 border-2 border-amber-500 shadow-lg shadow-amber-500/30'
                        : 'bg-green-500/30 text-green-300 border-2 border-green-500 shadow-lg shadow-green-500/30'
                      : 'glass-effect border border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {getPriorityDot(priority)} {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Your Tasks</h2>

        {tasks.length === 0 ? (
          <div className="glass-effect-light rounded-xl p-12 text-center border border-dashed border-white/20">
            <p className="text-3xl mb-2">✨</p>
            <p className="text-gray-400">No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`glass-effect-light rounded-xl p-4 border border-white/10 hover:border-white/20 group transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      task.completed
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-500 shadow-lg shadow-cyan-500/30'
                        : 'border-white/20 hover:border-cyan-500 group-hover:border-white/30'
                    }`}
                  >
                    {task.completed && <span className="text-white text-sm">✓</span>}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base font-medium transition-all duration-200 ${
                        task.completed
                          ? 'text-gray-500 line-through'
                          : 'text-white group-hover:text-cyan-300'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  {/* Priority Badge */}
                  <span
                    className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(
                      task.priority
                    )} transition-all duration-200`}
                  >
                    {getPriorityDot(task.priority)} {task.priority.toUpperCase()}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
                    title="Delete task"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {totalTasks > 0 && (
        <div className="glass-effect-light rounded-xl p-4 space-y-3 border border-white/10">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-400">Overall Progress</p>
            <p className="text-sm font-bold text-cyan-400">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </p>
          </div>
          <div className="w-full h-3 glass-effect rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
