/**
 * Test file for the Task Store
 * Run with: node dist/test.js
 */

import { useTaskStore } from './taskStore';

console.log('🧪 Testing Task Store...\n');

// Test 1: Initial state
console.log('Test 1: Check initial state');
const initialState = useTaskStore.getState();
console.log('✓ Tasks:', initialState.tasks.length === 0 ? 'Empty (expected)' : `Has ${initialState.tasks.length} tasks`);
console.log('✓ Filter:', JSON.stringify(initialState.filter));

// Test 2: Add tasks
console.log('\nTest 2: Add tasks');
const { addTask } = useTaskStore.getState();

addTask({
  title: 'High priority task',
  description: 'This is a high priority task',
  completed: false,
  priority: 'high',
  dueDate: '2025-12-01T00:00:00.000Z',
  tags: ['work', 'urgent'],
});

addTask({
  title: 'Medium priority task',
  description: 'This is a medium priority task',
  completed: false,
  priority: 'medium',
  dueDate: null,
  tags: ['personal'],
});

addTask({
  title: 'Completed low priority task',
  description: 'This task is already done',
  completed: true,
  priority: 'low',
  dueDate: null,
  tags: ['home'],
});

const tasksAfterAdd = useTaskStore.getState().tasks;
console.log(`✓ Added ${tasksAfterAdd.length} tasks`);
console.log('✓ Task 1:', tasksAfterAdd[0].title);
console.log('✓ Task 2:', tasksAfterAdd[1].title);
console.log('✓ Task 3:', tasksAfterAdd[2].title);

// Test 3: Update task
console.log('\nTest 3: Update task');
const { updateTask } = useTaskStore.getState();
const firstTaskId = tasksAfterAdd[0].id;
updateTask(firstTaskId, {
  title: 'Updated high priority task',
  priority: 'medium',
});
const updatedTask = useTaskStore.getState().tasks.find(t => t.id === firstTaskId);
console.log('✓ Updated title:', updatedTask?.title);
console.log('✓ Updated priority:', updatedTask?.priority);
console.log('✓ Has updatedAt:', updatedTask?.updatedAt ? 'Yes' : 'No');

// Test 4: Toggle completion
console.log('\nTest 4: Toggle completion');
const { toggleComplete } = useTaskStore.getState();
const secondTaskId = tasksAfterAdd[1].id;
const beforeToggle = useTaskStore.getState().tasks.find(t => t.id === secondTaskId)?.completed;
toggleComplete(secondTaskId);
const afterToggle = useTaskStore.getState().tasks.find(t => t.id === secondTaskId)?.completed;
console.log('✓ Before toggle:', beforeToggle);
console.log('✓ After toggle:', afterToggle);

// Test 5: Filtering by status
console.log('\nTest 5: Filter by status');
const { setFilter, getFilteredTasks } = useTaskStore.getState();

setFilter({ status: 'all' });
console.log('✓ All tasks:', getFilteredTasks().length);

setFilter({ status: 'active' });
console.log('✓ Active tasks:', getFilteredTasks().length);

setFilter({ status: 'completed' });
console.log('✓ Completed tasks:', getFilteredTasks().length);

// Test 6: Filtering by priority
console.log('\nTest 6: Filter by priority');
setFilter({ status: 'all', priority: 'high' });
console.log('✓ High priority tasks:', getFilteredTasks().length);

setFilter({ status: 'all', priority: 'medium' });
console.log('✓ Medium priority tasks:', getFilteredTasks().length);

setFilter({ status: 'all', priority: 'low' });
console.log('✓ Low priority tasks:', getFilteredTasks().length);

// Test 7: Filtering by search term
console.log('\nTest 7: Filter by search term');
setFilter({ status: 'all', priority: null, searchTerm: 'high' });
console.log('✓ Tasks matching "high":', getFilteredTasks().length);

setFilter({ status: 'all', priority: null, searchTerm: 'completed' });
console.log('✓ Tasks matching "completed":', getFilteredTasks().length);

// Test 8: Filtering by tags
console.log('\nTest 8: Filter by tags');
setFilter({ status: 'all', priority: null, searchTerm: '', tags: ['work'] });
console.log('✓ Tasks with "work" tag:', getFilteredTasks().length);

setFilter({ status: 'all', priority: null, searchTerm: '', tags: ['personal'] });
console.log('✓ Tasks with "personal" tag:', getFilteredTasks().length);

// Test 9: Completion statistics
console.log('\nTest 9: Completion statistics');
setFilter({ status: 'all', priority: null, searchTerm: '', tags: [] });
const { getCompletionStats } = useTaskStore.getState();
const stats = getCompletionStats();
console.log('✓ Total tasks:', stats.total);
console.log('✓ Completed tasks:', stats.completed);
console.log('✓ Active tasks:', stats.active);
console.log('✓ Completion rate:', `${stats.completionRate.toFixed(2)}%`);

// Test 10: Delete task
console.log('\nTest 10: Delete task');
const { deleteTask } = useTaskStore.getState();
const taskCountBefore = useTaskStore.getState().tasks.length;
const taskToDelete = useTaskStore.getState().tasks[0].id;
deleteTask(taskToDelete);
const taskCountAfter = useTaskStore.getState().tasks.length;
console.log('✓ Tasks before delete:', taskCountBefore);
console.log('✓ Tasks after delete:', taskCountAfter);

// Test 11: Verify persistence
console.log('\nTest 11: Check localStorage persistence');
const storageData = localStorage.getItem('task-storage');
if (storageData) {
  const parsed = JSON.parse(storageData);
  console.log('✓ Data persisted to localStorage');
  console.log('✓ Stored tasks count:', parsed.state?.tasks?.length || 0);
} else {
  console.log('✗ No data in localStorage');
}

console.log('\n✅ All tests completed!');
