import React, { useState } from 'react';
import { TaskList, TaskForm } from './components/index.js';
import type { Task, TaskFormData } from './types/task.js';

/**
 * Example usage of the Task Management components
 * 
 * This demonstrates how to use TaskList, TaskItem, and TaskForm components
 * together to build a complete task management interface.
 */
export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive docs for the new feature',
      priority: 'high',
      dueDate: new Date('2025-11-15'),
      completed: false,
      createdAt: new Date('2025-11-10'),
      updatedAt: new Date('2025-11-10'),
    },
    {
      id: '2',
      title: 'Review pull requests',
      description: 'Review and approve pending PRs from team',
      priority: 'medium',
      dueDate: new Date('2025-11-13'),
      completed: false,
      createdAt: new Date('2025-11-11'),
      updatedAt: new Date('2025-11-11'),
    },
    {
      id: '3',
      title: 'Update dependencies',
      priority: 'low',
      completed: true,
      createdAt: new Date('2025-11-09'),
      updatedAt: new Date('2025-11-12'),
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date() }
          : task
      )
    );
  };

  const handleEdit = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setEditingTask(task);
      setIsFormOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const handleSubmit = (data: TaskFormData) => {
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...data,
                updatedAt: new Date(),
              }
            : task
        )
      );
      setEditingTask(null);
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        ...data,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '32px', color: '#1f2937' }}>
          📝 Task Manager
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 500,
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
        >
          + New Task
        </button>
      </div>

      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default App;
