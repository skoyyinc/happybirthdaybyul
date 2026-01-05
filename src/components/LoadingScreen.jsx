import { motion, AnimatePresence } from 'framer-motion';
import { Cake } from 'lucide-react';

const LoadingScreen = ({ progress, isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-cream flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Cake className="w-32 h-32 text-sunflower drop-shadow-2xl mb-8" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-sunflower mb-8"
          >
            Preparing Your Surprise...
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-80 max-w-[80vw] h-3 bg-white/30 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-sunflower rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="text-lg text-gray-600">
            {Math.round(progress)}% loaded
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
