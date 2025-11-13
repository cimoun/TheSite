import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFilteredTasks } from '../hooks/useFilteredTasks';
import { useTaskStore } from '../stores/taskStore';
import { useUIStore } from '../stores/uiStore';

describe('useFilteredTasks with sorting', () => {
  beforeEach(() => {
    // Reset stores before each test
    useTaskStore.setState({ tasks: [] });
    useUIStore.setState({
      searchQuery: '',
      currentFilter: 'all',
      sortMode: 'default',
      isLoading: false,
      theme: 'light',
      reduceAnimations: false
    });
  });

  describe('sorting by due date', () => {
    it('should sort tasks by due date (earliest first)', () => {
      const { addTask } = useTaskStore.getState();
      const { setSortMode } = useUIStore.getState();
      
      addTask('Task 1', 'medium', '2024-12-31');
      addTask('Task 2', 'medium', '2024-01-15');
      addTask('Task 3', 'medium', '2024-06-20');
      
      setSortMode('dueDate');
      
      const { result } = renderHook(() => useFilteredTasks());
      
      expect(result.current).toHaveLength(3);
      expect(result.current[0]!.text).toBe('Task 2');
      expect(result.current[1]!.text).toBe('Task 3');
      expect(result.current[2]!.text).toBe('Task 1');
    });

    it('should place tasks without due date at the end', () => {
      const { addTask } = useTaskStore.getState();
      const { setSortMode } = useUIStore.getState();
      
      addTask('Task without date', 'medium');
      addTask('Task with early date', 'medium', '2024-01-01');
      addTask('Task with late date', 'medium', '2024-12-31');
      
      setSortMode('dueDate');
      
      const { result } = renderHook(() => useFilteredTasks());
      
      expect(result.current).toHaveLength(3);
      expect(result.current[0]!.text).toBe('Task with early date');
      expect(result.current[1]!.text).toBe('Task with late date');
      expect(result.current[2]!.text).toBe('Task without date');
    });
  });

  describe('sorting by priority', () => {
    it('should sort tasks by priority (high to low)', () => {
      const { addTask } = useTaskStore.getState();
      const { setSortMode } = useUIStore.getState();
      
      addTask('Low priority task', 'low');
      addTask('High priority task', 'high');
      addTask('Medium priority task', 'medium');
      
      setSortMode('priority');
      
      const { result } = renderHook(() => useFilteredTasks());
      
      expect(result.current).toHaveLength(3);
      expect(result.current[0]!.text).toBe('High priority task');
      expect(result.current[1]!.text).toBe('Medium priority task');
      expect(result.current[2]!.text).toBe('Low priority task');
    });
  });

  describe('default sorting', () => {
    it('should keep tasks in default order (newest first)', () => {
      const { addTask } = useTaskStore.getState();
      
      addTask('First task', 'low');
      addTask('Second task', 'high');
      addTask('Third task', 'medium');
      
      const { result } = renderHook(() => useFilteredTasks());
      
      expect(result.current).toHaveLength(3);
      expect(result.current[0]!.text).toBe('Third task');
      expect(result.current[1]!.text).toBe('Second task');
      expect(result.current[2]!.text).toBe('First task');
    });
  });

  describe('sorting with filters', () => {
    it('should apply sorting after filtering', () => {
      const { addTask, toggleTask } = useTaskStore.getState();
      const { setCurrentFilter, setSortMode } = useUIStore.getState();
      
      addTask('Active low', 'low');
      addTask('Active high', 'high');
      addTask('Completed medium', 'medium');
      
      const tasks = useTaskStore.getState().tasks;
      toggleTask(tasks[0]!.id); // Complete "Completed medium"
      
      setCurrentFilter('active');
      setSortMode('priority');
      
      const { result } = renderHook(() => useFilteredTasks());
      
      expect(result.current).toHaveLength(2);
      expect(result.current[0]!.text).toBe('Active high');
      expect(result.current[1]!.text).toBe('Active low');
    });
  });
});
