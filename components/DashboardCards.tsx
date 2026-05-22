'use client';

/**
 * Dashboard Stat Cards Component
 * 
 * Features:
 * - 4 key performance metric cards
 * - Animated gradient hover effects
 * - Icon + label + value + subtext layout
 * - Glass-morphism design
 * - Responsive grid layout
 */

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  subtext: string;
  gradient?: string;
}

const StatCard = ({ icon, label, value, subtext, gradient = 'from-cyan-500 to-blue-500' }: StatCardProps) => (
  <div className="glass-effect-light rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-smooth group overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-4xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  </div>
);

export interface DashboardStats {
  completedToday: number;
  upcomingTasks: number;
  focusHoursToday: number;
  studyStreak: number;
}

interface DashboardCardsProps {
  stats: DashboardStats;
}

/**
 * Dashboard Cards Grid
 * Displays 4 key metrics in a responsive grid
 */
export function DashboardCards({ stats }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon="✓"
        label="Completed Today"
        value={stats.completedToday}
        subtext="tasks finished"
        gradient="from-green-500 to-emerald-500"
      />
      <StatCard
        icon="📋"
        label="Upcoming Tasks"
        value={stats.upcomingTasks}
        subtext="in the pipeline"
        gradient="from-blue-500 to-cyan-500"
      />
      <StatCard
        icon="⏱️"
        label="Focus Hours"
        value={`${stats.focusHoursToday}h`}
        subtext="today's progress"
        gradient="from-purple-500 to-pink-500"
      />
      <StatCard
        icon="🔥"
        label="Study Streak"
        value={stats.studyStreak}
        subtext="consecutive days"
        gradient="from-orange-500 to-red-500"
      />
    </div>
  );
}

export default DashboardCards;
