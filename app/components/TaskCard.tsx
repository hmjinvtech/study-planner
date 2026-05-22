interface Task {
  id: string;
  title: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subject?: string;
}

interface TaskCardProps {
  task: Task;
  onToggle?: (id: string) => void;
}

const priorityColors = {
  high: 'bg-red-500/20 border-red-500/30 text-red-300',
  medium: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
  low: 'bg-green-500/20 border-green-500/30 text-green-300',
};

const priorityLabels = {
  high: '🔴 High',
  medium: '🟡 Medium',
  low: '🟢 Low',
};

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-smooth cursor-pointer group ${
        task.completed
          ? 'glass-effect opacity-50'
          : 'glass-effect-light hover:bg-white/[0.06] hover:border-white/20'
      }`}
      onClick={() => onToggle?.(task.id)}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-smooth ${
            task.completed
              ? 'bg-cyan-500 border-cyan-500'
              : 'border-gray-500 group-hover:border-cyan-400'
          }`}
        >
          {task.completed && <span className="text-white text-xs">✓</span>}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`font-medium transition-smooth ${
              task.completed
                ? 'line-through text-gray-500'
                : 'text-white group-hover:text-cyan-300'
            }`}
          >
            {task.title}
          </p>
          {task.subject && (
            <p className="text-xs text-gray-400 mt-1">{task.subject}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-400">⏰ {task.dueTime}</span>
          </div>
        </div>

        {/* Priority Badge */}
        <div
          className={`px-2 py-1 rounded text-xs font-medium border flex-shrink-0 ${priorityColors[task.priority]}`}
        >
          {priorityLabels[task.priority]}
        </div>
      </div>
    </div>
  );
}
