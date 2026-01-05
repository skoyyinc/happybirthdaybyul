import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import PhotoSection from './components/PhotoSection';
import CakeSection from './components/CakeSection';
import LoveChartSection from './components/LoveChartSection';
import CouponSection from './components/CouponSection';
import AchievementsSection from './components/AchievementsSection';
import AgeUpModal from './components/AgeUpModal';
import FloatingElements from './components/FloatingElements';
import HeroImages from './components/HeroImages';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';
import MusicPlayer from './components/MusicPlayer';
import { useImagePreloader } from './hooks/useImagePreloader';
import { Cake, Heart } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, progress } = useImagePreloader();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.5,
      touchMultiplier: 1,
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Hero section confetti fireworks - plays indefinitely
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors: ['#FFD700', '#F472B6', '#FFFBEB', '#FFA500', '#FF69B4']
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const particleCount = 30;

      // Firework from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      // Firework from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });

      // Firework from center
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} progress={progress} />

      <div className="relative min-h-screen bg-gradient-to-b from-cream via-sunflower/10 to-soft-pink/10">
        {/* Floating background elements */}
        <FloatingElements />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
          {/* Large background number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            <span className="text-[40rem] md:text-[50rem] lg:text-[60rem] font-bold text-sunflower select-none">
              28
            </span>
          </motion.div>

          {/* Sporadic background images with scroll effect */}
          <HeroImages />

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mb-8"
          >
            
            <img src="/happybirthdaybyul/images/birthday-cake.png" alt="Cake" className="w-32 h-32" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-center mb-6 text-sunflower drop-shadow-lg"
          >
            Happy Birthday!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-4xl text-center text-gray-700 mb-8 max-w-3xl"
          >
            To my favorite person in the world, mi amor, my cherry blossom, my byul!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="flex gap-4 items-center"
          >
            <Heart className="w-12 h-12 text-soft-pink fill-soft-pink animate-pulse" />
            <Heart className="w-16 h-16 text-soft-pink fill-soft-pink animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Heart className="w-12 h-12 text-soft-pink fill-soft-pink animate-pulse" style={{ animationDelay: '0.6s' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </section>

        {/* Photo Section */}
        <PhotoSection />

        {/* Love Chart Section */}
        <LoveChartSection />

        {/* Coupon Section */}
        <CouponSection />

        {/* Achievements Section */}
        <AchievementsSection />

        {/* Cake Section */}
        <CakeSection />

        {/* Age Up Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-soft-pink/20 to-cream">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-center mb-8 text-sunflower drop-shadow-lg"
          >
            One More Thing...
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-center mb-12 text-gray-700 max-w-2xl"
          >
            Before we celebrate another amazing year, there's a small formality we need to take care of...
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: 0.4 },
              scale: { delay: 0.4, type: 'spring', stiffness: 200 },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            onClick={() => setIsModalOpen(true)}
            className="bg-sunflower text-gray-800 px-12 py-6 rounded-full text-2xl md:text-3xl font-bold shadow-2xl hover:bg-yellow-500 transition-colors flex items-center gap-4"
          >
            <Cake className="w-10 h-10" />
            Ready to Age Up?
          </motion.button>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center bg-sunflower/20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Made by Poy | 06.01.2025
          </motion.p>
        </footer>
      </div>

      {/* Age Up Modal */}
      <AgeUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Music Player */}
      <MusicPlayer />
    </div>
    </>
  );
}

export default App;
