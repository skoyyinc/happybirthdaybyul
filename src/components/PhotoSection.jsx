import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import imageManifest from '../imageManifest.json';

const PhotoSection = () => {
  const containerRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Configuration: Just add month name, folder name, and text
  const monthsConfig = [
    { month: 'February', folder: 'feb', text: 'It all starts with the first picture of you in your white puffer jacket looking so cute and shy xixixi. Finally tried Satu-Satu!. We went to the Barras market and adopted Kimchi!' },
    { month: 'March', folder: 'mar', text: 'Not too many pictures because of puasa hehe. But we celebrated Eid with the Glasgow Fam and took lovely pictures in the park under the sun. You also cooked for me for the first time (udang jimbaran) and I loved it!' },
    { month: 'April', folder: 'apr', text: 'Multiple park dates. We also went on our first trip together to the lakes! I mean I know Lake District is beautiful but it was so special to see it with you. We found the perfect bench under your favorite flower, the cherry blossom tree, overlooking the lake.' },
    { month: 'May', folder: 'may', text: 'We went to the magnificent Isle of Arran. We drove down to London with Mas Mirza, Ka prista, and Cenna!. We then continued south to Brighton and the Seven Sisters. It was a long trip but so much fun! Look how happy you look!' },
    { month: 'June', folder: 'jun', text: 'Not too many pictures again karena agak sibuk? But we had many library dates!' },
    { month: 'July', folder: 'jul', text: 'We went on a trip again to St. Andrews. Pantai nya cantik sekalii tapi kamu lebih cantik, apalagi waktu ngejar sendal kamu yang kebawa arus. You also went to Europe (without me). I still gave you flowers and a piece of cake though!' },
    { month: 'August', folder: 'aug', text: 'A lot happened in August. Ini bulannya Spiderman, we went on a date in New York City! You grabbed the moon (and my heart). We had a Pre-graduation photoshoot and went to Edinburgh and Oban with the Gang. 17an sambil nonton Arsenal mengalahkan Munyuk. Kita pertama kali ke Liverpool bersama. Ditutup dengan group dinner with your friends (yang sekarang teman teman ku juga)' },
    { month: 'September', folder: 'sept', text: 'Bulan ini juga cukup sibuk. From Declans Birthday, to bowling night. We found our favorite cheap cheeseburger place. Kamu juga jadi pembicara di Ospek anak-anak baru (so cool). You had a mini-photoshoot in the library with kak Dea (you look so smart and cute). We then went to London to see keluarga bapak Mirza. Kita jalan-jalan di London terus kamu hampir ketabrak sepeda. We also had a dreamy date in the most romantic park in London (according to me) and had a farewell dinner with Masyud and Tracy!' },
    { month: 'October', folder: 'oct', text: 'Sepertinya ini salah satu bulan favorit aku. We went on a trip to Chester, where you met Janya the Elephant. Kita juga menemukan tempat main mini golf seru nan misterius terus kamu bisa bisanya ngalahin aku?! We had our first "Fancy" date in a French cafe in Liverpool. Romantis abiiiez. Aku juga menemani kamu Ceilidh dance. Kita juga jalan-jalan ke Loch Lomond bersama kawan kita Aufar. But the best part of October is when you surprised me on my birthday! So this is me trying to return the Favor xixixi :) ' },
    { month: 'November', folder: 'nov', text: 'Another group trip to Leicester! On this trip, kita melihat orang berantem, menjadi hantu, bertarung dengan mumi, dan memanjat menara eiffel. We went pottery painting (of course yours turn out better than mine). You finally get to take a picture with the famous red leaves (no edit). Mungkin itu adalah hari dimana aku paling banyak diomelin. But its okay karena aku jadinya punya banyak foto kamu deehh. Kita makan di Canton Lane terakhir kalii and then we went to see the Christmas Market.' },
    { month: 'Europe', folder: 'eur', text: 'I decided to finish my work quickly so I can go to Europe with you (like i would let you go without me again). Seruu kan traveling sama aku. Kita jadi tau kalau Barcelona itu bagusnya ngalahin London, di Italy ada Anna, dan Swiss is as beautiful as we thought. This is the most legendary trip ever because this is the one where you said M-A-U!' },
    { month: 'December', folder: 'dec', text: 'A sappy month. Very happy because you were able to spend time with your family, take them around UK, and attend our graduation ceremony. But also sad because this is also the time to go home. Anyway, terimakasih yaa cantikku sudah menemani aku di 2025! Grateful to come home with a Masters Degree but even more because I get to come home with you!' },
  ];

  // Build months data from manifest
  const months = monthsConfig.map((config, index) => {
    const filesInFolder = imageManifest[config.folder] || [];
    const images = filesInFolder.map(filename =>
      `/happybirthdaybyul/images/${config.folder}/${filename}`
    );

    return {
      id: index + 1,
      month: config.month,
      folder: config.folder,
      images: images.length > 0 ? images : [`https://picsum.photos/600/600?random=${index + 1}`],
      text: config.text
    };
  });

  // Calculate weighted scroll based on image count
  const totalImages = months.reduce((sum, month) => sum + month.images.length, 0);
  const monthScrollWeights = months.map(month => month.images.length / totalImages);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to month and image index based on weighted distribution
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      let accumulatedWeight = 0;
      let foundMonth = 0;
      let monthProgress = 0;

      // Find which month we're in based on weighted scroll
      for (let i = 0; i < months.length; i++) {
        const weightEnd = accumulatedWeight + monthScrollWeights[i];

        if (latest >= accumulatedWeight && latest < weightEnd) {
          foundMonth = i;
          // Calculate progress within this month's weighted range
          monthProgress = (latest - accumulatedWeight) / monthScrollWeights[i];
          break;
        }

        accumulatedWeight = weightEnd;

        // Handle last month edge case
        if (i === months.length - 1) {
          foundMonth = i;
          monthProgress = 1;
        }
      }

      setCurrentMonth(foundMonth);

      // Map month progress to image index
      const currentMonthData = months[foundMonth];
      if (currentMonthData && currentMonthData.images.length > 1) {
        const imageIndex = Math.min(
          Math.floor(monthProgress * currentMonthData.images.length),
          currentMonthData.images.length - 1
        );
        setCurrentImageIndex(imageIndex);
      } else {
        setCurrentImageIndex(0);
      }
    });
  }, [scrollYProgress, months, monthScrollWeights]);

  const currentMonthData = months[currentMonth];
  const isEven = currentMonth % 2 === 0;

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-b from-cream to-sunflower/20"
      style={{ height: `${totalImages * 80}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-center mb-16 text-sunflower drop-shadow-lg"
        >
          Your 2025 Wrapped!
          (yang aku punya aja)
        </motion.h2>

        <div className="max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMonth}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Photo(s) - Scroll-controlled stack */}
              <motion.div className="w-full md:w-1/2 relative">
                <div className="relative aspect-[4/5]">
                  {/* Render only current and adjacent images for performance */}
                  {currentMonthData.images.map((img, idx) => {
                    // Only render current, previous, and next image
                    const shouldRender = idx >= currentImageIndex - 1 && idx <= currentImageIndex + 1;
                    if (!shouldRender) return null;

                    const isActive = idx <= currentImageIndex;
                    const isPast = idx < currentImageIndex;

                    return (
                      <motion.div
                        key={`${currentMonth}-${idx}`}
                        className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                        style={{
                          zIndex: currentMonthData.images.length - idx,
                        }}
                        initial={{ scale: 1, y: 0, opacity: 1 }}
                        animate={{
                          scale: isPast ? 0.85 : 1,
                          y: isPast ? -100 : 0,
                          opacity: isPast ? 0 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut"
                        }}
                      >
                        <img
                          src={img}
                          alt={`${currentMonthData.month} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="eager"
                        />

                        {/* Overlay for stacked effect */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/20" />
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Image counter indicator */}
                  {currentMonthData.images.length > 1 && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
                      {currentMonthData.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex
                              ? 'w-8 bg-sunflower'
                              : 'w-2 bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Text */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-bold text-sunflower mb-4">
                  {currentMonthData.month}
                </h3>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  {currentMonthData.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Vertical Progress indicator */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-40">
            {months.map((_, index) => (
              <div
                key={index}
                className={`w-2 rounded-full transition-all duration-300 ${
                  index === currentMonth
                    ? 'h-12 bg-sunflower'
                    : 'h-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoSection;
