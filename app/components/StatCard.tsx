interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: string;
}

export default function StatCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  icon,
}: StatCardProps) {
  const trendColor = {
    up: 'text-cyan-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  const trendIcon = {
    up: '📈',
    down: '📉',
    neutral: '→',
  };

  return (
    <div className="glass-effect-light rounded-xl p-4 hover:bg-white/[0.08] transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{value}</span>
            {unit && <span className="text-sm text-gray-400">{unit}</span>}
          </div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 ${trendColor[trend]}`}>
              <span>{trendIcon[trend]}</span>
              <span className="text-xs">{trendValue}</span>
            </div>
          )}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
