# Project Structure Documentation

## Complete Folder Structure

```
TheSite/
├── .eslintrc.cjs                 # ESLint configuration
├── .gitignore                    # Git ignore file
├── index.html                    # Main HTML entry point
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration (strict mode)
├── tsconfig.node.json            # TypeScript config for Node
├── vite.config.ts                # Vite build tool configuration
│
└── src/
    ├── main.tsx                  # Application entry point
    ├── App.tsx                   # Root component
    ├── vite-env.d.ts             # Vite TypeScript definitions
    │
    ├── components/
    │   ├── common/               # Reusable UI components
    │   │   ├── Button.tsx        # Animated button component
    │   │   ├── Card.tsx          # Card container component
    │   │   ├── Input.tsx         # Input field component
    │   │   ├── LoadingSpinner.tsx # Loading spinner component
    │   │   └── index.ts          # Component exports
    │   │
    │   ├── task/                 # Task-specific components
    │   │   ├── TaskInput.tsx     # New task input form
    │   │   ├── TaskItem.tsx      # Single task item display
    │   │   ├── TaskList.tsx      # Task list container
    │   │   ├── TaskFilters.tsx   # Filter buttons (all/active/completed)
    │   │   ├── TaskSearch.tsx    # Search input component
    │   │   ├── TaskStats.tsx     # Task statistics display
    │   │   └── index.ts          # Component exports
    │   │
    │   └── layouts/              # Layout components
    │       ├── Header.tsx        # App header
    │       ├── MainLayout.tsx    # Main layout wrapper
    │       ├── Footer.tsx        # App footer
    │       └── index.ts          # Component exports
    │
    ├── stores/                   # Zustand state management
    │   ├── taskStore.ts          # Task state and actions
    │   └── uiStore.ts            # UI state (filters, search, theme)
    │
    ├── types/                    # TypeScript type definitions
    │   ├── task.ts               # Task-related types
    │   └── ui.ts                 # UI-related types
    │
    ├── hooks/                    # Custom React hooks
    │   ├── useFilteredTasks.ts   # Hook for filtered tasks
    │   ├── useKeyboardShortcuts.ts # Keyboard shortcut handler
    │   └── index.ts              # Hook exports
    │
    ├── utils/                    # Utility functions
    │   ├── helpers.ts            # Helper functions (date, validation, etc.)
    │   ├── animations.ts         # Framer Motion animation configs
    │   └── index.ts              # Utility exports
    │
    └── styles/                   # Global styles
        ├── globals.css           # Tailwind directives and global styles
        └── animations.css        # Custom CSS animations
```

## Component Hierarchy

```
App
└── MainLayout
    ├── Header
    ├── TaskInput
    ├── (flex container)
    │   ├── TaskSearch
    │   └── TaskFilters
    ├── TaskList
    │   └── TaskItem (multiple)
    ├── TaskStats
    └── Footer
```

## State Management Flow

```
Components
    ↓ (useTaskStore, useUIStore)
Zustand Stores
    ↓
Local Storage (persist middleware)
```

## Key Features by File

### Components

**Common Components:**
- `Button.tsx`: Animated button with variants (primary, secondary, icon)
- `Card.tsx`: Container with glass effect and hover animations
- `Input.tsx`: Form input with error handling
- `LoadingSpinner.tsx`: Animated loading indicator

**Task Components:**
- `TaskInput.tsx`: Form to add new tasks with validation
- `TaskItem.tsx`: Individual task with checkbox, text, and delete button
- `TaskList.tsx`: Animated list container with empty state
- `TaskFilters.tsx`: Filter buttons for all/active/completed
- `TaskSearch.tsx`: Search input with icon
- `TaskStats.tsx`: Display task counts and clear completed button

**Layout Components:**
- `Header.tsx`: App title and subtitle
- `MainLayout.tsx`: Main container with glass morphism
- `Footer.tsx`: Credits and tech stack info

### Stores

**taskStore.ts:**
- State: tasks array
- Actions: addTask, toggleTask, deleteTask, updateTask, clearCompleted, getFilteredTasks
- Persistence: localStorage with zustand persist middleware

**uiStore.ts:**
- State: searchQuery, currentFilter, isLoading, theme
- Actions: setSearchQuery, setCurrentFilter, setIsLoading, toggleTheme

### Types

**task.ts:**
- Task interface
- TaskFilter type
- TaskFormData interface

**ui.ts:**
- UIState interface
- ModalState interface

### Hooks

**useFilteredTasks.ts:**
- Returns filtered tasks based on current filter and search query
- Combines taskStore and uiStore selectors

**useKeyboardShortcuts.ts:**
- Handles keyboard shortcuts (Escape, Enter, Ctrl+Enter)
- Accepts callbacks for different key combinations

### Utils

**helpers.ts:**
- formatDate: Convert dates to relative time
- getTaskStats: Calculate task statistics
- pluralizeTasks: Format task count text
- validateTaskText: Validate task input

**animations.ts:**
- fadeIn: Fade in animation variant
- slideUp: Slide up animation variant
- scale: Scale animation variant
- staggerContainer: Container for staggered children
- staggerItem: Item animation in stagger container
- hoverScale: Hover and tap scale effects

## Technology Stack Details

### Build & Development
- **Vite 5.0.8**: Fast build tool and dev server
- **TypeScript 5.2.2**: Type-safe JavaScript with strict mode
- **ESLint**: Code linting with TypeScript support

### UI & Styling
- **React 18.2.0**: UI library with hooks
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **PostCSS 8.4.32**: CSS processing
- **Autoprefixer 10.4.16**: Auto-add vendor prefixes

### State & Animation
- **Zustand 4.4.7**: Lightweight state management
- **Framer Motion 10.16.16**: Animation library

## Scripts

```json
{
  "dev": "vite",                          // Start dev server
  "build": "tsc && vite build",          // Build for production
  "lint": "eslint . --ext ts,tsx",       // Run linter
  "preview": "vite preview"              // Preview production build
}
```

## Configuration Highlights

### TypeScript (tsconfig.json)
- Strict mode enabled
- No unused locals/parameters allowed
- Exact optional property types
- No unchecked indexed access

### Tailwind (tailwind.config.js)
- Custom color palette (primary blues)
- Custom animations (fade-in, slide-up, slide-down)
- Extended keyframes
- Content scanning for all JS/TS/JSX/TSX files

### Vite (vite.config.ts)
- React plugin enabled
- Dev server on port 3000
- Source maps enabled for production
- Auto-open browser on dev

## Best Practices Implemented

1. **Component Organization**: Separated by concern (common/task/layouts)
2. **Type Safety**: Full TypeScript coverage with strict mode
3. **State Management**: Centralized with Zustand, persistent storage
4. **Animation**: Consistent Framer Motion animations
5. **Styling**: Utility-first with Tailwind, custom components
6. **Code Quality**: ESLint configured, no warnings allowed
7. **Performance**: Vite for fast builds, code splitting ready
8. **Accessibility**: ARIA labels, semantic HTML
9. **Developer Experience**: Hot module replacement, TypeScript IntelliSense
10. **Modularity**: Index files for clean imports
