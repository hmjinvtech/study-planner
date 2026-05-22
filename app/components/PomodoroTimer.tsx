'use client';

import { useState, useEffect, useRef } from 'react';

interface PomodoroTimerProps {
  workDuration?: number; // in seconds
  breakDuration?: number; // in seconds
}

type SessionType = 'work' | 'break';

export default function PomodoroTimer({
  workDuration = 25 * 60,
  breakDuration = 5 * 60,
}: PomodoroTimerProps) {
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          playNotification();
          switchSession();
          return sessionType === 'work' ? breakDuration : workDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, sessionType, workDuration, breakDuration]);

  const playNotification = () => {
    // Use Web Audio API for notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const switchSession = () => {
    if (sessionType === 'work') {
      setSessionType('break');
      setSessionsCompleted((prev) => prev + 1);
    } else {
      setSessionType('work');
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionType('work');
    setTimeLeft(workDuration);
  };

  const skipSession = () => {
    switchSession();
    setTimeLeft(sessionType === 'work' ? breakDuration : workDuration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = sessionType === 'work'
    ? ((workDuration - timeLeft) / workDuration) * 100
    : ((breakDuration - timeLeft) / breakDuration) * 100;

  return (
    <div className="space-y-6">
      {/* Session Type Indicator */}
      <div className="flex justify-center">
        <div className="flex gap-4 p-4 glass-effect rounded-xl">
          {(['work', 'break'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                if (!isRunning) {
                  setSessionType(type);
                  setTimeLeft(type === 'work' ? workDuration : breakDuration);
                }
              }}
              className={`px-6 py-2 rounded-lg font-medium transition-smooth ${
                sessionType === type
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type === 'work' ? '🔴 Work' : '🟢 Break'}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      <div className="relative flex justify-center items-center">
        <svg
          className="absolute w-64 h-64 transform -rotate-90"
          style={{ filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.3))' }}
        >
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke={sessionType === 'work' ? '#06b6d4' : '#10b981'}
            strokeWidth="8"
            strokeDasharray={`${(progressPercentage / 100) * 2 * Math.PI * 120} ${
              2 * Math.PI * 120
            }`}
            className="transition-all duration-1000"
          />
        </svg>

        <div className="text-center">
          <div className="text-6xl font-bold text-white font-mono mb-2">
            {formatTime(timeLeft)}
          </div>
          <p className="text-xl text-gray-400 mb-4 capitalize">
            {sessionType === 'work' ? '🎯 Focus Time' : '☕ Take a Break'}
          </p>
          <p className="text-sm text-gray-500">
            Sessions completed: <span className="text-cyan-400 font-semibold">{sessionsCompleted}</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={toggleTimer}
          className="flex-1 max-w-xs px-6 py-3 rounded-lg font-medium transition-smooth bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50"
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>

        <button
          onClick={skipSession}
          className="px-6 py-3 glass-effect-light rounded-lg font-medium text-white hover:bg-white/[0.12] transition-smooth"
          title="Skip to next session"
        >
          ⏭ Skip
        </button>

        <button
          onClick={resetTimer}
          className="px-6 py-3 glass-effect-light rounded-lg font-medium text-white hover:bg-white/[0.12] transition-smooth"
          title="Reset timer"
        >
          🔄 Reset
        </button>
      </div>

      {/* Info Box */}
      <div className="glass-effect rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Work Duration:</span>
          <span className="text-white font-semibold">{Math.floor(workDuration / 60)} min</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Break Duration:</span>
          <span className="text-white font-semibold">{Math.floor(breakDuration / 60)} min</span>
        </div>
        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm">
          <span className="text-gray-400">Long Break After:</span>
          <span className="text-white font-semibold">4 sessions</span>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-effect rounded-lg p-4">
        <p className="text-xs text-gray-400 mb-2">💡 <span className="font-semibold">Pro Tips:</span></p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• Silence notifications during work sessions</li>
          <li>• Stay hydrated between sessions</li>
          <li>• Take a longer break after 4 sessions</li>
        </ul>
      </div>
    </div>
  );
}
