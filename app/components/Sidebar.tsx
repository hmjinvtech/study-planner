'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/dashboard' },
  { id: 'tasks', label: 'Tasks', icon: '✓', href: '/tasks' },
  { id: 'study', label: 'Study Planner', icon: '📚', href: '/study' },
  { id: 'calendar', label: 'Calendar', icon: '📅', href: '/calendar' },
  { id: 'focus', label: 'Focus Timer', icon: '⏲', href: '/focus' },
  { id: 'analytics', label: 'Analytics', icon: '📈', href: '/analytics' },
  { id: 'settings', label: 'Settings', icon: '⚙️', href: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-white/10 rounded-lg transition-smooth"
        aria-label="Toggle mobile sidebar"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen glass-effect-light transition-smooth z-40 flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        } ${
          !isMobileOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                📖
              </div>
              <h1 className="gradient-text text-lg font-bold">Planner</h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-smooth hidden lg:block"
            aria-label="Toggle sidebar"
          >
            {isOpen ? '◀' : '▶'}
          </button>
          <button
            onClick={toggleMobileSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-smooth lg:hidden"
            aria-label="Close mobile sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link key={item.id} href={item.href}>
              <div className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-smooth cursor-pointer">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                {isOpen && (
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-smooth">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-smooth cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              U
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">User</p>
                <p className="text-xs text-gray-400">student@mail.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
}
