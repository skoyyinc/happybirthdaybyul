import { motion } from 'framer-motion';
import { Trophy, Star, Heart, Sparkles, Award, Crown } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      icon: Heart,
      title: 'Got a boyfriend',
      description: 'The best one',
      image: '/happybirthdaybyul/images/achievement-1.JPG',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 2,
      icon: Trophy,
      title: 'Become a Masters Degree Graduate',
      description: 'With Merit',
      image: '/happybirthdaybyul/images/achievement-2.JPG',
      color: 'from-pink-400 to-rose-400',
    },
    {
      id: 3,
      icon: Star,
      title: 'Reached the summit of Ben Nevis on winter',
      description: 'Tallest mountain in the UK',
      image: '/happybirthdaybyul/images/achievement-3.jpg',
      color: 'from-purple-400 to-pink-400',
    },
    {
      id: 4,
      icon: Sparkles,
      title: 'Played for the Arsenal FC Womens Team',
      description: 'and almost scored a goal',
      image: '/happybirthdaybyul/images/achievement-4.jpg',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      id: 5,
      icon: Award,
      title: 'Scored a 200kg Tuna',
      description: 'For dinner',
      image: '/happybirthdaybyul/images/achievement-5.jpg',
      color: 'from-green-400 to-emerald-400',
    },
    {
      id: 6,
      icon: Crown,
      title: 'Nobel Prize Winner',
      description: 'The worlds best friend and girlfriend',
      image: '/happybirthdaybyul/images/achievement-6.jpg',
      color: 'from-sunflower to-amber-400',
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-cream to-sunflower/20">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold text-center mb-4 text-sunflower drop-shadow-lg"
      >
        Your Achievements in 2025🏆
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl text-center mb-16 text-gray-700 max-w-2xl"
      >
        All the amazing things that make you special
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-sunflower"
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden bg-gray-200">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient background if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gradient-to-br', ...achievement.color.split(' '));
                  }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Badge icon overlay */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  className="absolute top-4 right-4"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg border-4 border-white`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {achievement.description}
                </p>
              </div>

              {/* Decorative corner ribbon */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-[60px] border-t-sunflower border-r-[60px] border-r-transparent" />

              {/* Achievement unlocked banner */}
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 100 }}
                className="absolute bottom-6 left-6 bg-sunflower text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
              >
                ✓ UNLOCKED
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-2xl md:text-3xl font-bold text-soft-pink">
          And so many more achievements to unlock together! 💝
        </p>
      </motion.div>
    </section>
  );
};

export default AchievementsSection;
