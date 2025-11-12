import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Plus,
  Search,
  Sun,
  Moon,
  CheckCircle2,
  ListTodo,
  AlertCircle,
} from 'lucide-react';
import { useTaskStore } from './stores/taskStore';
import { useUIStore } from './stores/uiStore';
import TaskList from './components/TaskList';
import { TaskPriority, StatusFilter, PriorityFilter } from './types';
import './styles/App.css';

const App: React.FC = () => {
  const {
    tasks,
    addTask,
    clearCompleted,
  } = useTaskStore();

  const {
    theme,
    searchQuery,
    statusFilter,
    priorityFilter,
    toggleTheme,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
  } = useUIStore();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('medium');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        debouncedSearch === '' ||
        task.title.toLowerCase().includes(debouncedSearch.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, debouncedSearch, statusFilter, priorityFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const remaining = total - completed;
    const completionPercentage = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, remaining, completionPercentage };
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), newTaskPriority);
      setNewTaskTitle('');
      setNewTaskPriority('medium');
      setShowAddDialog(false);
      toast.success('Task added successfully!');
    } else {
      toast.error('Please enter a task title');
    }
  };

  const handleClearCompleted = () => {
    if (stats.completed > 0) {
      clearCompleted();
      toast.success(`Cleared ${stats.completed} completed tasks`);
    } else {
      toast.info('No completed tasks to clear');
    }
  };

  return (
    <div className="app">
      {/* Header with Progress Bar */}
      <header className="app-header">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="header-content"
        >
          <h1>Task Manager</h1>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
          </button>
        </motion.div>
        <div className="progress-bar-container">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="content-wrapper"
        >
          {/* Search Input */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tasks"
            />
          </div>

          {/* Filter Buttons */}
          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">Status:</label>
              <div className="filter-buttons">
                {(['all', 'active', 'completed'] as StatusFilter[]).map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`filter-btn ${statusFilter === filter ? 'active' : ''}`}
                    onClick={() => setStatusFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Priority:</label>
              <div className="filter-buttons">
                {(['all', 'low', 'medium', 'high'] as PriorityFilter[]).map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`filter-btn ${priorityFilter === filter ? 'active' : ''}`}
                    onClick={() => setPriorityFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Grid - 3 columns on desktop, 1 on mobile */}
          <div className="stats-grid">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="stat-card"
            >
              <div className="stat-icon">
                <ListTodo size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Tasks</p>
                <p className="stat-value">{stats.total}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="stat-card"
            >
              <div className="stat-icon completed">
                <CheckCircle2 size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Completed</p>
                <p className="stat-value">{stats.completed}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="stat-card"
            >
              <div className="stat-icon pending">
                <AlertCircle size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Remaining</p>
                <p className="stat-value">{stats.remaining}</p>
              </div>
            </motion.div>
          </div>

          {/* Task List */}
          <TaskList tasks={filteredTasks} />

          {/* Clear Completed Button */}
          {stats.completed > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="clear-completed-btn"
              onClick={handleClearCompleted}
            >
              Clear Completed ({stats.completed})
            </motion.button>
          )}
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fab"
        onClick={() => setShowAddDialog(true)}
        aria-label="Add new task"
      >
        <Plus size={24} />
      </motion.button>

      {/* Add Task Dialog */}
      {showAddDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dialog-overlay"
          onClick={() => setShowAddDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add New Task</h2>
            <input
              type="text"
              className="dialog-input"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              autoFocus
            />
            <div className="dialog-priority">
              <label>Priority:</label>
              <div className="priority-buttons">
                {(['low', 'medium', 'high'] as TaskPriority[]).map((priority) => (
                  <button
                    key={priority}
                    className={`priority-btn priority-${priority} ${
                      newTaskPriority === priority ? 'active' : ''
                    }`}
                    onClick={() => setNewTaskPriority(priority)}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="dialog-actions">
              <button
                className="dialog-btn cancel"
                onClick={() => setShowAddDialog(false)}
              >
                Cancel
              </button>
              <button className="dialog-btn confirm" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
};

export default App;
