import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    // Hearts
    { Icon: Heart, x: '10%', delay: 0, duration: 8, size: 24, color: '#F472B6', initialY: '100%' },
    { Icon: Heart, x: '30%', delay: 2, duration: 10, size: 32, color: '#FFD700', initialY: '100%' },
    { Icon: Heart, x: '60%', delay: 1, duration: 9, size: 28, color: '#F472B6', initialY: '100%' },
    { Icon: Heart, x: '85%', delay: 3, duration: 11, size: 20, color: '#FFD700', initialY: '100%' },
    // Stars
    { Icon: Star, x: '20%', delay: 1.5, duration: 12, size: 20, color: '#FFD700', initialY: '100%' },
    { Icon: Star, x: '45%', delay: 0.5, duration: 10, size: 24, color: '#F472B6', initialY: '100%' },
    { Icon: Star, x: '75%', delay: 2.5, duration: 9, size: 28, color: '#FFD700', initialY: '100%' },
    { Icon: Star, x: '90%', delay: 1, duration: 11, size: 22, color: '#F472B6', initialY: '100%' },
    // Sparkles
    { Icon: Sparkles, x: '15%', delay: 3, duration: 8, size: 26, color: '#FFD700', initialY: '100%' },
    { Icon: Sparkles, x: '55%', delay: 0, duration: 10, size: 30, color: '#F472B6', initialY: '100%' },
    { Icon: Sparkles, x: '70%', delay: 2, duration: 12, size: 24, color: '#FFD700', initialY: '100%' },
    { Icon: Sparkles, x: '95%', delay: 1.5, duration: 9, size: 20, color: '#F472B6', initialY: '100%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => {
        const { Icon, x, delay, duration, size, color, initialY } = element;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: x }}
            initial={{ y: initialY, opacity: 0, rotate: 0 }}
            animate={{
              y: '-120%',
              opacity: [0, 1, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
              opacity: {
                times: [0, 0.1, 0.9, 1],
              }
            }}
          >
            <Icon
              size={size}
              color={color}
              fill={color}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingElements;
