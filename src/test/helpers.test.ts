import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate, getTaskStats, pluralizeTasks, validateTaskText } from '../utils/helpers';

describe('formatDate', () => {
  beforeEach(() => {
    // Mock the current date to 2024-01-01 12:00:00
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "Только что" for dates less than 1 minute ago', () => {
    const date = new Date('2024-01-01T11:59:30Z').toISOString();
    expect(formatDate(date)).toBe('Только что');
  });

  it('should return minutes ago for dates less than 60 minutes ago', () => {
    const date = new Date('2024-01-01T11:30:00Z').toISOString();
    expect(formatDate(date)).toBe('30 мин назад');
  });

  it('should return hours ago for dates less than 24 hours ago', () => {
    const date = new Date('2024-01-01T08:00:00Z').toISOString();
    expect(formatDate(date)).toBe('4 ч назад');
  });

  it('should return days ago for dates less than 7 days ago', () => {
    const date = new Date('2023-12-29T12:00:00Z').toISOString();
    expect(formatDate(date)).toBe('3 дн назад');
  });

  it('should return localized date for dates 7+ days ago', () => {
    const date = new Date('2023-12-20T12:00:00Z').toISOString();
    const dateObj = new Date(date);
    expect(formatDate(date)).toBe(dateObj.toLocaleDateString('ru-RU'));
  });

  it('should handle Date objects as well as strings', () => {
    const date = new Date('2024-01-01T11:30:00Z');
    expect(formatDate(date)).toBe('30 мин назад');
  });
});

describe('getTaskStats', () => {
  it('should return correct stats for empty array', () => {
    const stats = getTaskStats([]);
    expect(stats).toEqual({
      total: 0,
      completed: 0,
      active: 0,
      completionRate: 0,
    });
  });

  it('should return correct stats for all completed tasks', () => {
    const tasks = [
      { completed: true },
      { completed: true },
      { completed: true },
    ];
    const stats = getTaskStats(tasks);
    expect(stats).toEqual({
      total: 3,
      completed: 3,
      active: 0,
      completionRate: 100,
    });
  });

  it('should return correct stats for all active tasks', () => {
    const tasks = [
      { completed: false },
      { completed: false },
    ];
    const stats = getTaskStats(tasks);
    expect(stats).toEqual({
      total: 2,
      completed: 0,
      active: 2,
      completionRate: 0,
    });
  });

  it('should return correct stats for mixed tasks', () => {
    const tasks = [
      { completed: true },
      { completed: false },
      { completed: true },
      { completed: false },
    ];
    const stats = getTaskStats(tasks);
    expect(stats).toEqual({
      total: 4,
      completed: 2,
      active: 2,
      completionRate: 50,
    });
  });

  it('should round completion rate correctly', () => {
    const tasks = [
      { completed: true },
      { completed: false },
      { completed: false },
    ];
    const stats = getTaskStats(tasks);
    expect(stats.completionRate).toBe(33); // 33.33... rounded to 33
  });
});

describe('pluralizeTasks', () => {
  it('should return singular form for 1 task', () => {
    expect(pluralizeTasks(1)).toBe('1 задача');
  });

  it('should return plural form for 0 tasks', () => {
    expect(pluralizeTasks(0)).toBe('0 задач');
  });

  it('should return plural form for 2 tasks', () => {
    expect(pluralizeTasks(2)).toBe('2 задачи');
  });

  it('should return plural form for many tasks', () => {
    expect(pluralizeTasks(100)).toBe('100 задач');
  });
});

describe('validateTaskText', () => {
  it('should return valid for non-empty text', () => {
    const result = validateTaskText('Valid task');
    expect(result).toEqual({ valid: true });
  });

  it('should return invalid for empty text', () => {
    const result = validateTaskText('');
    expect(result).toEqual({ 
      valid: false, 
      error: 'Задача не может быть пустой' 
    });
  });

  it('should return invalid for whitespace-only text', () => {
    const result = validateTaskText('   ');
    expect(result).toEqual({ 
      valid: false, 
      error: 'Задача не может быть пустой' 
    });
  });

  it('should return invalid for text over 500 characters', () => {
    const longText = 'a'.repeat(501);
    const result = validateTaskText(longText);
    expect(result).toEqual({ 
      valid: false, 
      error: 'Задача слишком длинная (макс. 500 символов)' 
    });
  });

  it('should return valid for text at exactly 500 characters', () => {
    const exactText = 'a'.repeat(500);
    const result = validateTaskText(exactText);
    expect(result).toEqual({ valid: true });
  });
});
