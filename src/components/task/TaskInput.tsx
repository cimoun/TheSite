import { useState } from 'react';
import { Button, Input } from '../common';
import { useTaskStore } from '../../stores/taskStore';
import { validateTaskText } from '../../utils/helpers';
import { Priority, PRIORITY_COLORS } from '../../types/task';
import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animations';

export const TaskInput: React.FC = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTaskText(text);
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid task');
      return;
    }

    addTask(text, priority);
    setText('');
    setPriority('medium');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError('');
  };

  const priorities: Priority[] = ['low', 'medium', 'high'];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-3 w-full"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-3">
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Add a new task..."
          maxLength={500}
          error={error}
          className="flex-1"
        />
        <Button type="submit" disabled={!text.trim()}>
          Add Task
        </Button>
      </div>
      
      <div className="flex gap-2 items-center">
        <span className="text-sm text-slate-600">Priority:</span>
        {priorities.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              priority === p
                ? 'text-white shadow-sm'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
            style={priority === p ? { backgroundColor: PRIORITY_COLORS[p] } : {}}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </motion.form>
  );
};
