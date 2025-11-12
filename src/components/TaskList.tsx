import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';
import { Task } from '../types';
import { useTaskStore } from '../stores/taskStore';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { toggleTask, deleteTask } = useTaskStore();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'var(--priority-high)';
      case 'medium':
        return 'var(--priority-medium)';
      case 'low':
        return 'var(--priority-low)';
      default:
        return 'var(--priority-low)';
    }
  };

  return (
    <div className="task-list-container">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
            layout
          >
            <div
              className="priority-indicator"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            />
            <div className="task-content">
              <button
                className="task-checkbox"
                onClick={() => toggleTask(task.id)}
                aria-label={task.status === 'completed' ? 'Mark as active' : 'Mark as completed'}
              >
                {task.status === 'completed' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check size={16} />
                  </motion.div>
                )}
              </button>
              <div className="task-details">
                <p className="task-title">{task.title}</p>
                <div className="task-meta">
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="empty-state"
        >
          <p>No tasks found. Add a new task to get started!</p>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;
