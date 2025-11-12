/**
 * Example usage of the Task Store
 * 
 * This file demonstrates how to use the Zustand task store
 * in a TypeScript application.
 */

import { useTaskStore } from './taskStore';

// Example 1: Adding tasks
function addExampleTasks() {
  const { addTask } = useTaskStore.getState();
  
  // Add a high priority task
  addTask({
    title: 'Complete project proposal',
    description: 'Write and submit the Q4 project proposal to management',
    completed: false,
    priority: 'high',
    dueDate: '2025-12-01T00:00:00.000Z',
    tags: ['work', 'urgent'],
  });
  
  // Add a medium priority task
  addTask({
    title: 'Review pull requests',
    description: 'Review open PRs in the main repository',
    completed: false,
    priority: 'medium',
    dueDate: null,
    tags: ['work', 'code-review'],
  });
  
  // Add a low priority task
  addTask({
    title: 'Update documentation',
    description: 'Update README and API documentation',
    completed: true,
    priority: 'low',
    dueDate: null,
    tags: ['documentation'],
  });
}

// Example 2: Updating tasks
function updateTaskExample() {
  const { tasks, updateTask } = useTaskStore.getState();
  
  if (tasks.length > 0) {
    const firstTask = tasks[0];
    
    // Update task title and priority
    updateTask(firstTask.id, {
      title: 'Updated task title',
      priority: 'high',
    });
  }
}

// Example 3: Toggle task completion
function toggleTaskExample() {
  const { tasks, toggleComplete } = useTaskStore.getState();
  
  if (tasks.length > 0) {
    const firstTask = tasks[0];
    toggleComplete(firstTask.id);
  }
}

// Example 4: Delete a task
function deleteTaskExample() {
  const { tasks, deleteTask } = useTaskStore.getState();
  
  if (tasks.length > 0) {
    const lastTask = tasks[tasks.length - 1];
    deleteTask(lastTask.id);
  }
}

// Example 5: Filtering tasks
function filteringExamples() {
  const { setFilter, getFilteredTasks } = useTaskStore.getState();
  
  // Filter to show only active tasks
  setFilter({ status: 'active' });
  console.log('Active tasks:', getFilteredTasks());
  
  // Filter to show only completed tasks
  setFilter({ status: 'completed' });
  console.log('Completed tasks:', getFilteredTasks());
  
  // Filter by priority
  setFilter({ status: 'all', priority: 'high' });
  console.log('High priority tasks:', getFilteredTasks());
  
  // Filter by search term
  setFilter({ status: 'all', priority: null, searchTerm: 'project' });
  console.log('Tasks matching "project":', getFilteredTasks());
  
  // Filter by tags
  setFilter({ status: 'all', priority: null, searchTerm: '', tags: ['work'] });
  console.log('Work-related tasks:', getFilteredTasks());
  
  // Reset filters
  setFilter({ status: 'all', priority: null, searchTerm: '', tags: [] });
}

// Example 6: Get completion statistics
function getStatsExample() {
  const { getCompletionStats } = useTaskStore.getState();
  
  const stats = getCompletionStats();
  console.log('Completion Statistics:', stats);
  console.log(`Total tasks: ${stats.total}`);
  console.log(`Completed: ${stats.completed}`);
  console.log(`Active: ${stats.active}`);
  console.log(`Completion rate: ${stats.completionRate.toFixed(2)}%`);
}

// Example 7: Using the store in a React component (if using React)
/*
import React from 'react';
import { useTaskStore } from './taskStore';

function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  
  const handleAddTask = () => {
    addTask({
      title: 'New task',
      description: 'Task description',
      completed: false,
      priority: 'medium',
      dueDate: null,
      tags: [],
    });
  };
  
  return (
    <div>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/

// Example 8: Subscribing to store changes
function subscribeExample() {
  const unsubscribe = useTaskStore.subscribe(
    (state) => {
      console.log('Store state changed:', state);
      console.log('Tasks:', state.tasks);
    }
  );
  
  // Later, to unsubscribe:
  // unsubscribe();
  
  return unsubscribe;
}

// Run examples (uncomment to test)
// addExampleTasks();
// updateTaskExample();
// toggleTaskExample();
// filteringExamples();
// getStatsExample();

export {
  addExampleTasks,
  updateTaskExample,
  toggleTaskExample,
  deleteTaskExample,
  filteringExamples,
  getStatsExample,
  subscribeExample,
};
