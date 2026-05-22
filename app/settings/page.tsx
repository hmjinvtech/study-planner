'use client';

import { useState } from 'react';
import DashboardCard from '@/app/components/DashboardCard';

interface Settings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'dark' | 'light' | 'auto';
  language: 'en' | 'es' | 'fr' | 'de';
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    soundEnabled: true,
    notificationsEnabled: true,
    theme: 'dark',
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="gradient-text text-4xl font-bold">Settings</h1>
        <p className="text-gray-400">
          Customize your study planner experience
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="glass-effect-light rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-sm text-green-400">✓ Settings saved successfully</p>
        </div>
      )}

      {/* Timer Settings */}
      <DashboardCard title="Timer Settings" icon="⏱">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Work Duration</span>
              <span className="text-lg font-bold text-cyan-400">{settings.workDuration} min</span>
            </label>
            <input
              type="range"
              min="5"
              max="60"
              value={settings.workDuration}
              onChange={(e) => setSettings({ ...settings, workDuration: parseInt(e.target.value) })}
              className="w-full h-2 glass-effect rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <p className="text-xs text-gray-500">Recommended: 25 minutes</p>
          </div>

          <div className="space-y-2">
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Break Duration</span>
              <span className="text-lg font-bold text-green-400">{settings.breakDuration} min</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={settings.breakDuration}
              onChange={(e) => setSettings({ ...settings, breakDuration: parseInt(e.target.value) })}
              className="w-full h-2 glass-effect rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <p className="text-xs text-gray-500">Recommended: 5 minutes</p>
          </div>

          <div className="space-y-2">
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Long Break Duration</span>
              <span className="text-lg font-bold text-purple-400">{settings.longBreakDuration} min</span>
            </label>
            <input
              type="range"
              min="10"
              max="30"
              value={settings.longBreakDuration}
              onChange={(e) => setSettings({ ...settings, longBreakDuration: parseInt(e.target.value) })}
              className="w-full h-2 glass-effect rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-xs text-gray-500">Recommended: 15 minutes</p>
          </div>

          <div className="space-y-2">
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Sessions Before Long Break</span>
              <span className="text-lg font-bold text-amber-400">{settings.sessionsBeforeLongBreak}</span>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={settings.sessionsBeforeLongBreak}
              onChange={(e) => setSettings({ ...settings, sessionsBeforeLongBreak: parseInt(e.target.value) })}
              className="w-full h-2 glass-effect rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <p className="text-xs text-gray-500">Recommended: 4 sessions</p>
          </div>
        </div>
      </DashboardCard>

      {/* Notifications & Sound */}
      <DashboardCard title="Notifications" icon="🔔">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 glass-effect rounded-lg hover:bg-white/[0.05] transition-smooth cursor-pointer">
            <div>
              <p className="font-semibold text-white">Sound Notifications</p>
              <p className="text-xs text-gray-400">Play sound when timer completes</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                settings.soundEnabled ? 'bg-cyan-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-smooth ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 glass-effect rounded-lg hover:bg-white/[0.05] transition-smooth cursor-pointer">
            <div>
              <p className="font-semibold text-white">Desktop Notifications</p>
              <p className="text-xs text-gray-400">Show notifications on screen</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notificationsEnabled: !settings.notificationsEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                settings.notificationsEnabled ? 'bg-cyan-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-smooth ${
                  settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Display Settings */}
      <DashboardCard title="Display" icon="🎨">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {(['dark', 'light', 'auto'] as const).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setSettings({ ...settings, theme: themeOption })}
                  className={`p-3 rounded-lg font-medium transition-smooth ${
                    settings.theme === themeOption
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'glass-effect text-gray-400 hover:text-white hover:bg-white/[0.1]'
                  }`}
                >
                  {themeOption === 'dark' && '🌙'}
                  {themeOption === 'light' && '☀️'}
                  {themeOption === 'auto' && '🔄'}
                  <span className="ml-2 capitalize">{themeOption}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-3">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value as any })}
              className="w-full px-4 py-2 glass-effect rounded-lg text-white border-0 outline-none transition-smooth focus:bg-white/[0.12]"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code} className="bg-gray-800">
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DashboardCard>

      {/* Account Settings */}
      <DashboardCard title="Account" icon="👤">
        <div className="space-y-4">
          <div className="p-4 glass-effect rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="font-semibold text-white">student@mail.com</p>
          </div>

          <div className="p-4 glass-effect rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Account Created</p>
            <p className="font-semibold text-white">May 1, 2026</p>
          </div>

          <button className="w-full px-4 py-3 rounded-lg font-medium transition-smooth bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30">
            🚪 Sign Out
          </button>
        </div>
      </DashboardCard>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 rounded-lg font-semibold transition-smooth bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50"
        >
          💾 Save Settings
        </button>
        <button className="px-6 py-3 rounded-lg font-semibold transition-smooth glass-effect text-white hover:bg-white/[0.1]">
          🔄 Reset to Default
        </button>
      </div>
    </div>
  );
}
