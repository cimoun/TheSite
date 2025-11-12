# Task Management React Components

A set of beautiful, animated React components for task management built with TypeScript and Framer Motion.

## Components

### TaskItem

Displays a single task with rich interactions and animations.

**Features:**
- ✅ Checkbox with spring animation on complete
- ✏️ Strike-through animation for completed tasks
- 🎨 Priority badge with color coding (High: #ef4444, Medium: #f59e0b, Low: #3b82f6)
- 📅 Due date display with smart formatting
- 🔘 Edit and delete buttons with hover effects

**Props:**
```typescript
interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
```

**Usage:**
```tsx
import { TaskItem } from './components/TaskItem';

<TaskItem
  task={task}
  onToggleComplete={handleToggleComplete}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### TaskList

Renders a list of tasks with animations and responsive layout.

**Features:**
- 🎭 Stagger animation for items entering
- 📱 Responsive grid layout
- 🌟 Empty state with animated icon
- 🔄 Smooth exit animations

**Props:**
```typescript
interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
```

**Usage:**
```tsx
import { TaskList } from './components/TaskList';

<TaskList
  tasks={tasks}
  onToggleComplete={handleToggleComplete}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### TaskForm

Modal form for creating and editing tasks with validation.

**Features:**
- 🎨 Smooth modal animations
- 📝 Inputs for title, description, priority, and due date
- 📅 Native date picker component
- ✅ Real-time validation on submit
- 🔘 Cancel and submit buttons with animations
- 🎯 Auto-focus management

**Props:**
```typescript
interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: Task | null;
}
```

**Usage:**
```tsx
import { TaskForm } from './components/TaskForm';

<TaskForm
  isOpen={isFormOpen}
  onClose={handleCloseForm}
  onSubmit={handleSubmit}
  initialData={editingTask} // Optional: for editing existing task
/>
```

## Types

### Task
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### TaskFormData
```typescript
interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: Date;
}
```

## Priority Colors

The components use a consistent color scheme for priorities:

```typescript
const PRIORITY_COLORS = {
  high: '#ef4444',    // Red
  medium: '#f59e0b',  // Orange
  low: '#3b82f6',     // Blue
};
```

## Installation

1. Install dependencies:
```bash
npm install react react-dom framer-motion
npm install --save-dev @types/react @types/react-dom typescript
```

2. Import components:
```tsx
import { TaskList, TaskForm } from './components';
import type { Task, TaskFormData } from './types/task';
```

## Complete Example

See `src/App.tsx` for a complete working example that demonstrates:
- State management for tasks
- Creating new tasks
- Editing existing tasks
- Deleting tasks
- Toggling task completion

## Animation Details

### TaskItem Animations
- **Checkbox**: Spring animation with stiffness: 500, damping: 30
- **Checkmark**: Path drawing animation over 0.3s
- **Text**: Smooth opacity and text-decoration transition
- **Buttons**: Scale animations on hover and tap

### TaskList Animations
- **Enter**: Staggered fade-in and slide-up (50ms delay between items)
- **Exit**: Fade-out and scale-down
- **Empty State**: Pulsing icon animation

### TaskForm Animations
- **Modal Backdrop**: Fade-in/out
- **Modal Content**: Scale and slide animation
- **Error Messages**: Slide-down fade-in

## Accessibility

All components follow accessibility best practices:
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modal
- Proper form validation feedback

## Browser Support

Works in all modern browsers that support:
- ES6+
- CSS Grid
- CSS Flexbox
- Framer Motion (React 16.8+)

## License

MIT
