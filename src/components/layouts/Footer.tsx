import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="text-center mt-8 space-y-4"
    >
      <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 inline-block">
        <p className="font-semibold mb-2 text-slate-700">Keyboard Shortcuts</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <span>
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700">Enter</kbd> Submit form
          </span>
          <span>
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700">Esc</kbd> Cancel/Close
          </span>
          <span>
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700">Ctrl</kbd> + 
            <kbd className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 ml-1">Enter</kbd> Quick submit
          </span>
        </div>
      </div>
      
      <div className="text-sm text-slate-500">
        <p>
          Built with React 18, TypeScript, Zustand, Framer Motion & Tailwind CSS
        </p>
        <p className="mt-1">
          © {currentYear} ToDo App. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};
