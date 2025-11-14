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

  const hasError = touched && !!error;
  const canSubmit = text.trim() && !error;

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
            className={`w-full px-5 py-4 rounded-xl border transition-all duration-300 outline-none text-base font-normal bg-[color:var(--color-surface-strong)] focus:ring-4 focus:ring-[rgba(var(--color-accent-rgb),0.18)] focus:border-[rgba(var(--color-accent-rgb),0.55)] ${
              hasError
                ? 'border-[rgba(var(--color-danger-rgb),0.65)] focus:ring-[rgba(var(--color-danger-rgb),0.18)] focus:border-[rgba(var(--color-danger-rgb),0.65)]'
                : ''
            }`}
            style={{
              boxShadow: hasError
                ? '0 0 0 3px rgba(var(--color-danger-rgb), 0.18)'
                : 'var(--shadow-soft)',
              color: 'var(--color-text-primary)',
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
              style={{ color: 'var(--color-danger)' }}
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
            background: 'var(--color-accent)',
            boxShadow: '0 18px 40px -24px rgba(var(--color-accent-rgb), 0.6)',
            fontSize: '16px',
            minHeight: '56px',
            minWidth: '140px',
          }}
          whileHover={canSubmit ? {
            scale: 1.03,
            boxShadow: '0 22px 48px -26px rgba(var(--color-accent-rgb), 0.75)'
          } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          aria-label="Добавить задачу"
        >
          Добавить
        </motion.button>
      </div>

      <p
        id="task-input-helper"
        className="px-2 text-sm leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Введите краткое описание задачи (до 500 символов)
      </p>

      {/* Priority selection with better spacing and labels */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center px-2">
        <label
          className="text-base font-medium whitespace-nowrap"
          id="priority-label"
          style={{ color: 'var(--color-text-secondary)' }}
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
              className="px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 border"
              style={{
                background: priority === p ? PRIORITY_COLORS[p] : 'rgba(12, 20, 36, 0.55)',
                color: priority === p ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                borderColor: priority === p ? 'transparent' : 'var(--color-border)',
                minHeight: '48px',
                minWidth: '110px',
                boxShadow:
                  priority === p
                    ? '0 18px 40px -26px rgba(var(--color-accent-rgb), 0.45)'
                    : 'none',
              }}
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
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Срок выполнения:
        </label>
        <input
          id="due-date"
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          className="px-5 py-3 rounded-xl text-base border transition-all duration-200 outline-none bg-[color:var(--color-surface)] focus:ring-4 focus:ring-[rgba(var(--color-accent-rgb),0.18)] focus:border-[rgba(var(--color-accent-rgb),0.55)]"
          style={{
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-soft)',
            minHeight: '48px',
          }}
          aria-label="Установить срок выполнения"
        />
      </div>
    </motion.form>
  );
};
