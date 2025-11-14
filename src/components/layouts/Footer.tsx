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
      <div className="text-xs rounded-2xl p-4 inline-block bg-white/45 backdrop-blur-sm border border-white/30">
        <p
          className="font-medium mb-2 uppercase tracking-[0.25em]"
          style={{ color: '#5A7367' }}
        >
          Горячие клавиши
        </p>
        <div className="flex gap-4 flex-wrap justify-center" style={{ color: '#8B956D' }}>
          <span>
            <kbd className="px-2 py-1 bg-white/60 border border-white/40 rounded" style={{ color: '#5A7367' }}>Enter</kbd> Добавить
          </span>
          <span>
            <kbd className="px-2 py-1 bg-white/60 border border-white/40 rounded" style={{ color: '#5A7367' }}>Esc</kbd> Очистить
          </span>
        </div>
      </div>
      
      <div className="text-sm" style={{ color: '#8B956D' }}>
        <p>
          © {currentYear}
        </p>
      </div>
    </motion.footer>
  );
};
