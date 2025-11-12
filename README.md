# Modern ToDo App - React 18 + TypeScript

A modern, feature-rich ToDo application built with React 18, TypeScript, Vite, Zustand, Framer Motion, and Tailwind CSS.

## 🚀 Features

- ✅ Modern React 18 with TypeScript strict mode
- 🎨 Beautiful UI with Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🔄 State management with Zustand
- 📦 Fast build tool with Vite
- 🔍 Search and filter functionality
- 💾 Local storage persistence
- 📊 Task statistics and progress tracking

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── LoadingSpinner.tsx
│   ├── task/            # Task-specific components
│   │   ├── TaskInput.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskSearch.tsx
│   │   └── TaskStats.tsx
│   └── layouts/         # Layout components
│       ├── Header.tsx
│       ├── MainLayout.tsx
│       └── Footer.tsx
├── stores/              # Zustand state stores
│   ├── taskStore.ts     # Task management state
│   └── uiStore.ts       # UI state (filters, search)
├── types/               # TypeScript type definitions
│   ├── task.ts
│   └── ui.ts
├── hooks/               # Custom React hooks
│   ├── useFilteredTasks.ts
│   └── useKeyboardShortcuts.ts
├── utils/               # Utility functions
│   ├── helpers.ts       # Helper functions
│   └── animations.ts    # Framer Motion animations
├── styles/              # Global styles
│   ├── globals.css
│   └── animations.css
├── App.tsx              # Root component
└── main.tsx             # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Lint

Run ESLint:

```bash
npm run lint
```

### Preview

Preview the production build:

```bash
npm run preview
```

## 📝 Key Components

### State Management (Zustand)

- **taskStore**: Manages tasks (add, update, delete, toggle, filter)
- **uiStore**: Manages UI state (search query, filters, theme)

### Custom Hooks

- **useFilteredTasks**: Returns filtered tasks based on current filter and search
- **useKeyboardShortcuts**: Handles keyboard shortcuts for better UX

### Animations (Framer Motion)

- Smooth fade-in effects
- Slide-up animations for new tasks
- Stagger animations for task lists
- Hover and tap interactions

## 🎨 Styling

The app uses Tailwind CSS with custom configurations:

- Custom color palette with primary blues
- Glass-morphism effects
- Responsive design
- Custom animations and transitions

## 📦 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration (strict mode enabled)
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.cjs` - ESLint configuration

## 🔒 TypeScript Strict Mode

This project uses TypeScript with strict mode enabled for maximum type safety:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `exactOptionalPropertyTypes: true`

## 📄 License

See the [LICENSE](LICENSE) file for details.
