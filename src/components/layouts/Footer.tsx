import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.4,
      },
    },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mt-10 space-y-4"
    >
      <div
        className="text-xs rounded-2xl p-4 inline-block backdrop-blur-2xl border"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <p
          className="font-medium mb-2 uppercase tracking-[0.25em]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Горячие клавиши
        </p>
        <div
          className="flex gap-4 flex-wrap justify-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <span>
            <kbd
              className="px-2 py-1 rounded border"
              style={{
                background: 'rgba(18, 24, 38, 0.75)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Enter
            </kbd>{' '}
            Добавить
          </span>
          <span>
            <kbd
              className="px-2 py-1 rounded border"
              style={{
                background: 'rgba(18, 24, 38, 0.75)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Esc
            </kbd>{' '}
            Очистить
          </span>
        </div>
      </div>

      <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <p>
          © {currentYear}
        </p>
      </div>
    </motion.footer>
  );
};
