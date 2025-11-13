import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { validateTaskText } from '../../utils/helpers';
import { Priority, PRIORITY_COLORS } from '../../types/task';
import { motion } from 'framer-motion';

export const TaskInput: React.FC = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTaskText(text);
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid task');
      return;
    }

    addTask(text, priority, dueDate || undefined);
    setText('');
    setPriority('medium');
    setDueDate('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError('');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const priorities: Priority[] = ['low', 'medium', 'high'];

  const popInVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 w-full"
      variants={popInVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Что у вас на уме сегодня?"
          maxLength={500}
          className="flex-1 px-5 py-3 rounded-full border-2 border-transparent bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-calm-deepGreen/30 focus:ring-4 focus:ring-calm-deepGreen/10 transition-all duration-300 outline-none text-gray-700 placeholder-gray-400"
          style={{
            boxShadow: '0 2px 8px rgba(90, 115, 103, 0.08)',
          }}
          aria-label="Текст новой задачи"
        />
        <motion.button
          type="submit"
          disabled={!text.trim()}
          className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#5A7367',
            boxShadow: '0 4px 12px rgba(90, 115, 103, 0.25)',
          }}
          whileHover={text.trim() ? { scale: 1.05, boxShadow: '0 6px 16px rgba(90, 115, 103, 0.35)' } : {}}
          whileTap={text.trim() ? { scale: 0.98 } : {}}
          aria-label="Добавить новую задачу"
        >
          Добавить
        </motion.button>
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm px-5"
          style={{ color: '#D4726F' }}
        >
          {error}
        </motion.p>
      )}
      
      <div className="flex gap-4 items-center px-2">
        <label className="text-sm font-medium" id="priority-label" style={{ color: '#5A7367' }}>
          Приоритет:
        </label>
        <div role="group" aria-labelledby="priority-label" className="flex gap-2">
          {priorities.map((p) => (
            <motion.button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                priority === p
                  ? 'text-white shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={
                priority === p
                  ? { backgroundColor: PRIORITY_COLORS[p] }
                  : { color: PRIORITY_COLORS[p] }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={priority === p}
              aria-label={`Установить приоритет ${p === 'low' ? 'низкий' : p === 'medium' ? 'средний' : 'высокий'}`}
            >
              {p === 'low' ? 'Низкий' : p === 'medium' ? 'Средний' : 'Высокий'}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center px-2">
        <label htmlFor="due-date" className="text-sm font-medium" style={{ color: '#5A7367' }}>
          Срок:
        </label>
        <input
          id="due-date"
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          className="px-4 py-1.5 rounded-full text-sm bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-calm-deepGreen/20 focus:bg-white/70 transition-all duration-200"
          style={{ color: '#5A7367' }}
          aria-label="Установить срок выполнения"
        />
      </div>
    </motion.form>
  );
};
