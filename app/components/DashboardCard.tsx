interface DashboardCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  icon,
  children,
  className = '',
}: DashboardCardProps) {
  return (
    <div
      className={`glass-effect-light rounded-2xl p-6 hover:shadow-lg hover:bg-white/[0.08] transition-smooth group ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl group-hover:scale-110 transition-smooth">{icon}</span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}
