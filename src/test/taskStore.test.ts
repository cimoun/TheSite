import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../stores/taskStore';

describe('taskStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTaskStore.setState({ tasks: [] });
  });

  describe('addTask', () => {
    it('should add a new task with default medium priority', () => {
      const { addTask } = useTaskStore.getState();
      
      addTask('Test task');
      
      const state = useTaskStore.getState();
      expect(state.tasks).toHaveLength(1);
      expect(state.tasks[0]).toMatchObject({
        text: 'Test task',
        completed: false,
        priority: 'medium',
      });
      expect(state.tasks[0]!.id).toBeDefined();
      expect(state.tasks[0]!.createdAt).toBeDefined();
      expect(state.tasks[0]!.updatedAt).toBeDefined();
    });

    it('should add a task with specified priority', () => {
      const { addTask } = useTaskStore.getState();
      
      addTask('High priority task', 'high');
      
      const state = useTaskStore.getState();
      expect(state.tasks[0]!.priority).toBe('high');
    });

    it('should trim task text', () => {
      const { addTask } = useTaskStore.getState();
      
      addTask('  Trimmed task  ');
      
      const state = useTaskStore.getState();
      expect(state.tasks[0]!.text).toBe('Trimmed task');
    });

    it('should add tasks at the beginning of the list', () => {
      const { addTask } = useTaskStore.getState();
      
      addTask('First task');
      addTask('Second task');
      
      const state = useTaskStore.getState();
      expect(state.tasks[0]!.text).toBe('Second task');
      expect(state.tasks[1]!.text).toBe('First task');
    });
  });

  describe('toggleTask', () => {
    it('should toggle task completion status', () => {
      const { addTask, toggleTask } = useTaskStore.getState();
      
      addTask('Test task');
      const taskId = useTaskStore.getState().tasks[0]!.id;
      
      toggleTask(taskId);
      expect(useTaskStore.getState().tasks[0]!.completed).toBe(true);
      
      toggleTask(taskId);
      expect(useTaskStore.getState().tasks[0]!.completed).toBe(false);
    });

    it('should update updatedAt when toggling', () => {
      const { addTask, toggleTask } = useTaskStore.getState();
      
      addTask('Test task');
      const task = useTaskStore.getState().tasks[0]!;
      const originalUpdatedAt = task.updatedAt;
      
      // Wait a tiny bit to ensure timestamp changes
      setTimeout(() => {
        toggleTask(task.id);
        const updatedTask = useTaskStore.getState().tasks[0]!;
        expect(updatedTask.updatedAt).not.toBe(originalUpdatedAt);
      }, 10);
    });

    it('should not affect other tasks', () => {
      const { addTask, toggleTask } = useTaskStore.getState();
      
      addTask('Task 1');
      addTask('Task 2');
      const taskId = useTaskStore.getState().tasks[0]!.id;
      
      toggleTask(taskId);
      
      const state = useTaskStore.getState();
      expect(state.tasks[0]!.completed).toBe(true);
      expect(state.tasks[1]!.completed).toBe(false);
    });
  });

  describe('deleteTask', () => {
    it('should remove a task by id', () => {
      const { addTask, deleteTask } = useTaskStore.getState();
      
      addTask('Task to delete');
      const taskId = useTaskStore.getState().tasks[0]!.id;
      
      deleteTask(taskId);
      
      expect(useTaskStore.getState().tasks).toHaveLength(0);
    });

    it('should only remove the specified task', () => {
      const { addTask, deleteTask } = useTaskStore.getState();
      
      addTask('Task 1');
      addTask('Task 2');
      addTask('Task 3');
      const taskIdToDelete = useTaskStore.getState().tasks[1]!.id;
      
      deleteTask(taskIdToDelete);
      
      const state = useTaskStore.getState();
      expect(state.tasks).toHaveLength(2);
      expect(state.tasks.find(t => t.id === taskIdToDelete)).toBeUndefined();
    });
  });

  describe('updateTask', () => {
    it('should update task text', () => {
      const { addTask, updateTask } = useTaskStore.getState();
      
      addTask('Original text');
      const taskId = useTaskStore.getState().tasks[0]!.id;
      
      updateTask(taskId, 'Updated text');
      
      expect(useTaskStore.getState().tasks[0]!.text).toBe('Updated text');
    });

    it('should update task priority', () => {
      const { addTask, updateTask } = useTaskStore.getState();
      
      addTask('Task with medium priority');
      const taskId = useTaskStore.getState().tasks[0]!.id;
      
      updateTask(taskId, 'Task with high priority', 'high');
      
      const task = useTaskStore.getState().tasks[0]!;
      expect(task.text).toBe('Task with high priority');
      expect(task.priority).toBe('high');
    });

    it('should trim updated text', () => {
      const { addTask, updateTask } = useTaskStore.getState();
      
      addTask('Original');
      const taskId = useTaskStore.getState().tasks[0]!.id;
      
      updateTask(taskId, '  Updated with spaces  ');
      
      expect(useTaskStore.getState().tasks[0]!.text).toBe('Updated with spaces');
    });
  });

  describe('clearCompleted', () => {
    it('should remove all completed tasks', () => {
      const { addTask, toggleTask, clearCompleted } = useTaskStore.getState();
      
      addTask('Task 1');
      addTask('Task 2');
      addTask('Task 3');
      
      const tasks = useTaskStore.getState().tasks;
      toggleTask(tasks[0]!.id);
      toggleTask(tasks[2]!.id);
      
      clearCompleted();
      
      const state = useTaskStore.getState();
      expect(state.tasks).toHaveLength(1);
      expect(state.tasks[0]!.text).toBe('Task 2');
    });

    it('should not affect tasks if none are completed', () => {
      const { addTask, clearCompleted } = useTaskStore.getState();
      
      addTask('Task 1');
      addTask('Task 2');
      
      clearCompleted();
      
      expect(useTaskStore.getState().tasks).toHaveLength(2);
    });
  });

  describe('getFilteredTasks', () => {
    beforeEach(() => {
      const { addTask, toggleTask } = useTaskStore.getState();
      
      addTask('Completed task');
      addTask('Active task 1');
      addTask('Active task 2');
      
      const tasks = useTaskStore.getState().tasks;
      toggleTask(tasks[0]!.id);
    });

    it('should return all tasks when filter is "all"', () => {
      const { getFilteredTasks } = useTaskStore.getState();
      
      const filtered = getFilteredTasks('all');
      
      expect(filtered).toHaveLength(3);
    });

    it('should return only active tasks when filter is "active"', () => {
      const { getFilteredTasks } = useTaskStore.getState();
      
      const filtered = getFilteredTasks('active');
      
      expect(filtered).toHaveLength(2);
      expect(filtered.every(t => !t.completed)).toBe(true);
    });

    it('should return only completed tasks when filter is "completed"', () => {
      const { getFilteredTasks } = useTaskStore.getState();
      
      const filtered = getFilteredTasks('completed');
      
      expect(filtered).toHaveLength(1);
      expect(filtered.every(t => t.completed)).toBe(true);
    });

    it('should filter by search query', () => {
      const { getFilteredTasks } = useTaskStore.getState();
      
      const filtered = getFilteredTasks('all', 'task 1');
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]!.text).toBe('Active task 1');
    });

    it('should filter case-insensitively', () => {
      const { getFilteredTasks } = useTaskStore.getState();
      
      const filtered = getFilteredTasks('all', 'ACTIVE');
      
      expect(filtered).toHaveLength(2);
    });

    it('should combine status filter and search query', () => {
      const { getFilteredTasks } = useTaskStore.getState();
      
      const filtered = getFilteredTasks('active', 'task 1');
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]!.text).toBe('Active task 1');
      expect(filtered[0]!.completed).toBe(false);
    });
  });
});
