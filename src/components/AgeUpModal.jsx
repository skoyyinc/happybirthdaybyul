import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, PartyPopper, Cake } from 'lucide-react';

const AgeUpModal = ({ isOpen, onClose }) => {
  const [agreements, setAgreements] = useState({
    kisses: false,
    cute: false,
    adventures: false,
    laughs: false,
    love: false,
    god: false,
  });
  const [hasAgedUp, setHasAgedUp] = useState(false);

  const termsAndConditions = [
    { id: 'god', text: 'Aku akan lebih rajin solat dan mengaji' },
    { id: 'kisses', text: 'I agree to love myself, my family, my friends, and my boyfriend more' },
    { id: 'cute', text: 'I promise to stay this cute forever' },
    { id: 'adventures', text: 'Aku akan mulai tidak lupa atau telat memberi kabar' },
    { id: 'laughs', text: 'Aku akan mulai olahraga rutin dan teratur' },
    { id: 'love', text: 'I accept unlimited hugs and affection without complaint' },
    

  ];

  const allAgreed = Object.values(agreements).every(value => value === true);

  const handleCheckboxChange = (id) => {
    setAgreements(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleConfirm = () => {
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Confetti from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      // Confetti from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Show success message
    setHasAgedUp(true);
  };

  const handleClose = () => {
    setAgreements({
      kisses: false,
      cute: false,
      adventures: false,
      laughs: false,
      love: false,
      god: false,
    });
    setHasAgedUp(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-cream rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border-4 border-sunflower"
            onClick={(e) => e.stopPropagation()}
          >
            {!hasAgedUp ? (
              <>
                <div className="text-center mb-8">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                    className="inline-block"
                  >
                    <Cake className="w-20 h-20 text-sunflower mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-bold text-sunflower mb-2">
                    Age Up Agreement
                  </h2>
                  <p className="text-lg text-gray-600">
                    Please review and accept all terms before proceeding
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {termsAndConditions.map((term, index) => (
                    <motion.label
                      key={term.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        agreements[term.id]
                          ? 'bg-sunflower/30 border-2 border-sunflower'
                          : 'bg-white border-2 border-gray-200 hover:border-sunflower/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="checkbox"
                        checked={agreements[term.id]}
                        onChange={() => handleCheckboxChange(term.id)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-sunflower focus:ring-sunflower cursor-pointer"
                      />
                      <span className="text-lg flex-1">{term.text}</span>
                      {agreements[term.id] && (
                        <Heart className="w-6 h-6 text-soft-pink fill-soft-pink" />
                      )}
                    </motion.label>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="flex-1 py-4 px-6 bg-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-400 transition-colors"
                  >
                    Not Ready Yet
                  </motion.button>

                  <motion.button
                    whileHover={allAgreed ? { scale: 1.05 } : {}}
                    whileTap={allAgreed ? { scale: 0.95 } : {}}
                    animate={allAgreed ? {
                      boxShadow: [
                        "0 0 0 0 rgba(255, 215, 0, 0.7)",
                        "0 0 0 10px rgba(255, 215, 0, 0)",
                      ],
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    onClick={handleConfirm}
                    disabled={!allAgreed}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                      allAgreed
                        ? 'bg-sunflower text-gray-800 hover:bg-yellow-500 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <PartyPopper className="w-6 h-6" />
                    Confirm Age Up!
                  </motion.button>
                </div>

                {!allAgreed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-gray-500 mt-4"
                  >
                    You must accept all terms to proceed
                  </motion.p>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-block mb-6"
                >
                  <PartyPopper className="w-32 h-32 text-sunflower mx-auto" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-sunflower mb-6"
                >
                  Yayy! 🎉
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl text-gray-700 mb-8"
                >
                  You have officially aged up!
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-gray-600 mb-8"
                >
                  Now you can ask Poy for the next Gift 💝
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="py-4 px-8 bg-sunflower text-gray-800 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeUpModal;
