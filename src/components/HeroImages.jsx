import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const HeroImages = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef(null);
  const scrollThreshold = 10000; // Total scroll delta needed to unlock

  useEffect(() => {
    let accumulatedDelta = 0;

    const handleWheel = (e) => {
      if (isUnlocked) return;

      // Check if we're in the hero section
      const scrollTop = window.scrollY || window.pageYOffset;
      if (scrollTop > 100) {
        setIsUnlocked(true);
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Add delta with direction - scroll down increases, scroll up decreases
      accumulatedDelta += e.deltaY;
      // Clamp between 0 and scrollThreshold
      accumulatedDelta = Math.max(0, Math.min(accumulatedDelta, scrollThreshold));

      const progress = accumulatedDelta / scrollThreshold;
      setScrollProgress(progress);

      if (progress >= 1) {
        setIsUnlocked(true);
      }
    };

    const container = containerRef.current;
    if (container && !isUnlocked) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isUnlocked]);

  // Image positions - sporadic placement
  const images = [
    {
      src: '/surprise/images/deco-1.png',
      initialX: '10%',
      initialY: '15%',
      moveX: 300,
      moveY: -150,
      rotate: 45,
      scale: 1
    },
    {
      src: '/surprise/images/deco-2.png',
      initialX: '80%',
      initialY: '20%',
      moveX: -300,
      moveY: 200,
      rotate: -60,
      scale: 1.2
    },
    {
      src: '/surprise/images/deco-3.png',
      initialX: '15%',
      initialY: '70%',
      moveX: 200,
      moveY: -250,
      rotate: -30,
      scale: 1.1
    },
    {
      src: '/surprise/images/deco-4.png',
      initialX: '70%',
      initialY: '40%',
      moveX: -1600,
      moveY: 0,
      rotate: 720,
      scale: 1.5
    },
    
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: image.initialX,
            top: image.initialY,
          }}
          animate={{
            x: scrollProgress * image.moveX,
            y: scrollProgress * image.moveY,
            rotate: scrollProgress * image.rotate,
          }}
          initial={{
            scale: image.scale,
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut'
          }}
        >
          <img
            src={image.src}
            alt=""
            className="w-64 h-64 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] object-contain drop-shadow-2xl"
            onError={(e) => {
              // Hide image if it doesn't exist yet
              e.target.style.display = 'none';
            }}
          />
        </motion.div>
      ))}

      {!isUnlocked && scrollProgress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full">
            Keep scrolling... ({Math.round(scrollProgress * 100)}%)
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HeroImages;
