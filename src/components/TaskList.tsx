import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../types/task.js';
import { TaskItem } from './TaskItem.js';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  // Empty state
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#9ca3af',
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}
        >
          📝
        </motion.div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#6b7280' }}>
          No tasks yet
        </h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Create your first task to get started!
        </p>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: '12px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
      }}
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05, // Stagger animation
            }}
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
