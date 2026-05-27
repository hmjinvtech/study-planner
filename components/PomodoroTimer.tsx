'use client';

import { useState, useEffect, useRef } from 'react';

type Mode = 'focus' | 'break';

interface PomodoroTimerProps {
  workDuration?: number;
  breakDuration?: number;
}

export default function PomodoroTimer({ workDuration = 25 * 60, breakDuration = 5 * 60 }: PomodoroTimerProps = {}) {
  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState(workDuration); // Default 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const FOCUS_TIME = workDuration; // Configurable focus time
  const BREAK_TIME = breakDuration; // Configurable break time
  const totalTime = mode === 'focus' ? FOCUS_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Timer countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up - switch mode
            if (mode === 'focus') {
              setMode('break');
              setSessionsCompleted((s) => s + 1);
              playNotification();
              return BREAK_TIME;
            } else {
              setMode('focus');
              playNotification();
              return FOCUS_TIME;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  // Play notification sound
  const playNotification = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = mode === 'focus' ? 800 : 600;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio notification not available');
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(FOCUS_TIME);
    setSessionsCompleted(0);
  };

  const handleSkip = () => {
    if (mode === 'focus') {
      setMode('break');
      setSessionsCompleted((s) => s + 1);
      setTimeLeft(BREAK_TIME);
    } else {
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
    }
    setIsRunning(false);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // SVG Circle progress
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Focus Timer</h1>
        <p className="text-gray-400">Stay focused with the Pomodoro technique</p>
      </div>

      {/* Mode Indicator */}
      <div className="flex justify-center gap-4">
        <div
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            mode === 'focus'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
              : 'glass-effect text-gray-400'
          }`}
        >
          📚 Focus Mode
        </div>
        <div
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            mode === 'break'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
              : 'glass-effect text-gray-400'
          }`}
        >
          ☕ Break Mode
        </div>
      </div>

      {/* Main Timer Card */}
      <div className="glass-effect-light rounded-3xl p-12 border border-white/10 space-y-8">
        {/* Circular Progress Timer */}
        <div className="flex justify-center items-center">
          <div className="relative w-64 h-64">
            {/* Background Circle */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="6"
              />
              {/* Progress Circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={mode === 'focus' ? 'url(#gradientFocus)' : 'url(#gradientBreak)'}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {/* Gradients */}
              <defs>
                <linearGradient id="gradientFocus" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="gradientBreak" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                  {mode === 'focus' ? 'Focus' : 'Break'}
                </p>
                <div className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-mono">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Display */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="glass-effect rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Sessions</p>
            <p className="text-3xl font-bold text-cyan-400">{sessionsCompleted}</p>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Status</p>
            <p className={`text-3xl font-bold ${isRunning ? 'text-green-400' : 'text-yellow-400'}`}>
              {isRunning ? '▶' : '⏸'}
            </p>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Progress</p>
            <p className="text-3xl font-bold text-purple-400">{Math.round(progress)}%</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-effect-light rounded-2xl p-6 border border-white/10 space-y-4">
        {/* Primary Controls */}
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              ▶ Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-amber-500/50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              ⏸ Pause
            </button>
          )}

          <button
            onClick={handleSkip}
            className="flex-1 px-6 py-4 rounded-xl glass-effect border border-white/20 text-white font-bold text-lg hover:border-white/40 hover:bg-white/5 active:scale-95 transition-all duration-200"
          >
            ⏭ Skip
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full px-6 py-3 rounded-xl glass-effect border border-red-500/30 text-red-300 font-bold hover:bg-red-500/10 hover:border-red-500/50 active:scale-95 transition-all duration-200"
        >
          🔄 Reset Session
        </button>
      </div>

      {/* Tips Section */}
      <div className="glass-effect-light rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          💡 Pomodoro Tips
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-cyan-400 font-bold">1.</span>
            <span>Find a quiet place and eliminate distractions during focus sessions</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-cyan-400 font-bold">2.</span>
            <span>Use break time to rest, hydrate, or stretch</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-cyan-400 font-bold">3.</span>
            <span>Aim for 4-5 sessions before taking a longer 15-30 minute break</span>
          </li>
          <li className="flex items-start gap-3 text-gray-300">
            <span className="text-cyan-400 font-bold">4.</span>
            <span>Track your sessions to build consistency</span>
          </li>
        </ul>
      </div>

      {/* Statistics */}
      <div className="glass-effect-light rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">📊 Session Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Total Focus Time</p>
            <p className="text-2xl font-bold text-cyan-400">{sessionsCompleted * 25} min</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Completed Sessions</p>
            <p className="text-2xl font-bold text-purple-400">{sessionsCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
