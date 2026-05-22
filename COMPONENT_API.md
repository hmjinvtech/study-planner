# Component API Reference

## Overview
Complete reference for all dashboard components with props, examples, and usage patterns.

---

## Sidebar Component

**Location:** `app/components/Sidebar.tsx`

### Purpose
Collapsible navigation sidebar with mobile responsiveness. Shows navigation items and user profile.

### Props
None - Component manages its own state internally.

### State
- `isOpen: boolean` - Controls sidebar expanded/collapsed state
- `isMobileOpen: boolean` - Controls mobile sidebar visibility

### Features
- Desktop: Toggle between expanded (256px) and collapsed (80px) width
- Mobile: Hidden by default, accessible via hamburger menu overlay
- User profile footer with avatar and email
- Navigation links to main sections
- Smooth transitions between states

### Usage Example
```tsx
import Sidebar from './components/Sidebar';

export default function Layout() {
  return (
    <div>
      <Sidebar />
      {/* Main content */}
    </div>
  );
}
```

### Navigation Items
```typescript
interface SidebarItem {
  id: string;        // Unique identifier
  label: string;     // Display text
  icon: string;      // Emoji icon
  href: string;      // Navigation link
}
```

Current items: Dashboard, Tasks, Study Sessions, Exams, Analytics, Calendar

---

## Navbar Component

**Location:** `app/components/Navbar.tsx`

### Purpose
Top navigation bar with welcome message, date display, search, notifications, and menu.

### Props
None - Component manages its own state internally.

### State
- `isMenuOpen: boolean` - Controls dropdown menu visibility

### Features
- Responsive design (adjusts text size and spacing for mobile)
- Current date display with automatic formatting
- Search bar (hidden on mobile)
- Notifications bell with unread indicator
- Dropdown menu with Settings, Theme, Help, Logout options

### Usage Example
```tsx
import Navbar from './components/Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar />
      {/* Content below navbar */}
    </div>
  );
}
```

### Customization
- **Edit Menu Items:** Modify the `.map()` array in dropdown menu section
- **Change Welcome Text:** Update the "Welcome back" message hardcoded value
- **Add More Buttons:** Add new buttons before or after notifications

---

## DashboardCard Component

**Location:** `app/components/DashboardCard.tsx`

### Purpose
Reusable card wrapper with glassmorphism effect. Container for all dashboard card content.

### Props
```typescript
interface DashboardCardProps {
  title: string;              // Card header title
  icon: string;               // Emoji icon
  children: React.ReactNode;  // Card content
  className?: string;         // Additional Tailwind classes
}
```

### Features
- Glassmorphism effect with semi-transparent background
- Smooth hover animation with background opacity change
- Icon hover scale animation
- Flexible content via children prop
- Extensible with className prop

### Usage Example
```tsx
import DashboardCard from './components/DashboardCard';

export default function Dashboard() {
  return (
    <DashboardCard title="Today's Tasks" icon="✓">
      <div>
        {/* Task list content */}
      </div>
    </DashboardCard>
  );
}
```

### Styling
- Default: `glass-effect-light rounded-2xl p-6`
- Hover: Background opacity increases to 0.08
- Icon: Scales to 1.1x on parent hover

---

## StatCard Component

**Location:** `app/components/StatCard.tsx`

### Purpose
Displays key metrics with optional trend indicators. Used for Study Hours, Productivity Score, etc.

### Props
```typescript
interface StatCardProps {
  label: string;              // Metric name/label
  value: string | number;     // Primary metric value
  unit?: string;              // Unit of measurement (e.g., "hrs", "%")
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;        // Trend description (e.g., "+5% improvement")
  icon: string;               // Emoji icon
}
```

### Features
- Large, readable metric display
- Trend indicators with color coding:
  - `up`: Cyan (#06b6d4) with 📈 icon
  - `down`: Red (#ef4444) with 📉 icon
  - `neutral`: Gray with → icon
- Icon display on the right
- Compact glassmorphic design

### Usage Example
```tsx
import StatCard from './components/StatCard';

export default function Dashboard() {
  return (
    <StatCard
      label="Study Hours This Week"
      value="18.5"
      unit="hrs"
      trend="up"
      trendValue="+2.3 hrs from last week"
      icon="⏱"
    />
  );
}
```

### Display Format
```
Label (12px gray)
Value (30px bold) Unit (12px gray)
Trend Icon + "Trend Text" (12px colored)
                                    Icon (18px)
```

---

## TaskCard Component

**Location:** `app/components/TaskCard.tsx`

### Purpose
Individual task display with priority badges, completion checkbox, and metadata.

### Props
```typescript
interface TaskCardProps {
  task: Task;                  // Task object
  onToggle?: (id: string) => void; // Completion toggle handler
}

interface Task {
  id: string;
  title: string;
  dueTime: string;             // Format: "HH:MM AM/PM"
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subject?: string;            // Optional subject
}
```

### Features
- Priority-colored badges (Red: High, Amber: Medium, Green: Low)
- Interactive checkbox with hover states
- Task title with strikethrough when completed
- Subject and due time display
- Completed tasks appear faded with line-through text
- Hover enhancement for incomplete tasks

### Usage Example
```tsx
import TaskCard from './components/TaskCard';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Assignment',
      dueTime: '02:00 PM',
      priority: 'high',
      completed: false,
      subject: 'Mathematics',
    },
  ]);

  const handleToggle = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TaskCard task={tasks[0]} onToggle={handleToggle} />
  );
}
```

### Priority Badge Colors
- **High**: Red background (#ef4444), red text
- **Medium**: Amber background (#f59e0b), amber text
- **Low**: Green background (#10b981), green text

### Checkbox States
- **Uncompleted**: Border: #6b7280, Hover border: #06b6d4
- **Completed**: Background: #06b6d4, Border: #06b6d4, Checkmark visible

---

## ExamCard Component

**Location:** `app/components/ExamCard.tsx`

### Purpose
Displays upcoming exam information with readiness progress bar and status indicator.

### Props
```typescript
interface ExamCardProps {
  exam: Exam;
}

interface Exam {
  id: string;
  subject: string;
  date: string;               // Format: "May 28, 2026"
  time: string;               // Format: "09:00 AM"
  duration: string;           // Format: "2 hours"
  location: string;
  readiness: number;          // 0-100 percentage
}
```

### Features
- Subject name and exam date/time display
- Location and duration information
- Readiness percentage (0-100%)
- Status badge with color-coded gradient:
  - **✓ Ready**: Cyan-to-blue gradient (readiness ≥ 80%)
  - **◐ In Progress**: Amber-to-yellow gradient (50-79%)
  - **⚠ Urgent**: Red-to-orange gradient (< 50%)
- Animated progress bar filling based on readiness

### Usage Example
```tsx
import ExamCard from './components/ExamCard';

export default function Dashboard() {
  const exam = {
    id: '1',
    subject: 'Calculus II',
    date: 'May 28, 2026',
    time: '09:00 AM',
    duration: '2 hours',
    location: 'Room 301',
    readiness: 85,
  };

  return <ExamCard exam={exam} />;
}
```

### Status Calculations
```typescript
const isReady = readiness >= 80;      // ✓ Ready (Green)
const isUrgent = readiness < 50;     // ⚠ Urgent (Red)
// else: ◐ In Progress (Yellow)
```

### Progress Bar
- Width: Percentage of readiness value
- Color: Matches status badge gradient
- Animation: Smooth 500ms transition on change

---

## CSS Variables & Utilities

### Available CSS Variables
```css
--background: #0a0e27              /* Primary background */
--background-secondary: #111d3d    /* Secondary background */
--foreground: #e8ebf5              /* Primary text */
--accent-primary: #7c3aed          /* Purple gradient */
--accent-secondary: #3b82f6        /* Blue gradient */
--accent-tertiary: #06b6d4         /* Cyan accent */
--glass-bg: rgba(255, 255, 255, 0.05)    /* Glass background */
--glass-border: rgba(255, 255, 255, 0.1) /* Glass border */
```

### Utility Classes
```css
.glass-effect         /* Standard glass with blur(20px) */
.glass-effect-light   /* Light glass, more opaque */
.transition-smooth    /* 0.3s ease-out transition */
.gradient-text        /* Purple-to-blue gradient text */
.hover-scale          /* Scale 1.05x on hover */
.hover-lift           /* Lift 4px with shadow on hover */
```

### Animation Classes
```css
.animate-fade-in-up       /* Enter from bottom with fade */
.animate-slide-in-left    /* Slide from left */
.animate-slide-in-right   /* Slide from right */
.animate-glow             /* Pulsing glow effect */
.animate-float            /* Subtle floating motion */
```

---

## Responsive Behavior

### Component Responsiveness

| Component | Desktop (lg+) | Tablet (md) | Mobile (sm) |
|-----------|---------------|------------|-----------|
| Sidebar | 256px expanded | Collapsible | Hidden (toggle) |
| Navbar | Full features | Compact | Minimal |
| StatCard Grid | 4 columns | 2 columns | 1 column |
| TaskCard | Full width | Full width | Full width |
| ExamCard | 3 columns | 3 columns | 1 column |

### Media Query Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

---

## Common Patterns

### Creating a New Card Section
```tsx
import DashboardCard from './components/DashboardCard';

export default function MyCard() {
  return (
    <DashboardCard title="My Section" icon="🎯">
      {/* Your content here */}
    </DashboardCard>
  );
}
```

### Adding State Management to Cards
```tsx
'use client';

import { useState } from 'react';
import DashboardCard from './components/DashboardCard';

export default function InteractiveCard() {
  const [data, setData] = useState([]);

  return (
    <DashboardCard title="Interactive" icon="⚡">
      {/* Use data and setData here */}
    </DashboardCard>
  );
}
```

### Mapping Over Collections
```tsx
const tasks = [/* task data */];

return (
  <div className="space-y-3">
    {tasks.map(task => (
      <TaskCard key={task.id} task={task} onToggle={handleToggle} />
    ))}
  </div>
);
```

---

## Accessibility Features

All components include:
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: All buttons have descriptive labels
- **Keyboard Navigation**: Tab-accessible interactive elements
- **Focus Visible**: 2px outline for keyboard users
- **Color Contrast**: WCAG AA compliant text contrast

---

## Performance Tips

1. **Memoization**: Wrap heavy components with `React.memo()`
2. **Lazy Loading**: Use `React.lazy()` for off-screen components
3. **Event Delegation**: Use parent event handlers when possible
4. **CSS Optimization**: All animations use GPU-accelerated properties
5. **State Management**: Keep state as local as possible

---

## Extending Components

### Create a New Card Type
```tsx
interface CustomCardProps {
  title: string;
  icon: string;
  data: any;
}

export default function CustomCard({ title, icon, data }: CustomCardProps) {
  return (
    <DashboardCard title={title} icon={icon}>
      {/* Render data */}
    </DashboardCard>
  );
}
```

### Add New Animations
Add to `globals.css`:
```css
@keyframes myAnimation {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.animate-my-animation {
  animation: myAnimation 0.3s ease-out;
}
```

---

*Last Updated: May 2026*
