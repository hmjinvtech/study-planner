interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  readiness: number; // 0-100
}

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  const isUrgent = exam.readiness < 50;
  const isReady = exam.readiness >= 80;

  const getReadinessColor = () => {
    if (isReady) return 'from-cyan-500 to-blue-500';
    if (isUrgent) return 'from-red-500 to-orange-500';
    return 'from-amber-500 to-yellow-500';
  };

  const getReadinessLabel = () => {
    if (isReady) return '✓ Ready';
    if (isUrgent) return '⚠ Urgent';
    return '◐ In Progress';
  };

  return (
    <div className="glass-effect-light rounded-lg p-5 hover:bg-white/[0.08] transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-semibold text-white text-sm">{exam.subject}</h4>
          <p className="text-xs text-gray-400 mt-1">
            📅 {exam.date} • 🕐 {exam.time}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getReadinessColor()} text-white`}
        >
          {getReadinessLabel()}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-400">
          ⏱ Duration: <span className="text-gray-300">{exam.duration}</span>
        </p>
        <p className="text-xs text-gray-400">
          📍 Location: <span className="text-gray-300">{exam.location}</span>
        </p>
      </div>

      {/* Readiness Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Readiness</span>
          <span className="text-xs font-semibold text-white">{exam.readiness}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getReadinessColor()} transition-all duration-500`}
            style={{ width: `${exam.readiness}%` }}
          />
        </div>
      </div>
    </div>
  );
}
