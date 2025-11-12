# Zustand Task Store

A TypeScript-based Zustand store for managing tasks in a ToDo application with automatic localStorage persistence.

## Features

- ✅ **Full TypeScript support** with strict mode
- 💾 **Automatic persistence** to localStorage using Zustand's persist middleware
- 🔍 **Powerful filtering** by status, priority, search term, and tags
- 📊 **Completion statistics** tracking
- 🎯 **Type-safe** operations with comprehensive interfaces

## Installation

```bash
npm install zustand
```

## Task Interface

Each task has the following structure:

```typescript
interface Task {
  id: string;                 // Auto-generated unique identifier
  title: string;              // Task title
  description: string;        // Task description
  completed: boolean;         // Completion status
  priority: 'low' | 'medium' | 'high';  // Priority level
  dueDate: string | null;     // ISO date string or null
  tags: string[];             // Array of tags
  createdAt: string;          // Auto-generated creation timestamp
  updatedAt: string;          // Auto-updated modification timestamp
}
```

## Store Methods

### Task Management

#### `addTask(task)`
Add a new task to the store. The `id`, `createdAt`, and `updatedAt` fields are auto-generated.

```typescript
const { addTask } = useTaskStore.getState();

addTask({
  title: 'Complete project proposal',
  description: 'Write and submit the Q4 project proposal',
  completed: false,
  priority: 'high',
  dueDate: '2025-12-01T00:00:00.000Z',
  tags: ['work', 'urgent'],
});
```

#### `updateTask(id, updates)`
Update an existing task. The `updatedAt` field is automatically updated.

```typescript
const { updateTask } = useTaskStore.getState();

updateTask('task-id', {
  title: 'Updated title',
  priority: 'medium',
  description: 'New description',
});
```

#### `deleteTask(id)`
Delete a task by its ID.

```typescript
const { deleteTask } = useTaskStore.getState();
deleteTask('task-id');
```

#### `toggleComplete(id)`
Toggle the completed status of a task.

```typescript
const { toggleComplete } = useTaskStore.getState();
toggleComplete('task-id');
```

### Filtering

#### `setFilter(filter)`
Set filter criteria. All filter properties are optional.

```typescript
const { setFilter } = useTaskStore.getState();

// Filter by status
setFilter({ status: 'active' });  // 'all' | 'active' | 'completed'

// Filter by priority
setFilter({ priority: 'high' });  // 'low' | 'medium' | 'high' | null

// Filter by search term (searches in title and description)
setFilter({ searchTerm: 'project' });

// Filter by tags (shows tasks with any matching tag)
setFilter({ tags: ['work', 'urgent'] });

// Combine multiple filters
setFilter({
  status: 'active',
  priority: 'high',
  searchTerm: 'proposal',
  tags: ['work'],
});
```

#### `getFilteredTasks()`
Get tasks based on current filter state.

```typescript
const { getFilteredTasks } = useTaskStore.getState();
const filteredTasks = getFilteredTasks();
```

### Statistics

#### `getCompletionStats()`
Get completion statistics for all tasks.

```typescript
const { getCompletionStats } = useTaskStore.getState();
const stats = getCompletionStats();

console.log(stats);
// {
//   total: 10,
//   completed: 6,
//   active: 4,
//   completionRate: 60
// }
```

## Usage in React

```typescript
import { useTaskStore } from './taskStore';

function TaskList() {
  // Select specific state
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  
  // Or use the entire store
  const store = useTaskStore();
  
  return (
    <div>
      <button onClick={() => addTask({
        title: 'New Task',
        description: '',
        completed: false,
        priority: 'medium',
        dueDate: null,
        tags: [],
      })}>
        Add Task
      </button>
      
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          <span>{task.title}</span>
        </div>
      ))}
    </div>
  );
}
```

## Usage in Vanilla JavaScript/TypeScript

```typescript
import { useTaskStore } from './taskStore';

// Get the current state
const state = useTaskStore.getState();

// Call methods
state.addTask({
  title: 'My Task',
  description: 'Task description',
  completed: false,
  priority: 'medium',
  dueDate: null,
  tags: ['personal'],
});

// Subscribe to changes
const unsubscribe = useTaskStore.subscribe(
  (state) => state.tasks,
  (tasks) => console.log('Tasks updated:', tasks)
);

// Unsubscribe when done
unsubscribe();
```

## Persistence

The store automatically persists to localStorage under the key `'task-storage'`. Data is automatically loaded on initialization and saved on every update.

To clear persisted data:

```typescript
localStorage.removeItem('task-storage');
```

## TypeScript Configuration

Ensure your `tsconfig.json` has strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## License

ISC
