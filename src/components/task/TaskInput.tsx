import { useState } from 'react';
import { Button, Input } from '../common';
import { useTaskStore } from '../../stores/taskStore';
import { validateTaskText } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { slideUp } from '../../utils/animations';

export const TaskInput: React.FC = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTaskText(text);
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid task');
      return;
    }

    addTask(text);
    setText('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
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
    </motion.form>
  );
};
