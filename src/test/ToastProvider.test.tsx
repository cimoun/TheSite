import React, { useEffect } from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { ToastProvider } from '../components/Toast';
import { useToast } from '../hooks/useToast';

const TestToastTrigger: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast('Test toast', 'info', 5000);
  }, [showToast]);

  return null;
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('cleans up timers on unmount to avoid warnings', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { unmount } = render(
        <ToastProvider>
          <TestToastTrigger />
        </ToastProvider>,
      );

      await act(async () => {
        await Promise.resolve();
      });

      expect(screen.getByText('Test toast')).toBeInTheDocument();

      unmount();

      vi.runAllTimers();

      expect(consoleError).not.toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
    }
  });
});
