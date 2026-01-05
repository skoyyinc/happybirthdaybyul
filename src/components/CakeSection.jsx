import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const CakeSection = () => {
  const [litCandles, setLitCandles] = useState([true, true, true, true, true]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const scrollThreshold = 3000;

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

  const blowOutCandle = (index) => {
    const newCandles = [...litCandles];
    newCandles[index] = false;
    setLitCandles(newCandles);
  };

  const allCandlesOut = litCandles.every(candle => !candle);

  const floatingImages = [
    { src: '/happybirthdaybyul/images/deco-9.png', initialX: '10%', initialY: '18%', moveX: 220, moveY: -90, rotate: 75, scale: 1.1 },
    { src: '/happybirthdaybyul/images/deco-10.png', initialX: '88%', initialY: '22%', moveX: -200, moveY: 100, rotate: -80, scale: 1.3 },
    { src: '/happybirthdaybyul/images/deco-11.png', initialX: '15%', initialY: '68%', moveX: 180, moveY: -120, rotate: 60, scale: 1 },
    { src: '/happybirthdaybyul/images/deco-12.png', initialX: '85%', initialY: '72%', moveX: -160, moveY: -70, rotate: -100, scale: 1.2 },
    { src: '/happybirthdaybyul/images/deco-13.png', initialX: '50%', initialY: '10%', moveX: 100, moveY: 150, rotate: 120, scale: 1.1 },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sunflower/20 to-soft-pink/20 py-20 px-4 overflow-hidden">
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
        className="text-5xl md:text-7xl font-bold text-center mb-8 text-sunflower drop-shadow-lg relative z-10"
      >
        Make a Wish!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl text-center mb-12 text-gray-700 relative z-10"
      >
        Click the candles to blow them out!
      </motion.p>

      <div className="relative z-10">
        <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl">
          {/* Cake base - bottom layer */}
          <motion.ellipse
            cx="200"
            cy="280"
            rx="140"
            ry="30"
            fill="#E9967A"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />
          <motion.rect
            x="60"
            y="220"
            width="280"
            height="60"
            fill="#DEB887"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          />

          {/* Cake middle layer */}
          <motion.ellipse
            cx="200"
            cy="220"
            rx="140"
            ry="30"
            fill="#F4A460"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          />
          <motion.rect
            x="80"
            y="160"
            width="240"
            height="60"
            fill="#CD853F"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          />

          {/* Cake top layer */}
          <motion.ellipse
            cx="200"
            cy="160"
            rx="120"
            ry="25"
            fill="#FFB6C1"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          />

          {/* Decorative frosting */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.circle
              key={`frosting-${i}`}
              cx={80 + i * 40}
              cy="220"
              r="8"
              fill="#FF69B4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.05 }}
            />
          ))}

          {/* Candles */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 120 + i * 35;
            return (
              <g key={`candle-${i}`} onClick={() => blowOutCandle(i)} className="cursor-pointer">
                {/* Candle stick */}
                <motion.rect
                  x={x - 5}
                  y="130"
                  width="10"
                  height="30"
                  fill="#FF1493"
                  rx="2"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                />

                {/* Wick */}
                <motion.line
                  x1={x}
                  y1="130"
                  x2={x}
                  y2="120"
                  stroke="#8B4513"
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: litCandles[i] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Flame */}
                {litCandles[i] && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    exit={{
                      scale: [1, 2, 0],
                      opacity: [1, 0.5, 0],
                      y: [0, -20, -40]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ellipse
                      cx={x}
                      cy="112"
                      rx="6"
                      ry="10"
                      fill="#FFD700"
                    />
                    <ellipse
                      cx={x}
                      cy="112"
                      rx="4"
                      ry="7"
                      fill="#FFA500"
                    />
                  </motion.g>
                )}

                {/* Smoke puff when blown out */}
                {!litCandles[i] && (
                  <motion.circle
                    cx={x}
                    cy="110"
                    r="8"
                    fill="#D3D3D3"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{
                      scale: [0, 1.5, 2],
                      opacity: [0.8, 0.4, 0],
                      y: [0, -30, -50]
                    }}
                    transition={{ duration: 1 }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {allCandlesOut && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-8 text-center relative z-10"
        >
          <Sparkles className="w-16 h-16 text-sunflower mx-auto mb-4 animate-pulse" />
          <p className="text-3xl font-bold text-soft-pink">
            Your wish has been made! ✨
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CakeSection;
