import React from 'react';
import { motion } from 'framer-motion';
import type { Task, Priority } from '../types/task.js';
import { PRIORITY_COLORS } from '../types/task.js';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const priorityColor = PRIORITY_COLORS[task.priority];

  const formatDueDate = (date?: Date): string => {
    if (!date) return '';
    const now = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '8px',
        border: '1px solid #e5e7eb',
      }}
    >
      {/* Checkbox with spring animation */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: 'pointer' }}
      >
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            style={{ display: 'none' }}
          />
          <motion.div
            animate={{
              scale: task.completed ? 1 : 1,
              backgroundColor: task.completed ? '#10b981' : '#ffffff',
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: `2px solid ${task.completed ? '#10b981' : '#d1d5db'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {task.completed && (
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              >
                <motion.path d="M3 8l3 3 7-7" />
              </motion.svg>
            )}
          </motion.div>
        </label>
      </motion.div>

      {/* Task content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <motion.h3
          animate={{
            textDecoration: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.6 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 500,
            color: '#1f2937',
            wordBreak: 'break-word',
          }}
        >
          {task.title}
        </motion.h3>
        {task.description && (
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '14px',
              color: '#6b7280',
              opacity: task.completed ? 0.6 : 1,
            }}
          >
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '13px',
              color: '#9ca3af',
            }}
          >
            📅 {formatDueDate(task.dueDate)}
          </p>
        )}
      </div>

      {/* Priority badge */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          padding: '4px 12px',
          borderRadius: '12px',
          backgroundColor: priorityColor,
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'capitalize',
          whiteSpace: 'nowrap',
        }}
      >
        {task.priority}
      </motion.div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(task.id)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
          aria-label="Edit task"
        >
          ✏️
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(task.id)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
          }}
          aria-label="Delete task"
        >
          🗑️
        </motion.button>
      </div>
    </motion.div>
  );
};
