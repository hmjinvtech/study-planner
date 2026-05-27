'use client';

import { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (title: string, subject: string, dueTime: string, priority: 'high' | 'medium' | 'low') => void;
  onClose?: () => void;
}

export default function AddTaskForm({ onAddTask, onClose }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [errors, setErrors] = useState<{ title?: string; dueTime?: string }>({});

  const validateForm = () => {
    const newErrors: { title?: string; dueTime?: string } = {};
    if (!title.trim()) newErrors.title = 'Task title is required';
    if (!dueTime.trim()) newErrors.dueTime = 'Due time is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTask(title, subject || 'General', dueTime, priority);

    // Reset form
    setTitle('');
    setSubject('');
    setDueTime('');
    setPriority('medium');
    setErrors({});
    setIsOpen(false);
  };

  return (
    <>
      {/* Add Task Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn-modern w-full mb-6 flex items-center justify-center gap-2"
      >
        <span className="text-xl">➕</span>
        Add New Task
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass-effect-light rounded-2xl p-6 z-50 shadow-2xl animate-in fade-in scale-95">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Add New Task</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-smooth text-2xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Task Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({ ...errors, title: undefined });
                }}
                placeholder="e.g., Complete Algebra Assignment"
                className={`w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-500 border outline-none transition-smooth ${
                  errors.title ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Physics"
                className="w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-500 border border-white/10 outline-none transition-smooth focus:border-cyan-500/50"
              />
            </div>

            {/* Due Time Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Due Time *</label>
              <input
                type="text"
                value={dueTime}
                onChange={(e) => {
                  setDueTime(e.target.value);
                  if (errors.dueTime) setErrors({ ...errors, dueTime: undefined });
                }}
                placeholder="e.g., 02:00 PM"
                className={`w-full px-4 py-3 glass-effect rounded-lg text-white placeholder-gray-500 border outline-none transition-smooth ${
                  errors.dueTime ? 'border-red-500/50' : 'border-white/10 focus:border-cyan-500/50'
                }`}
              />
              {errors.dueTime && <p className="text-red-400 text-xs mt-1">{errors.dueTime}</p>}
            </div>

            {/* Priority Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full px-4 py-3 glass-effect rounded-lg text-white border border-white/10 outline-none transition-smooth focus:border-cyan-500/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 glass-effect rounded-lg text-white border border-white/10 hover:bg-white/5 transition-smooth"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 btn-modern transition-smooth"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
