'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-20 glass-effect-light border-b border-white/10 flex items-center justify-between px-4 lg:px-8 z-30 transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div className="min-w-0">
          <p className="text-xs lg:text-sm text-gray-400 truncate">Welcome back</p>
          <h2 className="text-base lg:text-xl font-semibold text-white truncate">Today's Dashboard</h2>
        </div>
      </div>

      {/* Center Section - Date and Time */}
      <div className="hidden md:flex items-center gap-2 px-3 lg:px-4 py-2 glass-effect rounded-lg flex-shrink-0">
        <span className="text-xs lg:text-sm text-gray-300 whitespace-nowrap">📅 {currentDate}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
        {/* Search - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 glass-effect rounded-lg">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-xs lg:text-sm text-white placeholder-gray-500 w-24 lg:w-32"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-smooth">
          <span className="text-lg lg:text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        </button>

        {/* Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-smooth"
        >
          <span className="text-lg lg:text-xl">⋮</span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 right-4 w-40 lg:w-48 glass-effect-light rounded-lg overflow-hidden shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              {['Settings', 'Theme', 'Help'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2 text-xs lg:text-sm text-gray-300 hover:bg-white/10 transition-smooth"
                  onClick={() => {
                    if (item === 'Settings') window.location.href = '/settings';
                    setIsMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
