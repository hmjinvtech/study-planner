'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

/**
 * Sidebar Navigation Component
 * 
 * Features:
 * - Fixed collapsible sidebar with 7 navigation items
 * - Mobile responsive hamburger menu
 * - Active route highlighting
 * - Smooth transitions
 * - Glass-morphism design
 */
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 hover:bg-white/10 rounded-lg transition-smooth group"
        aria-label="Toggle mobile sidebar"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">{isMobileOpen ? '✕' : '☰'}</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen transition-all duration-300 z-40 flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        } ${
          !isMobileOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
        } lg:translate-x-0`}
      >
        {/* Glass Background */}
        <div className="absolute inset-0 glass-effect-light border-r border-white/10" />

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            {isOpen && (
              <div className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  📚
                </div>
                <div>
                  <h1 className="text-white text-sm font-bold">Study Planner</h1>
                  <p className="text-xs text-gray-400">v1.0</p>
                </div>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/10 rounded-lg transition-smooth hidden lg:block group"
              aria-label="Toggle sidebar"
            >
              <span className="group-hover:scale-125 transition-transform inline-block">{isOpen ? '◀' : '▶'}</span>
            </button>
            <button
              onClick={toggleMobileSidebar}
              className="p-2 hover:bg-white/10 rounded-lg transition-smooth lg:hidden group"
              aria-label="Close mobile sidebar"
            >
              <span className="group-hover:scale-125 transition-transform inline-block">✕</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <div
                  className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                  {isOpen && (
                    <>
                      <span
                        className={`text-sm font-medium transition-all duration-300 flex-1 ${
                          isActive(item.href)
                            ? 'text-white'
                            : 'text-gray-300 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive(item.href) && (
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                      )}
                    </>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-xl transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                U
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">Student</p>
                  <p className="text-xs text-gray-400 truncate">pro@account.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
