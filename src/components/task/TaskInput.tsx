import { useState } from 'react';
import { useTaskStore } from '../../stores/taskStore';
import { validateTaskText } from '../../utils/helpers';
import { Priority, PRIORITY_COLORS } from '../../types/task';
import { motion } from 'framer-motion';
import { useToast } from '../../hooks/useToast';

export const TaskInput: React.FC = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTaskText(text);
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid task');
      setTouched(true);
      showToast(validation.error ?? 'Invalid task', 'error');
      return;
    }

    addTask(text, priority, dueDate || undefined);
    setText('');
    setPriority('medium');
    setDueDate('');
    setError('');
    setTouched(false);
    showToast('Задача успешно добавлена', 'success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setTouched(true);
    
    // Inline validation
    if (e.target.value.trim()) {
      const validation = validateTaskText(e.target.value);
      if (!validation.valid) {
        setError(validation.error ?? '');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
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

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 w-full"
      variants={popInVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main input section with improved spacing */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Что нужно сделать?"
            maxLength={500}
            className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 outline-none text-base font-normal ${
              touched && error
                ? 'border-accent-terracotta bg-white/70 focus:ring-4 focus:ring-accent-terracotta/20'
                : 'border-transparent bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-secondary-deepGreen/30 focus:ring-4 focus:ring-secondary-deepGreen/10'
            }`}
            style={{
              boxShadow: touched && error 
                ? '0 2px 8px rgba(212, 114, 111, 0.12)'
                : '0 2px 8px rgba(90, 115, 103, 0.08)',
              color: '#2D3A35',
              fontSize: '16px',
              lineHeight: '1.5',
              minHeight: '56px',
            }}
            aria-label="Новая задача"
            aria-describedby="task-input-helper task-input-error"
            aria-invalid={touched && !!error}
          />
          {/* Inline error message */}
          {touched && error && (
            <motion.p
              id="task-input-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 px-2 text-sm font-medium"
              style={{ color: '#D4726F' }}
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </div>
        <motion.button
          type="submit"
          disabled={!text.trim() || !!error}
          className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: '#5A7367',
            boxShadow: '0 4px 12px rgba(90, 115, 103, 0.25)',
            fontSize: '16px',
            minHeight: '56px',
            minWidth: '140px',
          }}
          whileHover={text.trim() && !error ? { 
            scale: 1.03, 
            boxShadow: '0 6px 16px rgba(90, 115, 103, 0.35)' 
          } : {}}
          whileTap={text.trim() && !error ? { scale: 0.98 } : {}}
          aria-label="Добавить задачу"
        >
          Добавить
        </motion.button>
      </div>

      <p
        id="task-input-helper"
        className="px-2 text-sm leading-relaxed"
        style={{ color: '#6B7280' }}
      >
        Введите краткое описание задачи (до 500 символов)
      </p>
      
      {/* Priority selection with better spacing and labels */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center px-2">
        <label 
          className="text-base font-medium whitespace-nowrap" 
          id="priority-label"
          style={{ color: '#2D3A35' }}
        >
          Приоритет:
        </label>
        <div 
          role="group" 
          aria-labelledby="priority-label" 
          className="flex flex-wrap gap-3"
        >
          {priorities.map((p) => (
            <motion.button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                priority === p
                  ? 'text-white shadow-md'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              style={
                priority === p
                  ? { 
                      backgroundColor: PRIORITY_COLORS[p],
                      minHeight: '48px',
                      minWidth: '110px',
                    }
                  : { 
                      color: PRIORITY_COLORS[p],
                      minHeight: '48px',
                      minWidth: '110px',
                    }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={priority === p}
              aria-label={`Установить приоритет ${priorityLabels[p]}`}
            >
              {priorityLabels[p]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Due date with improved styling */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center px-2">
        <label 
          htmlFor="due-date" 
          className="text-base font-medium whitespace-nowrap"
          style={{ color: '#2D3A35' }}
        >
          Срок выполнения:
        </label>
        <input
          id="due-date"
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          className="px-5 py-3 rounded-xl text-base bg-white/50 border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-secondary-deepGreen/20 focus:bg-white/70 focus:border-secondary-deepGreen/30 transition-all duration-200"
          style={{ 
            color: '#2D3A35',
            minHeight: '48px',
          }}
          aria-label="Установить срок выполнения"
        />
      </div>
    </motion.form>
  );
};
