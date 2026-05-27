'use client';

import { useState } from 'react';

/**
 * Navbar Component
 * 
 * Features:
 * - Fixed top navigation bar
 * - Current date display
 * - Search functionality
 * - Notification bell with pulse animation
 * - Dropdown menu with theme/settings options
 * - Responsive design (hidden elements on mobile)
 * - Glass-morphism styling
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-20 z-30 transition-all duration-300">
      {/* Modern Glass Background */}
      <div className="absolute inset-0 glass-effect-light" />
      
      <div className="relative flex items-center justify-between px-4 lg:px-8 h-full">
        {/* Left Section */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="min-w-0">
            <p className="text-xs lg:text-sm text-gray-400 truncate font-medium">Welcome back</p>
            <h2 className="text-base lg:text-lg font-bold text-white truncate">Today's Dashboard</h2>
          </div>
        </div>

        {/* Center Section - Date */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg hover-lift" style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(124, 58, 237, 0.2)'
        }}>
          <span className="text-sm text-gray-300 whitespace-nowrap">📅 {currentDate}</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          {/* Search - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span className="text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent border-none outline-none text-xs lg:text-sm text-white placeholder-gray-500 w-24 lg:w-32"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-white/10 rounded-lg transition-smooth group">
            <span className="text-lg lg:text-xl group-hover:scale-110 transition-transform">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          </button>

          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 hover:bg-white/10 rounded-lg transition-smooth group"
            aria-label="Toggle menu"
          >
            <span className="text-lg lg:text-xl group-hover:scale-110 transition-transform">⋮</span>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-20 right-4 w-40 lg:w-48 rounded-xl overflow-hidden shadow-lg z-50 animate-fade-in-up"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
              <div className="py-2">
                {['Settings', 'Theme', 'Help', 'Logout'].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-3 text-xs lg:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
