# Custom React Hooks for ToDo Application

This directory contains production-ready custom React hooks with TypeScript support for managing a ToDo application.

## Available Hooks

### 1. `useTasks` - Task Management

Manages tasks with full CRUD operations, filtering, and local storage persistence.

**Features:**
- ✅ Add, update, delete, and toggle tasks
- ✅ Filter tasks by status (all, active, completed)
- ✅ Priority management (high, medium, low)
- ✅ LocalStorage persistence
- ✅ Comprehensive error handling
- ✅ Automatic cleanup

**Example:**
```tsx
import { useTasks } from './hooks';

function TodoApp() {
  const {
    filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    activeCount,
    error
  } = useTasks({ storageKey: 'my-todos' });

  return (
    <div>
      <button onClick={() => addTask('New task', 'high')}>Add Task</button>
      <div>Active tasks: {activeCount}</div>
      {error && <div>Error: {error.message}</div>}
      {filteredTasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          {task.text}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### 2. `useUIState` - UI State Management

Manages UI-related state including dark mode, modals, and toast notifications.

**Features:**
- 🌓 Dark mode with localStorage persistence
- 🪟 Modal management (open/close/data)
- 🔔 Toast notifications with auto-hide
- ✅ Automatic cleanup
- ✅ Error handling

**Example:**
```tsx
import { useUIState } from './hooks';

function App() {
  const {
    isDarkMode,
    toggleDarkMode,
    showToast,
    openModal,
    closeModal,
    isModalOpen
  } = useUIState();

  const handleSave = () => {
    try {
      // Save logic
      showToast('Saved successfully!', 'success');
    } catch (err) {
      showToast('Failed to save', 'error');
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <button onClick={() => openModal('confirm', { action: 'delete' })}>
        Open Modal
      </button>
    </div>
  );
}
```

### 3. `useDebounce` - Debouncing

Debounces values or callbacks to optimize performance for expensive operations.

**Features:**
- ⏱️ Value debouncing
- 🔄 Callback debouncing
- ⚡ Leading/trailing edge options
- ✅ Automatic cleanup

**Example:**
```tsx
import { useDebounce, useDebounceCallback } from './hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Or use debounced callback
  const handleSearch = useDebounceCallback(
    (term: string) => {
      console.log('Searching for:', term);
      searchAPI(term);
    },
    { delay: 500 }
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

### 4. `usePrevious` - Track Previous Values

Tracks previous values across renders for comparison and change detection.

**Features:**
- 📊 Track single previous value
- 🔄 Custom comparator support
- 📜 Value history tracking
- 🔍 Change detection utility

**Example:**
```tsx
import { usePrevious, useHasChanged, usePreviousHistory } from './hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  const hasChanged = useHasChanged(count);
  const history = usePreviousHistory(count, 5);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount ?? 'N/A'}</p>
      <p>Changed: {hasChanged ? 'Yes' : 'No'}</p>
      <p>History: {history.join(', ')}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 5. `useAsync` - Async Operations

Handles async operations with loading, error, and success states, plus automatic cleanup.

**Features:**
- 🔄 Loading/error/success states
- ⚡ Auto-execution on mount option
- 🔁 Automatic retry support
- 🛑 Request cancellation
- ✅ Comprehensive error handling
- 🧹 Automatic cleanup

**Example:**
```tsx
import { useAsync, useAsyncWithRetry } from './hooks';

function UserProfile({ userId }: { userId: string }) {
  const fetchUser = async (id: string) => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  };

  const {
    data: user,
    error,
    isPending,
    execute
  } = useAsync(fetchUser);

  useEffect(() => {
    execute(userId);
  }, [userId, execute]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (user) return <div>User: {user.name}</div>;
  return null;
}

// With automatic retry
function RobustFetcher() {
  const { data, isPending, retryCount } = useAsyncWithRetry(
    async () => {
      const res = await fetch('/api/data');
      return res.json();
    },
    {
      executeOnMount: true,
      maxRetries: 3,
      retryDelay: 1000
    }
  );

  return (
    <div>
      {isPending && <div>Loading... (retry: {retryCount})</div>}
      {data && <div>Data loaded!</div>}
    </div>
  );
}
```

## Production-Ready Features

All hooks include:

- ✅ **TypeScript Types** - Full TypeScript support with comprehensive type definitions
- ✅ **Error Handling** - Proper error handling with typed error states
- ✅ **Cleanup** - Automatic cleanup of effects, timers, and subscriptions
- ✅ **JSDoc Comments** - Detailed documentation for all functions and types
- ✅ **Best Practices** - Following React hooks best practices and conventions
- ✅ **Memory Safety** - Proper memory management to prevent leaks

## Installation

These hooks require React 16.8+ and TypeScript 4.0+:

```bash
npm install react
npm install --save-dev typescript @types/react
```

## Usage

Import the hooks you need:

```tsx
import {
  useTasks,
  useUIState,
  useDebounce,
  usePrevious,
  useAsync
} from './hooks';
```

## TypeScript Support

All hooks are written in TypeScript and export their types:

```tsx
import type {
  Task,
  TaskPriority,
  UseTasksReturn,
  Toast,
  ToastType,
  AsyncState,
  UseAsyncReturn
} from './hooks';
```

## License

These hooks are part of the TheSite ToDo application.
