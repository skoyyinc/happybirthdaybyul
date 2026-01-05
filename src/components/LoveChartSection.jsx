import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LoveChartSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const scrollThreshold = 3000; // Scroll delta needed for full animation

  useEffect(() => {
    let accumulatedDelta = scrollProgress * scrollThreshold;
    let isLocked = false;

    const handleWheel = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      // Check if section is entering viewport from top
      const isEntering = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.8;

      if (isEntering && !isLocked) {
        isLocked = true;
      }

      // Keep scroll locked until animation completes
      if (isLocked) {
        if (accumulatedDelta < scrollThreshold) {
          e.preventDefault();
          e.stopPropagation();

          accumulatedDelta += e.deltaY;
          accumulatedDelta = Math.max(0, Math.min(accumulatedDelta, scrollThreshold));

          const progress = accumulatedDelta / scrollThreshold;
          setScrollProgress(progress);

          // Unlock when animation is complete
          if (progress >= 1 && e.deltaY > 0) {
            isLocked = false;
          }
        } else if (e.deltaY < 0) {
          // Allow scrolling back up
          e.preventDefault();
          e.stopPropagation();

          accumulatedDelta += e.deltaY;
          accumulatedDelta = Math.max(0, Math.min(accumulatedDelta, scrollThreshold));

          const progress = accumulatedDelta / scrollThreshold;
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollProgress]);

  const floatingImages = [
    { src: '/happybirthdaybyul/images/deco-5.png', initialX: '8%', initialY: '15%', moveX: 200, moveY: -100, rotate: 90, scale: 1.2 },
    { src: '/happybirthdaybyul/images/deco-6.png', initialX: '85%', initialY: '20%', moveX: -180, moveY: 120, rotate: -60, scale: 1 },
    { src: '/happybirthdaybyul/images/deco-7.png', initialX: '12%', initialY: '70%', moveX: 150, moveY: -150, rotate: 45, scale: 1.3 },
    { src: '/happybirthdaybyul/images/deco-8.png', initialX: '90%', initialY: '75%', moveX: -200, moveY: -80, rotate: -120, scale: 1.1 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-sunflower/20 to-soft-pink/20 overflow-hidden">
      {/* Parallax decorative images */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: img.initialX, top: img.initialY }}
            animate={{
              x: scrollProgress * img.moveX,
              y: scrollProgress * img.moveY,
              rotate: scrollProgress * img.rotate,
            }}
            initial={{ scale: img.scale, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <img
              src={img.src}
              alt=""
              className="w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
              onError={(e) => e.target.style.display = 'none'}
            />
          </motion.div>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold text-center mb-12 text-sunflower drop-shadow-lg relative z-10"
      >
        Interesting statistics...
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl w-full relative z-10"
      >
        <img
          src="/happybirthdaybyul/images/love_chart.png"
          alt="Love Chart"
          className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white"
        />
      </motion.div>
    </section>
  );
};

export default LoveChartSection;
