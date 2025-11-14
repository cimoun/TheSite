import { useEffect, useRef } from 'react';
import { useUIStore } from '../../stores/uiStore';

const CHARSET = ' .:-=+*#%@';

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const sampleIntensity = (x: number, y: number, t: number, amplitude: number) => {
  const nx = x * 0.18;
  const ny = y * 0.18;
  const wave1 = Math.sin(nx + t * 0.8);
  const wave2 = Math.sin(ny * 1.3 - t * 0.7);
  const wave3 = Math.sin((nx + ny) * 0.6 + t * 1.4);
  const radial = Math.sin(Math.sqrt(nx * nx + ny * ny) * 0.9 - t * 0.5);

  const combined = (wave1 + wave2 + wave3 + radial) / 4;
  const intensity = (combined * amplitude + 1) / 2;

  return clamp(intensity, 0, 1);
};

const getCharForIntensity = (intensity: number) => {
  const clamped = clamp(intensity, 0, 1);
  const index = Math.round(clamped * (CHARSET.length - 1));
  return CHARSET.charAt(index);
};

const createGradientFill = (ctx: CanvasRenderingContext2D, width: number, height: number, theme: 'light' | 'dark') => {
  const gradient = ctx.createLinearGradient(0, 0, width, height);

  if (theme === 'dark') {
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
    gradient.addColorStop(1, 'rgba(30, 41, 59, 0.9)');
  } else {
    gradient.addColorStop(0, 'rgba(248, 250, 252, 0.94)');
    gradient.addColorStop(1, 'rgba(226, 232, 240, 0.9)');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

export const CodexBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceAnimations = useUIStore((state) => state.reduceAnimations);
  const disableBackground = useUIStore((state) => state.disableBackground);
  const backgroundStyle = useUIStore((state) => state.backgroundStyle);
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    if (disableBackground) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    let animationFrameId: number | null = null;
    const ratio = window.devicePixelRatio || 1;

    const cellSize = reduceAnimations ? 20 : 16;
    const animationSpeed = reduceAnimations ? 0.28 : 0.45;
    const amplitude = reduceAnimations ? 0.6 : 1;

    const updateCanvasSize = () => {
      const { innerWidth, innerHeight } = window;

      canvas.width = innerWidth * ratio;
      canvas.height = innerHeight * ratio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.textBaseline = 'middle';
      context.textAlign = 'center';
      context.font = `${cellSize * 0.85}px 'Fira Code', 'IBM Plex Mono', 'SFMono-Regular', monospace`;
    };

    updateCanvasSize();

    const clearCanvas = () => {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
    };

    const drawStaticBackground = () => {
      const width = canvas.width / ratio;
      const height = canvas.height / ratio;

      clearCanvas();

      if (backgroundStyle === 'gradient') {
        createGradientFill(context, width, height, theme);
      } else {
        const fillColor = theme === 'dark' ? 'rgba(15, 23, 42, 0.96)' : 'rgba(248, 250, 252, 0.96)';
        context.fillStyle = fillColor;
        context.fillRect(0, 0, width, height);
      }
    };

    const render = (time: number) => {
      const width = canvas.width / ratio;
      const height = canvas.height / ratio;

      clearCanvas();

      if (backgroundStyle !== 'dynamic') {
        drawStaticBackground();
        return;
      }

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const seconds = (time / 1000) * animationSpeed;

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
          const intensity = sampleIntensity(col, row, seconds, amplitude);
          const character = getCharForIntensity(intensity);

          const baseColor = theme === 'dark' ? '240, 249, 255' : '30, 41, 59';
          const opacity = 0.25 + intensity * 0.65;

          context.fillStyle = `rgba(${baseColor}, ${opacity.toFixed(3)})`;
          context.fillText(character, x, y);
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    if (backgroundStyle === 'dynamic') {
      animationFrameId = window.requestAnimationFrame(render);
    } else {
      drawStaticBackground();
    }

    const handleResize = () => {
      updateCanvasSize();

      if (backgroundStyle === 'dynamic') {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = window.requestAnimationFrame(render);
      } else {
        drawStaticBackground();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [disableBackground, reduceAnimations, backgroundStyle, theme]);

  if (disableBackground) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
