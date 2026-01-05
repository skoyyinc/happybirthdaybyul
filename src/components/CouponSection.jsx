import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Gift, Heart, Star } from 'lucide-react';

const CouponSection = () => {
  const [claimedCoupons, setClaimedCoupons] = useState([false, false, false]);

  const coupons = [
    {
      id: 0,
      icon: Heart,
      title: 'Makan Umaku',
      description: 'Redeemable anytime (tapi jangan mendadak)',
      color: 'from-soft-pink to-pink-400',
      borderColor: 'border-soft-pink',
    },
    {
      id: 1,
      icon: Gift,
      title: 'Dress me up ',
      description: 'However you want',
      color: 'from-sunflower to-yellow-400',
      borderColor: 'border-sunflower',
    },
    {
      id: 2,
      icon: Star,
      title: 'Movie Night',
      description: 'Your choice of movie + snacks included',
      color: 'from-purple-400 to-pink-400',
      borderColor: 'border-purple-400',
    },
  ];

  const handleClaim = (index) => {
    const newClaimed = [...claimedCoupons];
    newClaimed[index] = true;
    setClaimedCoupons(newClaimed);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-soft-pink/20 to-cream">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold text-center mb-4 text-sunflower drop-shadow-lg"
      >
        Special Coupons! 🎁
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl text-center mb-16 text-gray-700"
      >
        Click to claim your special birthday coupons
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {coupons.map((coupon, index) => {
          const Icon = coupon.icon;
          const isClaimed = claimedCoupons[index];

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                className={`relative bg-white rounded-2xl p-8 shadow-2xl border-4 ${coupon.borderColor} overflow-hidden`}
                whileHover={!isClaimed ? { scale: 1.05, rotate: 2 } : {}}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Decorative corner cuts */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-cream rounded-br-full" />
                <div className="absolute top-0 right-0 w-8 h-8 bg-cream rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-cream rounded-tr-full" />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-cream rounded-tl-full" />

                {/* Claimed overlay */}
                <AnimatePresence>
                  {isClaimed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-10"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="bg-sunflower text-gray-800 px-6 py-3 rounded-full font-bold text-2xl shadow-2xl border-4 border-white"
                      >
                        CLAIMED! ✓
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${coupon.color} flex items-center justify-center`}
                  animate={!isClaimed ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-3 text-gray-800">
                  {coupon.title}
                </h3>

                {/* Description */}
                <p className="text-center text-gray-600 mb-6 min-h-[3rem]">
                  {coupon.description}
                </p>

                {/* Claim Button */}
                {!isClaimed ? (
                  <motion.button
                    onClick={() => handleClaim(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-lg bg-gradient-to-r ${coupon.color} text-white shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    Claim Now!
                  </motion.button>
                ) : (
                  <div className="w-full py-3 px-6 rounded-xl font-bold text-lg bg-gray-300 text-gray-500 text-center">
                    Claimed ✓
                  </div>
                )}

                {/* Dotted border effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full">
                    <rect
                      x="8"
                      y="8"
                      width="calc(100% - 16px)"
                      height="calc(100% - 16px)"
                      rx="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="10 10"
                      className="text-gray-300"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Confetti burst on claim */}
              <AnimatePresence>
                {isClaimed && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 1,
                        }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 8) * 100,
                          y: Math.sin((i * Math.PI * 2) / 8) * 100,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: 'easeOut',
                        }}
                        className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: i % 2 === 0 ? '#FFD700' : '#F472B6',
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* All claimed message */}
      <AnimatePresence>
        {claimedCoupons.every((c) => c) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="mt-12 text-center"
          >
            <p className="text-3xl md:text-4xl font-bold text-soft-pink">
              All coupons claimed! Time to redeem them! 💝
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CouponSection;
