'use client';

import DashboardCard from './DashboardCard';
import StatCard from './StatCard';
import TaskCard from './TaskCard';
import ExamCard from './ExamCard';

interface Task {
  id: string;
  title: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subject?: string;
}

interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  readiness: number;
}

interface Stat {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: string;
}

interface DashboardCardsProps {
  stats?: Stat[];
  tasks?: Task[];
  exams?: Exam[];
  onTaskToggle?: (id: string) => void;
}

export default function DashboardCards({
  stats,
  tasks,
  exams,
  onTaskToggle,
}: DashboardCardsProps) {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Stats Overview */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              trend={stat.trend}
              trendValue={stat.trendValue}
              icon={stat.icon}
            />
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Section */}
        {tasks && tasks.length > 0 && (
          <div className="lg:col-span-2">
            <DashboardCard title="Today's Tasks" icon="✓">
              <div className="space-y-3">
                {tasks.slice(0, 4).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={onTaskToggle}
                  />
                ))}
                {tasks.length > 4 && (
                  <button className="w-full py-3 mt-2 rounded-lg border border-dashed border-white/20 text-sm text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-smooth">
                    + View all {tasks.length} tasks
                  </button>
                )}
              </div>
            </DashboardCard>
          </div>
        )}

        {/* Quick Stats Card */}
        <div>
          <DashboardCard title="Quick Stats" icon="📈">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Daily Goal</span>
                  <span className="text-sm font-semibold text-cyan-400">68%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-cyan-500 to-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Weekly Target</span>
                  <span className="text-sm font-semibold text-purple-400">20 hrs</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-11/12 bg-gradient-to-r from-purple-500 to-pink-500" />
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-gray-400 mb-3">📅 This Month</p>
                <div className="flex gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-8 rounded-md transition-smooth hover:scale-105 ${
                        i < 5
                          ? 'bg-gradient-to-b from-cyan-500 to-blue-600'
                          : 'bg-white/5'
                      }`}
                      title={`Day ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Exams Section */}
      {exams && exams.length > 0 && (
        <DashboardCard title="Upcoming Exams" icon="📝">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Study Schedule */}
      <DashboardCard title="Study Schedule" icon="📅">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <p className="text-xs text-gray-400 font-medium">{day}</p>
              <div className="w-full aspect-square rounded-lg glass-effect p-2 flex items-center justify-center group hover:bg-white/[0.08] transition-smooth cursor-pointer">
                <span className="text-2xl group-hover:scale-110 transition-smooth">
                  {idx === 0 ? '📚' : idx === 4 ? '📖' : idx === 6 ? '🎓' : '✓'}
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                {idx === 0 ? '3h' : idx === 4 ? '2h' : idx === 6 ? '1h' : '2h'}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Footer Message */}
      <div className="glass-effect rounded-lg p-6 border-l-4 border-cyan-500">
        <p className="text-sm text-gray-300">
          💡 <span className="font-semibold">Pro Tip:</span> Stay consistent with your study schedule.
          You're doing great! Keep pushing towards your goals!
        </p>
      </div>
    </div>
  );
}
