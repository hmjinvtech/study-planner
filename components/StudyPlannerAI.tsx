'use client';

import { useState } from 'react';

interface Subject {
  id: string;
  name: string;
  chapters: number;
}

interface StudyDay {
  date: Date;
  dayNumber: number;
  sessions: DaySession[];
  totalHours: number;
}

interface DaySession {
  subject: string;
  chapters: number;
  hours: number;
  startTime: string;
  endTime: string;
}

export default function StudyPlannerAI() {
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState('6');
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', chapters: 8 },
    { id: '2', name: 'Physics', chapters: 6 },
    { id: '3', name: 'Chemistry', chapters: 5 },
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [newChapters, setNewChapters] = useState('');
  const [schedule, setSchedule] = useState<StudyDay[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);

  // Add subject
  const handleAddSubject = () => {
    if (!newSubject.trim() || !newChapters || parseInt(newChapters) <= 0) return;

    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject,
      chapters: parseInt(newChapters),
    };

    setSubjects([...subjects, subject]);
    setNewSubject('');
    setNewChapters('');
  };

  // Remove subject
  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // Generate schedule
  const generateSchedule = () => {
    if (!examDate || subjects.length === 0) {
      alert('Please enter exam date and add subjects');
      return;
    }

    const today = new Date();
    const exam = new Date(examDate);
    const daysRemaining = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      alert('Exam date must be in the future');
      return;
    }

    // Sort subjects by chapters (descending priority)
    const sortedSubjects = [...subjects].sort((a, b) => b.chapters - a.chapters);
    const totalChapters = sortedSubjects.reduce((sum, s) => sum + s.chapters, 0);
    const hoursPerDay = parseFloat(dailyHours);

    // Generate daily schedule
    const generatedSchedule: StudyDay[] = [];
    let currentDate = new Date(today);
    let chaptersCompleted = new Map<string, number>();

    // Initialize chapters completed
    sortedSubjects.forEach((s) => chaptersCompleted.set(s.name, 0));

    for (let day = 0; day < daysRemaining; day++) {
      const dayDate = new Date(currentDate);
      dayDate.setDate(dayDate.getDate() + day);

      const sessions: DaySession[] = [];
      let remainingHours = hoursPerDay;
      let currentHour = 9; // Start at 9 AM

      // Allocate time to subjects based on remaining chapters
      for (const subject of sortedSubjects) {
        const completed = chaptersCompleted.get(subject.name) || 0;
        const remaining = subject.chapters - completed;

        if (remaining <= 0 || remainingHours <= 0) continue;

        // Prioritize subjects with more remaining chapters
        const priority = remaining / (daysRemaining - day);
        let hoursAllocated = Math.min(Math.ceil(priority * 2), remainingHours, 4); // Max 4 hours per subject per day

        if (hoursAllocated > 0) {
          const startTime = `${String(currentHour).padStart(2, '0')}:00`;
          const endHour = currentHour + hoursAllocated;
          const endTime = `${String(endHour).padStart(2, '0')}:00`;

          // Distribute chapters based on hours
          const chaptersToStudy = Math.ceil((hoursAllocated / hoursPerDay) * subject.chapters * 0.15); // Rough estimate

          sessions.push({
            subject: subject.name,
            chapters: chaptersToStudy,
            hours: hoursAllocated,
            startTime,
            endTime,
          });

          chaptersCompleted.set(subject.name, completed + chaptersToStudy);
          remainingHours -= hoursAllocated;
          currentHour = endHour;
        }
      }

      if (sessions.length > 0) {
        generatedSchedule.push({
          date: dayDate,
          dayNumber: day + 1,
          sessions,
          totalHours: hoursPerDay - remainingHours,
        });
      }
    }

    setSchedule(generatedSchedule);
    setIsGenerated(true);
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Calculate stats
  const totalChapters = subjects.reduce((sum, s) => sum + s.chapters, 0);
  const daysUntilExam = examDate
    ? Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="gradient-text text-5xl font-bold">AI Study Planner</h1>
        <p className="text-gray-400">Generate a personalized study schedule powered by intelligent algorithms</p>
      </div>

      {/* Input Section */}
      <div className="glass-effect-light rounded-3xl p-8 border border-white/10 space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          ⚙️ Configure Your Study Plan
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">📅 Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-smooth"
            />
            {daysUntilExam > 0 && (
              <p className="text-xs text-cyan-400 font-medium">📍 {daysUntilExam} days until exam</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">⏰ Daily Study Hours</label>
            <input
              type="number"
              min="1"
              max="12"
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass-effect border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-smooth"
            />
            <p className="text-xs text-gray-400">Maximum hours per day</p>
          </div>
        </div>

        {/* Subject Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">📚 Add Subjects</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
              placeholder="Subject name (e.g., Physics)"
              className="flex-1 px-4 py-3 rounded-lg glass-effect border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-smooth"
            />
            <input
              type="number"
              min="1"
              max="50"
              value={newChapters}
              onChange={(e) => setNewChapters(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
              placeholder="Chapters"
              className="w-24 px-4 py-3 rounded-lg glass-effect border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-smooth"
            />
            <button
              onClick={handleAddSubject}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 transition-all duration-200"
            >
              Add
            </button>
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Subjects ({subjects.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="glass-effect rounded-lg p-4 flex items-center justify-between group hover:bg-white/5 transition-smooth"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{subject.name}</p>
                  <p className="text-sm text-gray-400">{subject.chapters} chapters</p>
                </div>
                <button
                  onClick={() => handleRemoveSubject(subject.id)}
                  className="text-red-400 hover:bg-red-500/20 hover:text-red-300 p-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="glass-effect rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-cyan-400">{subjects.length}</p>
              <p className="text-xs text-gray-400">Subjects</p>
            </div>
            <div className="glass-effect rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-400">{totalChapters}</p>
              <p className="text-xs text-gray-400">Total Chapters</p>
            </div>
            <div className="glass-effect rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-400">{daysUntilExam}d</p>
              <p className="text-xs text-gray-400">Days Left</p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateSchedule}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 active:scale-95 transition-all duration-200"
        >
          🤖 Generate AI Study Plan
        </button>
      </div>

      {/* Generated Schedule */}
      {isGenerated && schedule.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">📅 Your Study Schedule</h2>
            <span className="text-sm text-gray-400">{schedule.length} days of study</span>
          </div>

          <div className="grid gap-4">
            {schedule.map((day, idx) => (
              <div
                key={idx}
                className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400 font-medium">DAY {day.dayNumber}</p>
                    <p className="text-xl font-bold text-white">{formatDate(day.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-cyan-400">{day.totalHours}h</p>
                    <p className="text-xs text-gray-400">study time</p>
                  </div>
                </div>

                {/* Sessions */}
                <div className="space-y-3">
                  {day.sessions.map((session, sIdx) => (
                    <div key={sIdx} className="glass-effect rounded-lg p-4 flex items-start gap-4">
                      {/* Time */}
                      <div className="text-center min-w-fit">
                        <p className="text-sm font-bold text-cyan-400">{session.startTime}</p>
                        <p className="text-xs text-gray-400">to</p>
                        <p className="text-sm font-bold text-cyan-400">{session.endTime}</p>
                      </div>

                      {/* Divider */}
                      <div className="w-1 h-20 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full opacity-30" />

                      {/* Subject Details */}
                      <div className="flex-1">
                        <p className="font-bold text-white text-lg">{session.subject}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm font-medium">
                            📖 {session.chapters} chapters
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-medium">
                            ⏱ {session.hours}h
                          </span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <p className="text-xl font-bold text-cyan-400">{Math.round((session.hours / parseFloat(dailyHours)) * 100)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="glass-effect-light rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">📊 Plan Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-effect rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-cyan-400">{schedule.length}</p>
                <p className="text-xs text-gray-400 mt-1">Study Days</p>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-purple-400">
                  {Math.round(schedule.reduce((sum, d) => sum + d.totalHours, 0))}h
                </p>
                <p className="text-xs text-gray-400 mt-1">Total Study Time</p>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-400">{subjects.length}</p>
                <p className="text-xs text-gray-400 mt-1">Subjects</p>
              </div>
              <div className="glass-effect rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-pink-400">{totalChapters}</p>
                <p className="text-xs text-gray-400 mt-1">Chapters</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isGenerated && (
        <div className="glass-effect-light rounded-2xl p-12 text-center border border-dashed border-white/20 space-y-4">
          <p className="text-4xl">📚</p>
          <p className="text-xl font-semibold text-white">No study plan yet</p>
          <p className="text-gray-400">Configure your exam details and subjects to generate an AI-powered study plan</p>
        </div>
      )}
    </div>
  );
}
