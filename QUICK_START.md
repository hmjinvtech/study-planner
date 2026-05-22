# Study Planner Dashboard - Quick Start Guide

## 🚀 Getting Started

Your dashboard is currently running at **http://localhost:3000**

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

### Components (`app/components/`)
- **Sidebar.tsx** - Collapsible navigation with mobile support
- **Navbar.tsx** - Top navigation with search and notifications
- **DashboardCard.tsx** - Reusable card wrapper with glassmorphism
- **StatCard.tsx** - Metric display card with trend indicators
- **TaskCard.tsx** - Individual task item with priority badges
- **ExamCard.tsx** - Exam card with readiness progress

### Key Files
- **app/page.tsx** - Main dashboard view with all cards
- **app/layout.tsx** - Root layout with Sidebar & Navbar
- **app/globals.css** - Theme variables, animations, utilities
- **DASHBOARD_DESIGN.md** - Comprehensive design documentation

---

## 🎨 Dashboard Features

### ✓ Today's Tasks
- Display 4 tasks with priority indicators (High/Medium/Low)
- Interactive checkboxes for task completion
- Task metadata (subject, due time, priority)
- "View all tasks" expandable button

### ✓ Productivity Metrics
- **Study Hours**: 18.5 hours this week with trend
- **Productivity Score**: 92% with +5% improvement
- **Tasks Completed**: 3 of 5 with percentage
- **Average Session**: 1.5 hours consistency tracking

### ✓ Quick Stats
- Daily goal progress tracker (68%)
- Weekly target visualization (20 hours)
- 7-day activity heatmap showing study intensity

### ✓ Upcoming Exams
- Exam details (subject, date, time, location, duration)
- Readiness indicators with color-coding
- Progress bars showing preparation level
- Status badges (Ready, In Progress, Urgent)

### ✓ Study Schedule
- 7-day weekly grid with activity types
- Visual indicators for study sessions
- Hourly breakdown per day
- Interactive hover effects

---

## 🎨 Design Highlights

### Glassmorphism UI
- Frosted glass effect with 20px blur
- Semi-transparent backgrounds
- Subtle borders for depth
- Modern, contemporary look

### Dark Theme
- Deep navy primary (#0a0e27)
- Purple/Blue/Cyan accents
- Reduced eye strain for night study
- Modern aesthetic aligned with current trends

### Smooth Animations
- 0.3s transitions on all interactive elements
- Hover effects: scale, lift, color transitions
- Micro-interactions for engagement
- Icon and progress bar animations

### Fully Responsive
- Desktop: Full sidebar + content
- Tablet: Optimized layout with proper spacing
- Mobile: Collapsible sidebar, hamburger menu

---

## 🔧 Customization Guide

### Change Color Theme
Edit `app/globals.css` and update CSS variables:
```css
:root {
  --accent-primary: #7c3aed;    /* Purple */
  --accent-secondary: #3b82f6;  /* Blue */
  --accent-tertiary: #06b6d4;   /* Cyan */
}
```

### Add New Navigation Items
Edit `app/components/Sidebar.tsx` - `sidebarItems` array:
```typescript
const sidebarItems: SidebarItem[] = [
  { id: 'new', label: 'New Page', icon: '🆕', href: '/new' },
  // ... more items
];
```

### Modify Dashboard Cards
Edit `app/page.tsx` to:
- Add new stat cards
- Modify task list
- Change exam data
- Adjust grid layouts

### Update Task Data
Edit the `tasks` state in `app/page.tsx`:
```typescript
const [tasks, setTasks] = useState<Task[]>([
  // Add, remove, or modify tasks here
]);
```

---

## 📊 Data Structure Reference

### Task Object
```typescript
{
  id: string;
  title: string;
  dueTime: string;          // Format: "02:00 PM"
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  subject?: string;         // Optional subject name
}
```

### Exam Object
```typescript
{
  id: string;
  subject: string;
  date: string;             // Format: "May 28, 2026"
  time: string;             // Format: "09:00 AM"
  duration: string;         // Format: "2 hours"
  location: string;
  readiness: number;        // 0-100 percentage
}
```

---

## 🚀 Next Steps

### To Extend the Dashboard:
1. **Create New Pages** - Add routes in `app/` directory
2. **Add Real Data** - Connect to backend API or database
3. **Implement Authentication** - Add user login system
4. **Add More Cards** - Create new dashboard sections
5. **Integrate Calendar** - Add date-based scheduling
6. **Build Study Timer** - Pomodoro or study session timer
7. **Add Analytics** - Detailed performance tracking

### Recommended Enhancements:
- [ ] Connect to a backend API
- [ ] Add user authentication
- [ ] Implement database storage
- [ ] Add email notifications
- [ ] Create analytics dashboard
- [ ] Build study groups feature
- [ ] Add dark/light theme toggle
- [ ] Implement data export/PDF

---

## 💡 Pro Tips

1. **Mobile Testing**: Use browser DevTools device emulation (F12 → Device Toolbar)
2. **Performance**: The glassmorphism effects use GPU acceleration for smooth 60fps
3. **Accessibility**: All interactive elements have proper ARIA labels
4. **Dark Mode**: Optimized for OLED displays (reduces battery usage)
5. **Animations**: Disable animations in `globals.css` if browser performance is an issue

---

## 🛠️ Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows
taskkill /PID <process_id> /F

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Try building again
npm run build
```

### Styling Issues
- Check that Tailwind CSS v4 is installed
- Verify `@import "tailwindcss"` in `globals.css`
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Glassmorphism Design](https://hype4.academy/articles/design/glassmorphism-guide)

---

## 📞 Support

For issues or questions:
1. Check the `DASHBOARD_DESIGN.md` for detailed documentation
2. Review component props and data structures
3. Examine the `globals.css` for styling reference
4. Check browser console for error messages

---

**Happy planning! 📖✨**
