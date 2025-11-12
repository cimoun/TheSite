import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task, TaskFormData, Priority } from '../types/task.js';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        priority: initialData.priority,
        dueDate: initialData.dueDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: undefined,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (
    field: keyof TaskFormData,
    value: string | Priority | Date | undefined
  ) => {
    setFormData((prev: TaskFormData) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev: Partial<Record<keyof TaskFormData, string>>) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', color: '#1f2937' }}>
              {initialData ? 'Edit Task' : 'Create New Task'}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="title"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                  }}
                >
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter task title..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: `1px solid ${errors.title ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (!errors.title) {
                      e.target.style.borderColor = '#3b82f6';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.title) {
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                />
                {errors.title && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '12px',
                      color: '#ef4444',
                    }}
                  >
                    {errors.title}
                  </motion.p>
                )}
              </div>

              {/* Description Input */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="description"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                  }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Enter task description (optional)..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: `1px solid ${errors.description ? '#ef4444' : '#d1d5db'}`,
                    borderRadius: '8px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (!errors.description) {
                      e.target.style.borderColor = '#3b82f6';
                    }
                  }}
                  onBlur={(e) => {
                    if (!errors.description) {
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                />
                {errors.description && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '12px',
                      color: '#ef4444',
                    }}
                  >
                    {errors.description}
                  </motion.p>
                )}
              </div>

              {/* Priority Select */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="priority"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                  }}
                >
                  Priority
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value as Priority)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  <option value="high">🔴 High Priority</option>
                  <option value="medium">🟡 Medium Priority</option>
                  <option value="low">🔵 Low Priority</option>
                </select>
              </div>

              {/* Due Date Picker */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="dueDate"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#374151',
                  }}
                >
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={
                    formData.dueDate
                      ? new Date(formData.dueDate).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined;
                    handleChange('dueDate', date);
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 500,
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 500,
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {initialData ? 'Update Task' : 'Create Task'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
